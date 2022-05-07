<template>
    <v-main class="login">

        <v-navigation-drawer class="blue darken-4" v-model="sidebar" app disable-resize-watcher>
            <v-list dense nav>
                <v-list-item
                    v-for="item in menuItems"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.path"
                    class="yellow darken-3"
                    color="yellow darken-1"
                >
                    <v-list-item-content >
                        <v-list-item-title class="white--text" v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar fixed hide-on-scroll elevation="7" class="blue darken-4">
            <span class="hidden-md-and-up">
                <v-app-bar-nav-icon @click="sidebar = !sidebar">
                </v-app-bar-nav-icon>
            </span>
            <v-btn fab class="blue darken-4">
                <v-avatar @click="toHome()">
                    <v-img :src="AJRlogo"></v-img>
                </v-avatar>
            </v-btn>
            <router-link to="/AtmaJayaRental" style="text-decoration: none;">
                <h3 class="ml-5" style="color: #FFFFFF;"> ATMA JOGJA RENTAL </h3>
            </router-link>
        </v-app-bar>

        <v-container class="backgroundContainer mt-15" fill-height fluid>
            <v-row justify="center" align="center">
                <v-card elevation="20" class="backgroundCard" width="800" height="1400" max-height="1500" max-width="900">
                    <v-row>
                        <v-col>
                            <v-container fill-height fluid>
                                <v-row class="ml-1" justify="center" align="end">
                                        <v-card class="overlap" height="450" width="300" max-width="300" max-height="450">
                                            <v-icon class="mt-12" size="50px">mdi-account-plus</v-icon>
                                            <br><br>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:justify;">
                                                    Daftarkan akun anda ke Atma Jogja Rental untuk dapat mengakses penuh fasilitas peminjaman transportasi dan nikmati perjalanan anda bersama keluarga maupun teman di Yogayakarta.
                                                </h5>
                                            </v-card-sub-title>
                                            <br>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    Pemanduan Pendaftaran :
                                                </h5>
                                            </v-card-sub-title>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    1. Semua field input wajib terisi.
                                                </h5>
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    2. Password terdiri dari Huruf kapital, Huruf kecil, Angka, dan Simbol, serta minimal 8 karakter.
                                                </h5>
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    3. Upload-lah foto KTP, SIM, ataupun KP dengan data yang valid.
                                                </h5>
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    4. Jika belum memiliki SIM, Foto SIM dapat dikosongkan.
                                                </h5>
                                            </v-card-sub-title>
                                        </v-card>
                                </v-row>
                            </v-container>
                        </v-col>
                        <v-col class="mr-1" cols="6">
                            <v-form ref="form">
                                <v-card-title class="justify-center mt-10">
                                    <h3>ATMA JOGJA RENTAL</h3>
                                </v-card-title>
                                <v-card-sub-title>
                                    <h5>Register Page</h5>
                                </v-card-sub-title>
                                <br>
                                <v-container>
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        v-model="form.namaCustomer"
                                        label="Nama"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        v-model="form.alamatCustomer"
                                        label="Alamat"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                    <div>
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
                                            outlined
                                            dense
                                            rounded
                                            v-model="form.tanggalLahirCustomer"
                                            label="Tanggal Lahir"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="rules.null"
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
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        v-model="form.noTelpCustomer"
                                        label="No. Telepon"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        v-model="form.email"
                                        label="Email"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        type="password"
                                        v-model="form.password"
                                        label="Password"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                    <v-radio-group
                                        v-model="form.jenisKelaminCustomer"
                                        label="Jenis Kelamin"
                                        :rules="rules.null"
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
                                    <v-radio-group
                                        v-model="pelajar"
                                        label="Apakah Anda Seorang Pelajar?"
                                        :rules="rules.null"
                                        >
                                        <v-radio
                                            label="Ya"
                                            value="Ya"
                                        ></v-radio>
                                        <v-radio
                                            label="Tidak"
                                            value="Tidak"
                                        ></v-radio>
                                    </v-radio-group>
                                    <v-radio-group
                                        v-model="turis"
                                        label="Apakah anda turis dari mancanegara?"
                                        :rules="rules.null"
                                        >
                                        <v-radio
                                            label="Ya"
                                            value="Ya"
                                        ></v-radio>
                                        <v-radio
                                            label="Tidak"
                                            value="Tidak"
                                        ></v-radio>
                                    </v-radio-group>
                                    <v-radio-group
                                        label="File Berkas :"
                                        >
                                    </v-radio-group>
                                    <v-form ref="addKTPForm">
                                        <v-file-input
                                            outlined
                                            rounded
                                            dense
                                            label="Foto KTP"
                                            id="KTP"
                                            ref="gambarKTP"
                                            :rules="rules.null"
                                        >
                                        </v-file-input>
                                    </v-form>
                                    <v-form ref="addSIMForm">
                                        <v-file-input
                                            outlined
                                            rounded
                                            dense
                                            label="Foto SIM"
                                            id="SIM"
                                            ref="gambarSIM"
                                        >
                                        </v-file-input>
                                    </v-form>
                                    <v-form ref="addKPForm">
                                        <v-file-input
                                            outlined
                                            rounded
                                            dense
                                            label="Foto Kartu Pelajar"
                                            id="KP"
                                            ref="gambarKP"
                                            v-if="isPelajar()"
                                        >
                                        </v-file-input>
                                    </v-form>
                                    <br><br>
                                    <v-btn plain class="btnLogin blue darken-4" >
                                        <span @click="submit" class="btnLogin2 white--text">DAFTAR</span>
                                    </v-btn>
                                    <br><br>
                                    <v-card-sub-title >
                                        <h5 class="ml-5 mr-5" style="text-align:center;">
                                            Sudah memiliki akun? <a href="Login">Login disini</a>
                                        </h5>
                                    </v-card-sub-title>
                                </v-container>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>

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
import image from "../assets/AJR.png"

