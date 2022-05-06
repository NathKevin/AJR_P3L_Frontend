<template>
    <v-main class="list">

        <div class="bg">
        <h1>Jadwal</h1>
        <br>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="jadwals" :search="search">
                <template v-slot:[`item.actions`]="{ item }">   
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon> </v-btn>
                    <v-btn class="mr-2" small @click="deleteHandler(item.idJadwal)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>
        </div>

        <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Jadwal</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.hari"
                            label="Hari"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-row justify="space-around" align="center">
                            <v-col style="width: 350px; flex: 0 1 auto;">
                                <div class="text-body-1">Waktu Mulai</div>
                                <v-time-picker
                                    v-model="form.waktuMulai"
                                    format="24hr"
                                    :rules="rules.null"
                                >
                                </v-time-picker>
                            </v-col>
                            <v-col style="width: 350px; flex: 0 1 auto;">
                                <div class="text-body-1">Waktu Selesai</div>
                                <v-time-picker
                                    v-model="form.waktuSelesai"
                                    format="24hr"
                                    :rules="rules.null"
                                >
                                </v-time-picker>
                            </v-col>
                            
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Warning!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus jadwal ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    </v-main>
</template>

<script>
export default {
    name: "List",
    data() {
        return{
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Hari",
                    align: "start",
                    sortable: true,
                    value: "hari",
                },
                { text: "Jam Mulai", value: "waktuMulai" },
                { text: "Jam Selesai", value: "waktuSelesai"},
                { text: "Actions", value: "actions"},
            ],
            jadwal: new FormData,
            jadwals: [],
            form: {
                hari: null,
                waktuMulai: null,
                waktuSelesai: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val|| 'This field is required'],
            },
        };
    },

    methods: {
        setForm(){
            if(this.inputType !== 'Tambah'){
                this.update();
            }else{
                this.save();
            }
        },
        //Read Data jadwals
        readData(){
            var url = this.$api + '/jadwal';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.jadwals = response.data.data;
            })
        },
        //Simpan data jadwal
        save(){
            this.jadwal.append('hari', this.form.hari);
            this.jadwal.append('waktuMulai', this.form.waktuMulai);
            this.jadwal.append('waktuSelesai', this.form.waktuSelesai);

            var url = this.$api + '/create/jadwal'
            this.load = true;
            this.$http.post(url, this.jadwal, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data jadwal
        update() {
            let newData = {
                hari: this.form.hari,
                waktuMulai: this.form.waktuMulai,
                waktuSelesai: this.form.waktuSelesai
            };
            var url = this.$api + '/update/jadwal/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus jadwal
        deleteData() {
            var url = this.$api + '/delete/jadwal/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.idJadwal;
            this.form.hari = item.hari;
            this.form.waktuMulai = item.waktuMulai;
            this.form.waktuSelesai = item.waktuSelesai;
            this.dialog = true;
        },
        deleteHandler(idJadwal) {
            this.deleteId = idJadwal;
            this.dialogConfirm = true;
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                waktuMulai: null,
                hari: null,
                waktuSelesai: null
            };
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
    }
};
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

</style>