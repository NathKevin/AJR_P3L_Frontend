<template>
    <v-main class="list">

        <div class="bg">
        <h1>Promo</h1>
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

            <v-data-table :headers="headers" :items="promos" :search="search">
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn class="mr-2" small @click="deleteHandler(item.idPromo)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>
        </div>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Promo</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.jenisPromo"
                            label="Nama Promo"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.kode"
                            label="Kode"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.besarPromo"
                            label="Besar Promo"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-textarea
                            v-model="form.keterangan"
                            label="Keterangan"
                            :rules="rules.null"
                        >
                        </v-textarea>
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
                <v-card-text>Anda yakin ingin menghapus Promo ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="3000" bottom >
            <div v-for="(errorInArray, i) in error_message" :key="i">
                <div v-for="(errorOutArray, i) in errorInArray" :key="i">
                    {{ errorOutArray }}
                </div>
            </div>
        </v-snackbar>

        <v-snackbar v-model="snackbar2" :color="color" timeout="3000" bottom >{{ success_message }}</v-snackbar>

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
            snackbar2: false,
            error_message: '',
            success_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Nama Promo",
                    align: "start",
                    sortable: true,
                    value: "jenisPromo",
                },
                { text: "Kode", value: "kode" },
                { text: "Besar Promo", value: "besarPromo"},
                { text: "Keterangan", value: "keterangan"},
                { text: "Actions", value: "actions"},
            ],
            promo: new FormData,
            promos: [],
            form: {
                kode: null,
                jenisPromo: null,
                besarPromo: null,
                keterangan: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => (val || '').length > 0 || 'This field is required'],
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
        //Read Data promos
        readData(){
            var url = this.$api + '/promo';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.promos = response.data.data;
            })
        },
        //Simpan data promo
        save(){
            this.promo.append('kode', this.form.kode);
            this.promo.append('jenisPromo', this.form.jenisPromo);
            this.promo.append('besarPromo', this.form.besarPromo);
            this.promo.append('keterangan', this.form.keterangan);

            var url = this.$api + '/create/promo'
            this.load = true;
            this.$http.post(url, this.promo, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
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
        //Ubah data promo
        update() {
            let newData = {
                jenisPromo: this.form.jenisPromo,
                kode: this.form.kode,
                besarPromo: this.form.besarPromo,
                keterangan: this.form.keterangan
            };
            var url = this.$api + '/update/promo/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
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
        //Hapus promo
        deleteData() {
            var url = this.$api + '/delete/promo/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
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
            this.editId = item.idPromo;
            this.form.jenisPromo = item.jenisPromo;
            this.form.kode = item.kode;
            this.form.besarPromo = item.besarPromo;
            this.form.keterangan = item.keterangan;
            this.dialog = true;
        },
        deleteHandler(idPromo) {
            this.deleteId = idPromo;
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
                jenisPromo: null,
                kode: null,
                besarPromo: null,
                keterangan: null
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

