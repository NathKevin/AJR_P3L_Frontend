<template>
    <v-main class="list">

        <div class="bg">
        <h1>Pegawai</h1>
        <br>

        <v-card elevation="3">
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

            <v-data-table :headers="headers" :items="pegawais" :search="search" loading="true">
                <template v-slot:[`item.fotoPegawai`]="{ item }">
                    <v-avatar>
                        <v-img :src="checkPicture(item)" >
                            <template v-slot:placeholder>
                                <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                                >
                                <v-progress-circular
                                    indeterminate
                                    size="25"
                                    color="blue darken-2"
                                ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </v-avatar>
                </template>
                <template v-slot:[`item.isActive`]="{ item }">
                    <span v-if=" item.isActive == 1"> <v-chip small label class="green lighten-1" color="white--text">Active</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Non-Active</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <!-- <v-btn class="mr-2" small @click="deleteHandler(item.idPegawai)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn> -->
                    <v-btn class="mr-2" small @click="detailHandler(item)" 
                    flat icon color="black"> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
                </template>
            </v-data-table>
        </v-card>

        </div>

        <v-dialog v-model="dialog" persistent max-width="600px" >
            <v-card>
                 <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">{{ formTitle }} Pegawai</span>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-select
                            v-model="selectedRole"
                            :items="roleType"
                            label="Role Pegawai"
                            :rules="rules.null"
                        >
                        </v-select>
                        <v-text-field
                            v-model="form.namaPegawai"
                            label="Nama Pegawai"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.alamatPegawai"
                            label="Alamat Pegawai"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <div>
                            <div class="mb-6"></div>
                            <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="form.tanggalLahirPegawai"
                                label="Tanggal Lahir"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.tanggalLahirPegawai"
                                :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1900-01-01"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-radio-group
                            v-model="form.jenisKelaminPegawai"
                            label="Jenis Kelamin"
                            row
                            >
                            <v-radio
                                label="Laki-laki"
                                value="Laki-laki"
                            ></v-radio>
                            <v-radio
                                label="Perempuan"
                                value="Perempuan"
                            ></v-radio>
                        </v-radio-group>
                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            :rules="rules.null"
                            v-if="checkIfUpdate()"
                        >
                        </v-text-field>
                        <strong><p class="text-left" style="font-size: 16px;">Default Password : Tanggal Lahir(YYYY-MM-DD)</p></strong>
                        <v-text-field
                            v-model="form.noTelpPegawai"
                            label="No Telepon"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-card-text>
                            <p class="text-md-body-1 text-left"> Foto Terakhir :  {{ this.form.fotoPegawai }}</p>
                        </v-card-text>
                        <v-form ref="addImageForm">
                            <v-file-input
                                prepend-icon="mdi-camera" 
                                label="Foto Pegawai"
                                id="file"
                                ref="fileGambar"
                            >
                            </v-file-input>
                        </v-form>
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel()"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()"> Save </v-btn>
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
            height="820px"
            width="450px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Pegawai</v-card-title>
            </v-toolbar>
                <v-divider></v-divider>
            <v-card class="mr-3 ml-3 " elevation="5">
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jabatan   </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailRole }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.namaPegawai }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.alamatPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Tanggal Lahir  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.tanggalLahirPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jenis Kelamin  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.jenisKelaminPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Email  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.email }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noTelpPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text  class="text-md-body-1 font-weight-black text-left ml-2"> Foto Pegawai  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text  class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-img v-if="checkIsPhoto()" @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoPegawai" height="150" width="150" class="mb-4"></v-img>
                        <span  v-if="checkIsPhoto()" class="text-body-1">Klik Gambar untuk zoom</span>
                    </v-col>
                </v-row>
            </v-card>

            <br>
            <v-card class="mr-3 ml-3">
                <v-btn block elevation="8" class="mb-3 " outlined plain color="blue darken-4" @click="editStatusHandler">Ubah Status</v-btn>
                <v-row>
                    <v-col sm="6">
                        <v-btn plain block class="mb-3"  elevation="8" outlined color="blue darken-4" @click="dialogPassword = true">Ubah Password</v-btn>
                    </v-col>
                    <v-col sm="6">
                        <v-btn plain block class="mb-3"  elevation="8" outlined color="blue darken-4" @click="dialogEmail = true" >Ubah Email</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-navigation-drawer>

        <v-overlay :value="overlay">
            <v-card>
                <v-img @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoPegawai" max-height="900" max-width="500" ></v-img>
                <v-card-text class="text-body-1"> Klik gambar untuk menutup</v-card-text>
            </v-card>
        </v-overlay>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="red" flat>
                    <span  class="headline">Warning!</span>
                </v-toolbar>
                <br>
                <v-card-text> <strong>Anda yakin ingin menghapus pegawai ini?</strong> </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEmail" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="yellow darken-3" >
                    <span  class="headline">Ubah Email</span>
                </v-toolbar>
                <v-card-content>
                    <v-container>
                        <v-text-field
                            v-model="detailForm.email"
                            label="Email"
                            :rules="rules.null"
                        >
                        </v-text-field>
                    </v-container>
                    <v-card-action>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogEmail = false"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="editEmail"> Save </v-btn>
                    </v-card-action>
                </v-card-content>

            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPassword" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="yellow darken-3" >
                    <span  class="headline">Ubah Password</span>
                </v-toolbar>
                <v-card-content>
                    <v-container>
                        <p class="text-body-1 text-left"> <strong>Warning! Anda akan mengubah password akun pegawai anda!</strong> </p>
                        <v-text-field
                            v-model="oldPassword"
                            label="Password Lama"
                            type="password"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="detailForm.password"
                            label="Password Baru"
                            type="password"
                            :rules="rules.null"
                        >
                        </v-text-field>
                    </v-container>
                    <v-card-action>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogPassword = false"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="editPassword"> Save </v-btn>
                    </v-card-action>
                </v-card-content>

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
import image from "../../assets/personIcon.png"

