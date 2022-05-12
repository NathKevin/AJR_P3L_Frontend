<template>

<v-app>

    <v-main class="landingpage">
        
        <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
            <v-list>
                <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path">
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
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
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only hidden-sm-only">
                <button @click="scrollMeTo('#beranda')" class="buttonapp" type="button">Beranda</button>
                <v-divider vertical></v-divider>
                <v-divider vertical></v-divider>
                <button @click="scrollMeTo('#mobil')" class="buttonapp" type="button">Jenis Mobil</button>
                <v-divider vertical></v-divider>
                <v-divider vertical></v-divider>
                <button @click="scrollMeTo('#tentang')" class="buttonapp" type="button">Tentang</button>
                <v-divider vertical></v-divider>
                <v-divider vertical></v-divider>
                <button @click="scrollMeTo('#hubungi_kami')" class="buttonapp" type="button">Hubungi Kami</button>
                
                <v-btn text router :to="{name: 'Login'}" plain color="white" class="ml-6">Login</v-btn>
                <v-btn @click="scrollMeTo('#register')" plain color="white" class="ml-6">Register</v-btn>
            </v-toolbar-items>
        </v-app-bar>
        
        <div class="carousel" id="beranda">
            <template>
            <v-carousel
                cycle
                height="800"
                hide-delimiters
                :show-arrows="false"
            >
                <v-carousel-item
                    v-for="(slide,i) in slides"
                    :key="i"
                    :src="slide.src"
                    style="filter: brightness(40%);"
                >
                </v-carousel-item>
            </v-carousel>
            </template>
        </div>

        <div class="overlap">
            <v-card height="800" width="560" elevation="20">
            <v-container bg fill-height grid-list-md> 
                <v-layout row wrap align-center>
                    <v-flex>
                        <h1 class="text-right">Kami hadir untuk memberikan kenyamanan anda dalam bertransportasi bersama keluarga dan teman</h1>
                    </v-flex>
                </v-layout>
            </v-container>
            </v-card>
        </div>

        <div id="mobil">
            <v-card height="600" max-height="800" max-width="100%" >
                <v-container fluid fill-height>
                    <v-row>
                        <v-col><v-divider></v-divider><v-divider></v-divider></v-col>
                    </v-row>
                    <template>
                    <v-row>
                        <v-col
                        v-for="n in car1"
                        :key="n"
                        class="d-flex child-flex"
                        cols="2"
                        >
                        <v-img
                            :src="n.src"
                            aspect-ratio="2"
                            class="grey lighten-2 "
                        >
                            <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                            </template>
                        </v-img>
                        </v-col>
                    </v-row>
                    </template>
                    <template>
                    <v-row>
                        <v-col
                        v-for="n in car2"
                        :key="n"
                        class="d-flex child-flex"
                        cols="2"
                        >
                        <v-img
                            :src="n.src"
                            aspect-ratio="2"
                            class="grey lighten-2"
                        >
                            <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                            </template>
                        </v-img>
                        </v-col>
                        <v-col>
                            <v-container bg fill-height grid-list-md> 
                                <v-layout row wrap align-center>
                                    <v-flex>
                                        <h2 v-scrollanimation>Kami menyediakan mobil berkualitas dengan harga terjangkau</h2>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-btn v-scrollanimation class="blue darken-4 white--text" @click="dialog = true"> Lihat Mobil</v-btn>
                        </v-col>
                    </v-row>
                    </template>
                    <template>
                    <v-row>
                        <v-col
                        v-for="n in car3"
                        :key="n"
                        class="d-flex child-flex"
                        cols="2"
                        >
                        <v-img
                            :src="n.src"
                            aspect-ratio="2"
                            class="grey lighten-2"
                        >
                            <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                                <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                            </template>
                        </v-img>
                        </v-col>
                    </v-row>
                    </template>
                    <v-row>
                        <v-col><v-divider></v-divider><v-divider></v-divider></v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>

        <div>
            <v-card class="bgBeranda" height="200" max-height="800" max-width="100%" >
                <v-container fluid fill-height>
                    <v-row justify="center" align="center">
                        <h1 v-scrollanimation class=" white--text"> <strong>Jadilah salah satu bagian dari kami</strong> </h1>
                    </v-row>
                </v-container>
            </v-card>
        </div>

        <div id="register">
            <v-card height="800" max-height="800" max-width="100%" class="blue darken-4 white--text">
                <template>
                    <v-parallax height="800" :src="BG1"  >
                        <v-row justify="center" align="center" dense>
                            <v-img v-scrollanimation :src="AJRlogocrop" max-height="600" max-width="600"></v-img>
                        </v-row>
                        <v-row justify="center" align="center" dense>
                            <v-btn elevation="10" class="blue darken-4 white--text" router :to="{name: 'Register'}" > Bergabung sekarang</v-btn>
                        </v-row>
                    </v-parallax>
                </template>
            </v-card>
        </div>

        <div id="tentang">
            <v-card v-scrollanimation height="950" max-height="1000" max-width="100%" >
                <h1 class="text-right mb-8 pt-5 mr-8">Tentang Atma Jogja Rental</h1>
                <template>
                    <v-container>
                        <div>
                            <v-timeline
                                v-scrollanimation
                                :dense="$vuetify.breakpoint.smAndDown"
                                >
                                <v-timeline-item
                                    v-for="n in timeline"
                                    :key="n"
                                >
                                    <span slot="opposite">{{ n.title }}</span>
                                    <v-card class="elevation-2">
                                    <v-card-title class="text-h5">
                                        {{ n.title }}
                                    </v-card-title>
                                    <v-card-text>
                                        {{ n.text }}
                                    </v-card-text>
                                    </v-card>
                                </v-timeline-item>
                            </v-timeline>
                        </div>
                    </v-container>
                </template>
            </v-card>
        </div>

        <div id="hubungi_kami">
            <v-card v-scrollanimation height="300" max-height="1000" max-width="100%" >
                <h1  class="text-left mb-8 pt-5 ml-8">Kontak Kami</h1>
                <template>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="4">
                                <v-card
                                    v-scrollanimation
                                    class="mx-auto"
                                    max-width="500"
                                >
                                    <v-card-title>
                                        Anda butuh bantuan layanan kami?
                                    </v-card-title>

                                    <v-card-subtitle class="text-left">
                                        Hubungi Customer Service kami +6289872837642
                                    </v-card-subtitle>

                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card
                                    v-scrollanimation
                                    class="mx-auto"
                                    max-width="500"
                                >
                                    <v-card-title>
                                        Ingin menyampaikan saran dan kritik?
                                    </v-card-title>

                                    <v-card-subtitle class="text-left">
                                        Mari bantu kami untuk menjadi pelayan transportasi yang lebih baik dengan mengisi survey di 
                                        <a href="#">https://hanyacontohlinksurveysaja.com</a>
                                    </v-card-subtitle>
                                    
                                </v-card>
                            </v-col>
                            <v-col cols="4">
                                <v-card
                                    v-scrollanimation
                                    class="mx-auto"
                                    max-width="500"
                                >
                                    <v-card-title>
                                        Pembuatan Wesbite AJR?
                                    </v-card-title>

                                    <v-card-subtitle class="text-left">
                                        Website ini dibuat oleh Nathanael Kevin Wijaya | 190710059
                                        Prodi Informatika Universitas Atma Jaya Yogyakarta
                                    </v-card-subtitle>
                                    
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
            </v-card>
        </div>

        <!-- <div>
            <v-card class="reveal" height="100" width="100%">
                <v-container fill-height>
                    <v-row align="center" justify="center">
                        <v-column>
                            <h2 class="mr-5">Kami siap melayani anda setiap hari Selasa - Minggu </h2>
                        </v-column>
                        <v-divider vertical></v-divider>
                        <v-divider vertical></v-divider>
                        <v-column>
                            <h2 class="ml-5">Pukul 08.00 - 22.00</h2>
                        </v-column>
                    </v-row>
                </v-container>
            </v-card>
        </div> -->

        <v-dialog v-model="dialog" max-width="850">
            <v-card>
                <v-toolbar class="blue darken-4 white--text">
                    <h3>Daftar Jenis Mobil</h3>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dialog = !dialog" router v-bind="attrs" v-on="on" icon fab> 
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Exit</span>
                    </v-tooltip>
                </v-toolbar>
                <v-container fluid>
                    <v-list three-line elevation="10" dense>
                        <v-list-item-group>
                            <v-row>
                                <v-list-item disabled dense>
                                    <v-col cols="6">
                                        <strong>Gambar</strong>
                                    </v-col>
                                    <v-col cols="6">
                                        <strong>Atribut</strong>
                                    </v-col>
                                </v-list-item>
                            </v-row>
                            <v-divider></v-divider>
                            <v-divider></v-divider>
                            <v-row>
                                <v-list-item  v-for="car in car1" :key="car.id" >
                                    <v-col>
                                        <div class="subheading pt-4">
                                            <v-img :src='car.src' height="200px" max-height="200px"  max-width="400px" />
                                        </div>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-divider vertical></v-divider>
                                    <v-col class="text-left ml-7">
                                        Nama : {{ car.nama }} <br>
                                        Transmisi : {{ car.transmisi }} <br>
                                        Harga : {{ car.harga }} <br>
                                    </v-col>
                                </v-list-item>
                            </v-row>
                            <v-row>
                                <v-list-item  v-for="car in car2" :key="car.id" >
                                    <v-col>
                                        <div class="subheading pt-4">
                                            <v-img :src='car.src' height="200px" max-height="200px" max-width="400px" />
                                        </div>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-divider vertical></v-divider>
                                    <v-col class="text-left ml-7">
                                        Nama : {{ car.nama }} <br>
                                        Transmisi : {{ car.transmisi }} <br>
                                        Harga : {{ car.harga }} <br>
                                    </v-col>
                                </v-list-item>
                            </v-row>
                            <v-row>
                                <v-list-item  v-for="car in car3" :key="car.id" >
                                    <v-col>
                                        <div class="subheading pt-4">
                                            <v-img :src='car.src' height="200px" max-height="200px" max-width="400px" />
                                        </div>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-divider vertical></v-divider>
                                    <v-col class="text-left ml-7">
                                        Nama : {{ car.nama }} <br>
                                        Transmisi : {{ car.transmisi }} <br>
                                        Harga : {{ car.harga }} <br>
                                    </v-col>
                                </v-list-item>
                            </v-row>
                        </v-list-item-group>
                    </v-list>
                </v-container>
            </v-card>
        </v-dialog>

        <template>
            <v-footer
                dark
                padless
            >
                <v-card
                class="flex"
                flat
                tile
                >
                <v-card-title class="blue darken-4">
                    <strong class="subheading">Teruslah terhubung bersama kami!</strong>

                    <v-spacer></v-spacer>

                    <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4"
                    dark
                    icon
                    >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text class="py-2 white--text text-center">
                   <strong>Copyright</strong> - {{ new Date().getFullYear() }} <strong>By Nathanael Kevin Wijaya. All Rights Reserved.</strong>
                   <br>
                   <strong>Powered By AJR</strong>
                </v-card-text>
                </v-card>
            </v-footer>
            </template>
    </v-main>
