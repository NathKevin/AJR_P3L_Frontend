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
                <v-card elevation="20" class="backgroundCard" width="800" height="1330" max-height="1430" max-width="900">
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
                                            </v-card-sub-title>
                                        </v-card>
                                </v-row>
                            </v-container>
                        </v-col>
                        <v-col class="mr-1" cols="6">
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
                                    v-model="email"
                                    label="Email"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                                <v-text-field
                                    dense
                                    outlined
                                    rounded
                                    v-model="pass"
                                    label="Password"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                                <v-radio-group
                                    v-model="form.jenisKelaminCustomer"
                                    label="Jenis Kelamin"
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
                                    <span class="btnLogin2 white--text">DAFTAR</span>
                                </v-btn>
                                <br><br>
                                <v-card-sub-title >
                                    <h5 class="ml-5 mr-5" style="text-align:center;">
                                        Sudah memiliki akun? <a href="Login">Login disini</a>
                                    </h5>
                                </v-card-sub-title>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>

    </v-main>
</template>

<script>
import image from "../assets/AJR.png"

export default {
    name: "login",
    data() {
        return{
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