export default {
    name: "List",
    data() {
        return{
            activePicker: null,
            menu: false,
            date: null,
            selectedRole : null,
            detailRole: null,
            drawer: false,
            overlay: false,
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
            dialogEmail: false,
            dialogPassword: false,
            image : image,
            oldPassword: null,
            headers: [
                {
                    text: "Foto Profil",
                    value: "fotoPegawai",
                },
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaPegawai",
                },
                { text: "Jabatan", value: "namaRole" },
                { text: "No.Telepon", value: "noTelpPegawai"},
                { text: "Status", value: "isActive" },
                { text: "Actions", value: "actions"},
            ],
            roleType: [
                {
                    text: "Manager",
                    value: 'Manager'
                },
                {
                    text: "Admin",
                    value: 'Admin'
                },
                {
                    text: "Customer Sercive",
                    value: 'Customer Service'
                }
            ],
            pegawai: new FormData,
            pegawais: [],
            roles: [],
            form: {
                idRole: null,
                namaPegawai: null,
                alamatPegawai: null,
                tanggalLahirPegawai: null,
                jenisKelaminPegawai: null,
                email: null,
                password: null,
                noTelpPegawai: null,
                fotoPegawai: null,
            },
            detailForm:{
                idRole: null,
                namaPegawai: null,
                alamatPegawai: null,
                tanggalLahirPegawai: null,
                jenisKelaminPegawai: null,
                email: null,
                password: null,
                noTelpPegawai: null,
                fotoPegawai: null,
                isActive: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        };
    },
    //ini untuk tanggallahir
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },

    methods: {
        checkIsPhoto(){
            if(this.detailForm.fotoPegawai == null ){
                return false;
            }else{
                return true;
            }
        },
        checkPicture(item){
            if(item.fotoPegawai == null ){
                return this.image;
            }else{
                return this.$baseUrl+'/storage/'+item.fotoPegawai;
            }
            
        },
        convertIMG(event){
            console.log(event)
            const namagambar = event.target.files[0].name;
            this.form.fotoPegawai = URL.createObjectURL(namagambar);
            this.previewIMG =this.form.fotoPegawai;
        },
        checkRole(){
            if(this.selectedRole == 'Manager'){
                this.form.idRole = 1;
            }else if(this.selectedRole == 'Admin'){
                this.form.idRole = 2;
            }else if(this.selectedRole == 'Customer Service'){
                this.form.idRole = 3;
            }
        },
        checkIfUpdate(){
            if(this.inputType === 'Ubah'){
                return false;
            }
            return true;
        },
        required(value) {
            if (value.length == 0) {
                return 'Required.';
            }
            return !!value || 'Required.';
        },
        setForm(){
            this.checkRole();
            if(this.inputType === 'Ubah'){
                this.update();
            }else if(this.inputType === 'Tambah'){
                this.save();
            }else if(this.inputType === 'Ubah Status'){
                this.editStatus();
            }
        },
        //Read Data Pegawais
        readData(){
            var url = this.$api + '/pegawai';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.pegawais = response.data.data;
            })
        },
        //Simpan data pegawai
        save(){
            this.pegawai.append('idRole', this.form.idRole);
            this.pegawai.append('namaPegawai', this.form.namaPegawai);
            this.pegawai.append('alamatPegawai', this.form.alamatPegawai);
            this.pegawai.append('tanggalLahirPegawai', this.form.tanggalLahirPegawai);
            this.pegawai.append('jenisKelaminPegawai', this.form.jenisKelaminPegawai);
            this.pegawai.append('email', this.form.email);
            this.pegawai.append('password', this.form.tanggalLahirPegawai);
            this.pegawai.append('noTelpPegawai', this.form.noTelpPegawai);

            var temp_foto = document.getElementById('file');
            if(temp_foto.files[0] != null){
                this.pegawai.append('fotoPegawai', temp_foto.files[0]);
            }else{
                this.pegawai.append('fotoPegawai', 'null');
            }

            var url = this.$api + '/create/pegawai'
            this.load = true;
            this.$http.post(url, this.pegawai, {
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
                location.reaload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data pegawai
        update() {
             var temp_foto = document.getElementById('file');

             if(temp_foto.files[0]){
                 this.pegawai.append('fotoPegawai', temp_foto.files[0]);
             }

            this.pegawai.append('idRole', this.form.idRole);
            this.pegawai.append('namaPegawai', this.form.namaPegawai);
            this.pegawai.append('alamatPegawai', this.form.alamatPegawai);
            this.pegawai.append('tanggalLahirPegawai', this.form.tanggalLahirPegawai);
            this.pegawai.append('jenisKelaminPegawai', this.form.jenisKelaminPegawai);
            this.pegawai.append('email', this.form.email);
            this.pegawai.append('password', this.form.tanggalLahirPegawai);
            this.pegawai.append('noTelpPegawai', this.form.noTelpPegawai);
            console.log(this.pegawai);

            var url = this.$api + '/update/pegawai/' + this.editId;
            this.load = true;
            this.$http.post(url, this.pegawai, {
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
                location.reload();
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
            var url = this.$api + '/updateStatus/pegawai/' + this.editId;
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
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //edit email pegawai
        editEmail(){
            let newData = {
                email : this.detailForm.email
            };
            var url = this.$api + '/updateEmail/pegawai/' + this.editId;
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
                this.dialogEmail = false;
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
         //edit email pegawai
        editPassword(){
            let newData = {
                oldPassword : this.oldPassword,
                password : this.detailForm.password,
            };
            var url = this.$api + '/updatePassword/pegawai/' + this.editId;
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
                this.oldPassword = null;
                this.dialogPassword = false;
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus pegawai
        deleteData() {
            var url = this.$api + '/delete/pegawai/' + this.deleteId;
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
                location.reload();
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
            this.editId = item.idPegawai;
            this.form.idRole = item.idRole;
            this.form.namaPegawai = item.namaPegawai;
            this.form.alamatPegawai = item.alamatPegawai;
            this.form.tanggalLahirPegawai = item.tanggalLahirPegawai;
            this.form.jenisKelaminPegawai = item.jenisKelaminPegawai;
            this.form.noTelpPegawai = item.noTelpPegawai;
            this.form.fotoPegawai = item.fotoPegawai;
            this.dialog = true;
        },
        deleteHandler(idpegawai) {
            this.deleteId = idpegawai;
            this.dialogConfirm = true;
        },
        detailHandler(item){
            this.detailRole = item.namaRole;
            this.editId = item.idPegawai;
            this.detailForm.idRole = item.idRole;
            this.detailForm.namaPegawai = item.namaPegawai;
            this.detailForm.alamatPegawai = item.alamatPegawai;
            this.detailForm.tanggalLahirPegawai = item.tanggalLahirPegawai;
            this.detailForm.jenisKelaminPegawai = item.jenisKelaminPegawai;
            this.detailForm.email = item.email;
            this.detailForm.noTelpPegawai = item.noTelpPegawai;
            this.detailForm.fotoPegawai = item.fotoPegawai;
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
            this.selectedRole = null;
            this.$refs.addImageForm.reset();
            this.$refs.fileGambar.value = null;
        },
        resetForm() {
            this.form = {
                idRole: null,
                namaPegawai: null,
                alamatPegawai: null,
                tanggalLahirPegawai: null,
                jenisKelaminPegawai: null,
                email: null,
                password: null,
                noTelpPegawai: null,
                fotoPegawai: null,
                
            };
            this.$refs.addImageForm.reset();
            this.$refs.fileGambar.value = "";
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
