<template>
    <v-main class="list">

        <div class="bg">
        <h1>Mitra</h1>
        <br>

        <v-card elevation="3" class="table">
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

            <v-data-table :headers="headers" :items="mitras" :search="search" loading="true" mobile-breakpoint="0">
                <template v-slot:[`item.isActive`]="{ item }">
                    <span v-if=" item.isActive == 1"> <v-chip label class="green lighten-1" color="white--text">In Progress</v-chip></span>
                    <span v-else> <v-chip label class="red lighten-3" color="white--text">Finished</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn class="mr-2" small @click="detailHandler(item)" 
                    flat icon color="black"> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
                </template>
            </v-data-table>
        </v-card>

        </div>

        <v-dialog v-model="dialog" persistent max-width="600px" :fullscreen="$vuetify.breakpoint.mobile" >
            <v-card>
               <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">{{ formTitle }} Mitra</span>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.namaMitra"
                            label="Nama Mitra"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.noKTPMitra"
                            label="No KTP"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.alamatMitra"
                            label="Alamat Mitra"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.noTelpMitra"
                            label="No Telepon"
                            :rules="rules.null"
                        >
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            right
            bottom
            hide-overlay
            height="650px"
            width="450px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Mitra</v-card-title>
            </v-toolbar>
                <v-divider></v-divider>
            <v-card class="mr-3 ml-3 ">
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama   </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.namaMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> No.KTP  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="6">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noKTPMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                 <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Alamat  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.alamatMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> No.Telepon  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noTelpMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                
            </v-card>

            <br>
            <v-card class="mr-3 ml-3">
                <v-btn block elevation="8" class="mb-3 " outlined plain color="blue darken-4" @click="editStatusHandler">Ubah Status</v-btn>
            </v-card>
       
        </v-navigation-drawer>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="red " flat>
                    <span  class="headline">Warning!</span>
                </v-toolbar>
                <br>
                <v-card-text> <strong>Anda yakin ingin menghapus mitra ini?</strong> </v-card-text>
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
export default{
    name: "List",
    data() {
        return{
            activePicker: null,
            date: null,
            drawer: false,
            previewIMG : null,
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
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaMitra",
                },
                { text: "No.KTP", value: "noKTPMitra" },
                { text: "No.Telepon", value: "noTelpMitra"},
                { text: "Status", value: "isActive" },
                { text: "Actions", value: "actions"},
            ],
            mitra: new FormData,
            mitras: [],
            form: {
                namaMitra: null,
                noKTPMitra : null,
                alamatMitra: null,
                noTelpMitra: null,
                
            },
            detailForm:{
                namaMitra: null,
                noKTPMitra : null,
                alamatMitra: null,
                noTelpMitra: null,
                isActive: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val|| 'This field is required'],
            },
        }
    },

    methods: {
        setForm(){
            if(this.inputType === 'Ubah'){
                this.update();
            }else if(this.inputType === 'Tambah'){
                this.save();
            }else if(this.inputType === 'Ubah Status'){
                this.editStatus();
            }
        },
        //Read Data mitra
        readData(){
            var url = this.$api + '/mitra';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mitras = response.data.data;
            })
        },
        //Simpan data mitra
        save(){
            this.mitra.append('namaMitra', this.form.namaMitra);
            this.mitra.append('noKTPMitra', this.form.noKTPMitra);
            this.mitra.append('alamatMitra', this.form.alamatMitra);
            this.mitra.append('noTelpMitra', this.form.noTelpMitra);

            var url = this.$api + '/create/mitra'
            this.load = true;
            this.$http.post(url, this.mitra, {
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
        //Ubah data mitra
        update() {
            let newData = {
                namaMitra : this.form.namaMitra,
                noKTPMitra : this.form.noKTPMitra,
                alamatMitra: this.form.alamatMitra,
                noTelpMitra : this.form.noTelpMitra,
            };
            var url = this.$api + '/update/mitra/' + this.editId;
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
        //ubah status
        editStatus(){
            let newData = {
                isActive : this.detailForm.isActive
            };
            var url = this.$api + '/updateStatus/mitra/' + this.editId;
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
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus mitra
        deleteData() {
            var url = this.$api + '/delete/mitra/' + this.deleteId;
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
        editStatusHandler(){
            this.inputType = 'Ubah Status';
            this.detailForm.isActive = !this.detailForm.isActive;
            this.setForm();
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.selectedRole = item.namaRole;
            this.editId = item.idMitra;
            this.form.idRole = item.idRole;
            this.form.namaMitra = item.namaMitra;
            this.form.alamatMitra = item.alamatMitra;
            this.form.noTelpMitra = item.noTelpMitra;
            this.form.noKTPMitra = item.noKTPMitra;
            this.dialog = true;
        },
        deleteHandler(idMitra) {
            this.deleteId = idMitra;
            this.dialogConfirm = true;
        },
        detailHandler(item){
            this.editId = item.idMitra;
            this.detailForm.namaMitra = item.namaMitra;
            this.detailForm.noKTPMitra = item.noKTPMitra;
            this.detailForm.alamatMitra = item.alamatMitra;
            this.detailForm.noTelpMitra = item.noTelpMitra;
            this.detailForm.isActive = item.isActive;
            this.drawer = !this.drawer;
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
                namaMitra: null,
                noKTPMitra : null,
                alamatMitra: null,
                noTelpMitra: null,
                isActive: null,
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

    
}
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

</style>

