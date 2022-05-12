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

        <v-container class="backgroundContainer" fill-height fluid>
            <v-row justify="center" align="center">
                <v-card elevation="20" class="backgroundCard" width="800" height="500" max-height="600" max-width="900">
                    <v-row>
                        <v-col class="ml-1" cols="6">
                            <v-card-title class="justify-center mt-10">
                                <h3>ATMA JOGJA RENTAL</h3>
                            </v-card-title>
                            <v-card-sub-title>
                                <h5>Login Page</h5>
                            </v-card-sub-title>
                            <br>
                            <br>
                            <v-container>
                                <v-form ref="form">

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
                                        type="password"
                                        v-model="pass"
                                        label="Password"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                </v-form>
                                <br><br>
                                <v-btn plain class="btnLogin blue darken-4" >
                                    <span @click="submit" class="btnLogin2 white--text">LOGIN</span>
                                </v-btn>
                                <br><br>
                                <v-card-sub-title >
                                    <h5 class="ml-5 mr-5 mb-3" style="text-align:center;">
                                        Belum memiliki akun? <a href="Register">Daftar disini</a>
                                    </h5>
                                </v-card-sub-title>
                                <br>
                            </v-container>
                        </v-col>
                        <v-col>
                            <v-container fill-height fluid>
                                <v-row class="mr-1" justify="center" align="center">
                                        <v-card class="overlap" height="300" width="300" max-width="300" max-height="300">
                                            <v-icon class="mt-12" size="50px">mdi-login</v-icon>
                                            <br><br>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:justify;">
                                                    Login lah ke website kami untuk mengakses penuh fasilitas peminjaman 
                                                    transportasi dan nikmati perjalanan anda bersama keluarga maupun teman di Yogayakarta.
                                                </h5>
                                            </v-card-sub-title>
                                        </v-card>
                                </v-row>
                            </v-container>
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
            error_message: null,
            success_message: null,
            color: null,
            snackbar: null,
            snackbar2: null,
            load: null,
            email: null,
            pass: null,
            AJRlogo: image,
            menuItems:[
                { title: 'Beranda', path: '/AtmaJayaRental' },
            ],
            sidebar: false,
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        }
    },

    methods:{
        toHome(){
            this.$router.push({
                name: 'AJR',
            });
        },
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;
                this.$http.post(this.$api + '/login', {
                    email: this.email,
                    password: this.pass
                }).then(response => {
                    //simpan data id user yang diinput
                    if(response.data.role == 'customer'){
                        localStorage.setItem('id',response.data.user.idCustomer);
                        localStorage.setItem('name',response.data.user.namaCustomer);
                        localStorage.setItem('tanggalLahir',response.data.user.tanggalLahirCustomer);
                        localStorage.setItem('KP',response.data.user.KP);
                        localStorage.setItem('SIM',response.data.user.SIM);
                        localStorage.setItem('statusBerkas',response.data.user.statusBerkas);
                        localStorage.setItem('waiting',response.data.user.waiting);
                        localStorage.setItem('role',response.data.role);
                        localStorage.setItem('token',response.data.token);
                    }else if(response.data.role == 'pegawai'){
                        localStorage.setItem('id',response.data.user.idPegawai);
                        localStorage.setItem('name',response.data.user.namaPegawai);
                        localStorage.setItem('role',response.data.role);
                        localStorage.setItem('idRole',response.data.user.idRole);
                        localStorage.setItem('token',response.data.token);
                    }else if(response.data.role == 'driver'){
                        this.success_message = 'Akun Driver tidak memiliki akses website, Login melalui aplikasi Mobile';
                        this.color = "yellow darken-3";
                        this.snackbar2 = true;
                        this.load = false;
                        return;
                    }
                    this.success_message = response.data.message;
                    this.color = "green";
                    this.snackbar2 = true;
                    this.load = false;
                    this.clear();
                    // this.$store.commit("setAuthentication", true);
                    if(response.data.role === 'customer'){
                        if(localStorage.getItem('statusBerkas') === 'Diterima'){
                            this.$router.push({ name: "Beranda",})
                        }else{
                            this.$router.push({ name: "Profil",})
                            }
                    }
                    else if(response.data.role === 'pegawai'){
                        if(response.data.user.idRole === 1){
                            this.$router.push({ name: "Manager",})
                        }else if(response.data.user.idRole === 2){
                            this.$router.push({ name: "Admin",})
                        }else{
                            this.$router.push({ name: "CS",})
                        }
                    }
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    localStorage.removeItem('token');
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
    background: linear-gradient(90deg, #FFFFFF 50%, #0D47A1 50%);
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