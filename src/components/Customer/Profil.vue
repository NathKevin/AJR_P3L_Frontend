<template>
    <v-main class="profil">
        <br><br><br>

        <v-container fluid>
            <v-progress-circular
                size="60"
                v-if="load"
                indeterminate
                color="primary"
            ></v-progress-circular>
            <v-overlay :value="load"></v-overlay>
            <v-card class="overlap"  v-if="isProfil" width="auto" height="auto" max-height="auto">
                <v-toolbar class="cyan lighten-2" min-height="80">
                    <h2 class=" ml-7 mt-4 text-left">Profil</h2>
                    <v-spacer></v-spacer>
                    <v-btn @click="editHandler" class="white mt-4"><Strong>Edit</Strong></v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <br>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">ID Customer</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.idCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">Nama</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.namaCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">Alamat</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.alamatCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">Tanggal Lahir</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.tanggalLahirCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">Jenis Kelamin</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.jenisKelaminCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">Kategori Akun</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.kategoriCustomer }}</p>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col lg="2" sm="2" md="2">
                        <p class="text-left ml-5">No. Telepon</p>
                    </v-col>
                    <v-col lg="1" sm="1" md="1">
                        <p class="text-left">:</p>
                    </v-col>
                    <v-col >
                        <p class="text-left">{{ this.customer.noTelpCustomer }}</p>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="overlap" v-if="isProfil" width="auto" height="auto" max-height="auto">
                <v-row dense no-gutters>
                    <v-col xl="4" lg="4" sm="4" md="4">
                        <p class="text-left ml-5 mt-5">File KTP</p> 
                        <v-container>
                            <v-img :src="$baseUrl+'/storage/'+this.customer.KTP" max-height="auto" max-width="auto" class="mb-4"></v-img>
                        </v-container>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-divider vertical></v-divider>
                    <v-col xl="4" lg="4" sm="4" md="4">
                        <p class="text-left ml-5 mt-5">File SIM</p>
                        <v-container>
                            <v-img v-if="this.customer.SIM != null" :src="$baseUrl+'/storage/'+this.customer.SIM" max-height="auto" max-width="auto" ></v-img>
                            <v-btn @click="deleteFile('SIM')" class="red white--text mt-4" v-if="this.customer.SIM != null">Delete SIM</v-btn>
                        </v-container>
                        <p v-if="this.customer.SIM == null">Anda belum meng-upload file SIM</p>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-divider vertical></v-divider>
                    <v-col xl="4" lg="4" sm="4" md="4">
                        <p class="text-left ml-5 mt-5">File Kartu Pelajar</p>
                        <v-container>
                            <v-img v-if="this.customer.KP != null" :src="$baseUrl+'/storage/'+this.customer.KP" max-height="auto" max-width="auto" ></v-img>
                            <v-btn @click="deleteFile('KP')" class="red white--text mt-4" v-if="this.customer.KP != null">Delete Kartu Pelajar</v-btn>
                        </v-container>
                        <p v-if="this.customer.KP == null">Anda belum meng-upload file Kartu Pelajar</p>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>

        <v-dialog v-model="dialog" persistent max-width="600px" >
            <v-card>
                 <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">Edit Profil</span>
                </v-toolbar>
                <v-form ref="form">
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.namaCustomer"
                            label="Nama "
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.alamatCustomer"
                            label="Alamat "
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
                                v-model="form.tanggalLahirCustomer"
                                label="Tanggal Lahir"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.tanggalLahirCustomer"
                                :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1900-01-01"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-radio-group
                            v-model="form.jenisKelaminCustomer"
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
                            v-model="form.noTelpCustomer"
                            label="No Telepon"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-file-input
                            prepend-icon="mdi-file" 
                            label="Gambar KTP"
                            id="file1"
                            ref="fileGambar"
                        >
                        </v-file-input>
                        <v-file-input
                            prepend-icon="mdi-file" 
                            label="Gambar SIM"
                            id="file2"
                            ref="fileGambar"
                        >
                        </v-file-input>
                        <v-file-input
                            prepend-icon="mdi-file" 
                            label="Gambar Kartu Pelajar"
                            id="file3"
                            ref="fileGambar"
                        >
                        </v-file-input>
                    </v-container>
                </v-card-text>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel()"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="openDialogConfirm" > Konfirmasi </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" width="500">
            <v-card width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Konfirmasi Edit Profil</span>
                </v-toolbar>
                <p class="red--text mt-5" >Apakah anda yakin ingin mengubah data?</p>
                <Strong>
                    Anda akan ter-redirect menuju halaman landing page AJR 
                    dan tidak dapat mengakses website AJR hingga
                    proses verifikasi telah selesai dilakukan oleh
                    Customer Service kami.
                </Strong>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = !dialogConfirm"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="submit()" > Konfirmasi </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogWarning" width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="red">
                    <v-icon class="mr-5" dark size="40">mdi-alert</v-icon>
                    <span  class="headline">Peringatan!</span>
                </v-toolbar>
                <h3 class="red--text mt-5" >Data anda tidak valid</h3>
                <br>
                <Strong>
                    <p class="ml-4 mr-4">
                        Customer Service kami telah menemukan data yang tidak valid pada akun profil anda.
                        Silakan lakukan proses edit profil kembali.
                        Periksa ulang apakah terdapat kesalahan data terutama pada file berkas KTP, SIM, dan Kartu Pelajar anda.
                    </p>
                </Strong>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogWarning = !dialogWarning"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Konfirmasi Hapus File {{ this.formType }} </span>
                </v-toolbar>
                <h4 class="mt-5" >Anda yakin ingin hapus File {{ this.formType }} ini?</h4>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogDelete = !dialogDelete"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()"> OK </v-btn>
                </v-card-actions>
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
    name: 'transaksi',
    data() {
        return {
            formType: null,
            success_message: false,
            error_message: false,
            color: false,
            snackbar: false,
            snackbar2: false,
            dialog: false,
            dialogConfirm: false,
            dialogWarning: false,
            dialogDelete: false,
            load: true,
            customer : {},
            dataCustomer: new FormData,
            isProfil: false,
            form:{
                namaCustomer:null,
                alamatCustomer:null,
                tanggalLahirCustomer:null,
                jenisKelaminCustomer:null,
                noTelpCustomer:null,
            },
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        }
    },
    methods: {
        setForm(){
            if(this.formType == 'SIM'){
                this.deleteSIM();
            }else if(this.formType == 'Kartu Pelajar'){
                this.deleteKP();
            }
        },
        deleteFile(item){
            if(item == 'SIM'){
                this.formType = 'SIM';
            }else{
                this.formType = 'Kartu Pelajar';
            }
            this.dialogDelete = true;
        },
        checkStatusBerkas(){
            if(localStorage.getItem('statusBerkas') == 'Ditolak'){
                this.dialogWarning = true;
            }
        },
        openDialogConfirm(){
            this.dialogConfirm = true;
        },
        checkCustomer(){
            this.load=false;
            this.isProfil = true;
        },
        editHandler(){
            this.form.namaCustomer = this.customer.namaCustomer;
            this.form.alamatCustomer = this.customer.alamatCustomer;
            this.form.tanggalLahirCustomer = this.customer.tanggalLahirCustomer;
            this.form.jenisKelaminCustomer = this.customer.jenisKelaminCustomer;
            this.form.noTelpCustomer = this.customer.noTelpCustomer;
            this.dialog = true;
        },
        async getCustomer() {
            var url = this.$api + '/show/customer/' + localStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.customer = response.data.data;
                this.checkCustomer();
            })
        },
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;

                var KTP = document.getElementById('file1');
                var SIM = document.getElementById('file2');
                var KP = document.getElementById('file3');

                if(KTP.files[0]){
                    this.dataCustomer.append('KTP', KTP.files[0]);
                }
                if(SIM.files[0]){
                    this.dataCustomer.append('SIM', SIM.files[0]);
                }
                if(KP.files[0]){
                    this.dataCustomer.append('KP', KP.files[0]);
                }

                this.dataCustomer.append('namaCustomer', this.form.namaCustomer);
                this.dataCustomer.append('alamatCustomer', this.form.alamatCustomer);
                this.dataCustomer.append('tanggalLahirCustomer', this.form.tanggalLahirCustomer);
                this.dataCustomer.append('jenisKelaminCustomer', this.form.jenisKelaminCustomer);
                this.dataCustomer.append('noTelpCustomer', this.form.noTelpCustomer);
                

                this.$http.post(this.$api + '/update/customer/' + localStorage.getItem('id'), this.dataCustomer).then(response => {
                    this.success_message = response.data.message;
                    this.color = "green";
                    this.snackbar2 = true;
                    this.load = false;
                    this.logout();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }else{
                this.success_message = 'Pastikan semua data terisi';
                this.color = "red";
                this.snackbar2 = true;
            }
        },
        deleteSIM(){
            this.load = true;

            this.$http.put(this.$api + '/deleteSIM/customer/' + localStorage.getItem('id')).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                localStorage.removeItem('SIM');
                localStorage.setItem('SIM', null);
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
        },
        deleteKP(){
            this.load = true;

            this.$http.put(this.$api + '/deleteKP/customer/' + localStorage.getItem('id')).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                localStorage.removeItem('KP');
                localStorage.setItem('KP', null);
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            })
        },
        cancel(){
            this.dialog = false;
            this.resetForm();
            this.$refs.addImageForm.reset();
            this.$refs.fileGambar.value = null;
        },
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("tanggalLahir");
            localStorage.removeItem("KP");
            localStorage.removeItem("SIM");
            localStorage.removeItem("statusBerkas");
            localStorage.removeItem("waiting");
            this.$router.push({
                name: 'AJR',
            });
        },
        resetForm(){
            this.form.namaCustomer = null;
            this.form.alamatCustomer = null;
            this.form.noTelpCustomer = null;
            this.form.jenisKelaminCustomer = null;
            this.form.tanggalLahirCustomer = null;
        },
    },

    async mounted(){
        await this.getCustomer();
        this.checkStatusBerkas();
     }
}
</script>

<style scoped>
.overlap{
   animation: fadeInAnimation ease 3s;
    animation-iteration-count: 0.65;
    animation-fill-mode: forwards;
   opacity: 85%;
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>