</v-app>
</template>

<script>
import image from "../assets/AJR.png"
import logoCrop from "../assets/AJR_crop.png"
import BG1 from "../assets/Bg1.jpg"
import rentImage1 from "../assets/carousel/car-rental1.jpg"
import rentImage2 from "../assets/carousel/car-rental2.jpg"
import rentImage3 from "../assets/carousel/car-rental3.jpg"

export default {
    name : "LandingPage",
    data() {
        return{
            dialog: false,
            sidebar: false,
            AJRlogo : image,
            AJRlogocrop: logoCrop,
            BG1 : BG1,
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                {src: rentImage1},
                {src: rentImage2},
                {src: rentImage3},
            ],
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
            menuItems: [
                { title: 'Home', path: '/home', icon: '' },
                { title: 'Sign Up', path: '/signup', icon: '' },
                { title: 'Sign In', path: '/signin', icon: '' }
            ],
            car1:[
                {id:1 ,src: require("../assets/car1/Brio.jpg"), nama:"Honda Brio", transmisi:"Automatic", harga:"Rp 200.000/hari"},
                {id:2 ,src: require("../assets/car1/Agya.jpg"), nama:"Honda Agya", transmisi:"Automatic", harga:"Rp 250.000/hari"},
                {id:3, src: require("../assets/car1/Rush2.jpg"), nama:"Toyota Rush", transmisi:"Automatic", harga:"Rp 1.000.000/hari"},
            ],
            car2:[
                {src: require("../assets/car2/Civic.jpg"), nama:"Honda Civic", transmisi:"Automatic", harga:"Rp 500.000/hari"},
                {src: require("../assets/car2/Alphard.jpg"), nama:"Toyota Alphard", transmisi:"Automatic", harga:"Rp 1.500.000/hari"},
                {src: require("../assets/car2/Vios.jpg"), nama:"Toyota New Vios", transmisi:"Automatic", harga:"Rp 400.000/hari"},
            ],
            car3:[
                {src: require("../assets/car3/Avanza.jpg"), nama:"Toyota New Avanza", transmisi:"CVT", harga:"Rp 300.000/hari"},
                {src: require("../assets/car3/Fortuner.jpg"), nama:"Toyota Fortuner", transmisi:"Automatic", harga:"Rp 1.250.000/hari"},
                {src: require("../assets/car3/Jazz.jpg"), nama:"Honda Jazz", transmisi:"Automatic", harga:"Rp 300.000/hari"},
            ],
            timeline:[
                {title: "Visi", text: "Visi kami adalah memberikan pelayanan yang terbaik dalam mendistribusikan kebutuhan transportasi pelanggan di daerah Yogyakarta"},
                {title: "Misi", text: "Misi kami menjunjung tinggi kejujuran dan sopan santun serta kejujuran untuk mencapai lingkungan kerja dan pelayanan yang paling maksimal"},
                {title: "Sejarah", text: "Atma Jogja Rental merupakan perusahaan rental transportasi mobil yang telah berdiri sejak tahun XXXX atas gagasan Pak Hasan. Kami telah melayani banyak pelanggan dengan sepenuh hati dan segenap tenaga untuk memberikan pelayanan yang terbaik serta pengalaman yang tak terlupakan bagi pelanggan kami. Kini kami telah kembali dengan sistem operasi yang terbaru dengan menggunakan reservasi melalui website. "},
                {title: "Dibalik Layar", text: "Ini merupakan projek mata kuliah P3L yakni pembuatan website menggunakan Laravel sebagai backend dan Vue 2 sebagai frontend serta sinkronisasi dengan aplikasi mobile menggunakan sistem operasi android"},
            ]   
        }
    },
    methods : {
        toHome(){
            this.$router.push({
                name: 'AJR',
            });
        },
        scrollMeTo(ref){
            const el = document.querySelector(ref)
            el && el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
        }
    }
}
</script>

<style scoped>
.alphaColor{
    background-color: rgba(0, 0, 0, 0.7);
}

.buttonapp{
    color: white;
    padding: 20px;
    transition-duration: 0.4s;
}

.buttonapp:hover {
  background-color: #2F69C3;
  color: white;
  
}

.buttonapp:focus{
    background-color:#476A87;
    color: #FDD84B;
}

.carousel{
    background-color: rgba(0, 0, 0, 0.7);
    display: block;
    position: relative;
}

.overlap{
   position:absolute;
   top: 0;
   right: 0;
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

.overlap2{
   position:absolute;
   right: 0;
   opacity: 85%;
}

.bgBeranda{
    background: linear-gradient(-180deg, #0D47A1 10%, #010210 90%);
}

.before-enter{
    opacity:  0;
    transform: translateY(100px);
    transition: all 2s ease-out;
}

.enter{
    opacity: 1;
    transform: translateY(0px);
}

/* .reveal:link {
    font-size: 20;
    outline: thin solid;
}
.reveal:hover {
    background-color: #2F69C3;
    color: #FFFFFF;
    top: 0;
    left: 0;
    font-size: 20px;
} */

</style>