export default {
    name: "login",
    data() {
        return{
            menu: null,
            error_message: null,
            success_message: null,
            color: null,
            snackbar: null,
            snackbar2: null,
            load: null,
            pelajar: null,
            turis: null,
            AJRlogo: image,
            menuItems:[
                { title: 'Beranda', path: '/AtmaJayaRental' },
            ],
            sidebar: false,
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
            customer: new FormData,
            form: {
                namaCustomer: null,
                alamatCustomer: null,
                tanggalLahirCustomer: null,
                jenisKelaminCustomer: null,
                kategoriCustomer: null,
                email: null,
                password: null,
                noTelpCustomer: null,
                KTP: null,
                SIM: null,
                KP: null,
            },
        }
    },

    methods:{
        toHome(){
            this.$router.push({
                name: 'AJR',
            });
        },

        isPelajar(){
            if(this.pelajar == 'Ya'){
                return true;
            }
            return false;
        },

        isTuris(){
            if(this.turis == 'Ya'){
                return true;
            }
            return false;
        },

        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;

                if(this.turis == "Ya" && this.pelajar == "Ya"){
                    this.form.kategoriCustomer = "Pelajar"
                }
                else if(this.pelajar == "Ya" && this.turis == "Tidak"){
                    this.form.kategoriCustomer = "Pelajar"
                }
                else if(this.pelajar == "Tidak" && this.turis == "Ya"){
                    this.form.kategoriCustomer = "Turis Mancanegara"
                }
                else{
                    this.form.kategoriCustomer = "Turis Lokal"
                }

                var KTP = document.getElementById('KTP');
                var SIM = document.getElementById('SIM');
                var KP = document.getElementById('KP');

                if(KTP.files[0]){
                    this.customer.append('KTP', KTP.files[0]);
                }else{
                    this.customer.append('KTP', 'null');
                }
                if(SIM.files[0]){
                    this.customer.append('SIM', SIM.files[0]);
                }
                if(this.form.kategoriCustomer == "Pelajar"){
                    if(KP.files[0]){
                        this.customer.append('KP', KP.files[0]);
                    }
                }

                this.customer.append('namaCustomer', this.form.namaCustomer);
                this.customer.append('alamatCustomer', this.form.alamatCustomer);
                this.customer.append('tanggalLahirCustomer', this.form.tanggalLahirCustomer);
                this.customer.append('jenisKelaminCustomer', this.form.jenisKelaminCustomer);
                this.customer.append('kategoriCustomer', this.form.kategoriCustomer);
                this.customer.append('email', this.form.email);
                this.customer.append('password', this.form.password);
                this.customer.append('noTelpCustomer', this.form.noTelpCustomer);

                console.log(this.form['namaCustomer']);
                console.log(this.customer['namaCustomer']);

                this.$http.post(this.$api + '/register/customer', this.customer).then(response => {
                    this.success_message = response.data.message;
                    this.color = "green";
                    this.snackbar2 = true;
                    this.load = false;
                    this.clear();
                    this.$router.push({
                        name: 'Login',
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    console.log(error.response.data.message);
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                })
            }
        },

        clear() {
            this.$refs.form.reset() //clear form login
        }
    }
}
</script>

<style scoped>
.backgroundCard{
    background: linear-gradient(90deg, #0D47A1 50%, #FFFFFF 50%);
}

.btnLogin {
  border-radius: 4px;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
}

.btnLogin2 {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btnLogin2:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btnLogin:hover span {
  padding-right: 25px;
}

.btnLogin:hover span:after {
  opacity: 1;
  right: 0;
}

.overlap{
   position:absolute;
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