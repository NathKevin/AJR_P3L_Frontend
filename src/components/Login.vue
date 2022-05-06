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
                                <br><br>
                                <v-btn plain class="btnLogin blue darken-4" >
                                    <span class="btnLogin2 white--text">LOGIN</span>
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

    </v-main>
</template>

<script>
import image from "../assets/AJR.png"

export default {
    name: "login",
    data() {
        return{
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