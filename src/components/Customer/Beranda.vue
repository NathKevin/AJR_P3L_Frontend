<template>
    <v-main class="beranda">
        <br><br><br>

        <v-container fluid>
            <v-row>
                <v-col sm="12">
                    <v-progress-circular
                        size="60"
                        v-if="load"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    <v-overlay :value="load"></v-overlay>
                    <v-card elevation="10" class="overlap" v-if="isTransaksi" width="auto" height="auto" max-height="auto">
                        <v-toolbar class="cyan lighten-2" min-height="80">
                            <h2 class=" ml-7 mt-4 text-left">Peminjaman yang sedang berlangsung</h2>
                            <v-spacer></v-spacer>
                            <v-btn max-width="150" class="white mt-4"><Strong>Bayar</Strong></v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br>
                        <v-row>
                            <v-col lg="2" sm="2" md="2">
                                <h4 class="text-left ml-4">No. Transaksi</h4>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <h4 class="text-left">:</h4>
                            </v-col>
                            <v-col >
                                <h4 class="text-left">{{ transaksi.idTransaksi }}</h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Transaksi</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalTransaksi }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Sewa</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalWaktuSewa }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Selesai</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalWaktuSelesai }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Nama Driver</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaDriver }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Nama Mobil</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaMobil }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Plat Nomor</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.platNomor }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Promo</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaPromo }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Besar Promo</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.besarPromo * 100}}%</p>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card elevation="10" class="overlap" v-if="empty">
                        <h2 class="cyan lighten-2 pl-7 pb-5 pt-5 text-left">Peminjaman yang sedang berlangsung</h2>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br>
                        <h4>Tidak ada Peminjaman yang sedang Berlangsung</h4>
                        <br>
                        <v-btn to="/buatTransaksi" color="blue darken-4" elevation="5" class="white--text mb-10" >Pinjam Mobil Sekarang</v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6" md="12" lg="6">
                    <v-hover v-slot="{hover}">
                        <v-card elevation="10" class="overlap" v-if="other">
                            <v-toolbar class="cyan lighten-2 " min-height="50">
                                <h3 class="ml-7 text-left">Berita Pengumuman</h3>
                            </v-toolbar>
                            <v-img style="filter: brightness(50%);" :src="image">
                            </v-img>
                                <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class=" transition-fast-in-fast-out v-card--reveal white--text"
                                        style="height: 80%;"
                                    >
                                        <h4 class="text-left mr-6 ml-6 mt-5"> 
                                            Selamat datang di website Atma Jogja Rental. Kami telah hadir membawakan fitur baru sehingga 
                                            mempermudahkan anda dalam menyewa alat transportasi untuk berpegian di daerah Jogja.

                                        </h4>
                                    </div>
                                </v-expand-transition>
                            <v-toolbar style="opacity: 80%" absolute bottom width="750">
                                <v-card-title>
                                    <strong>Kami Hadir dengan website dan aplikasi mobile</strong> 
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-sub-title>
                                    Lebih cepat, lebih efisien
                                </v-card-sub-title>
                            </v-toolbar>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col sm="6"  md="12" lg="6">
                    <v-card elevation="10" class="overlap" v-if="other">
                        <v-toolbar  class="cyan lighten-2" min-height="50">
                            <h3 class="ml-7 text-left">Promo yang tersedia</h3>
                        </v-toolbar>
                        <v-list dense disabled>
                            <v-list-item v-for="(item,key) in promosAvailable" :key="key">
                                <v-list-item-content>
                                    <p class="text-left">{{ item }}</p>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </v-main>
</template>

<script>
import image from "../../assets/carousel/car-rental2.jpg"

export default {
    name: 'transaksi',
    data() {
        return {
            image : image,
            todayDay: null,
            todayDate: null,
            load: true,
            empty: false,
            other: false,
            namaMobil: null,
            platNomor: null,
            namaDriver: null,
            namaCS: null,
            namaPromo : null,
            besarPromo : null,
            isTransaksi: false,
            transaksi: {},
            promos: [],
            promosAvailable : [],
        }
    },
    methods: {
        checkPromoAvailable(){
            for(let i=0; i<this.promos.length; i++){
                if(this.promos[i].kode == 'WKN'){
                    if(this.todayDay == 'Saturday' || this.todayDay == 'Sunday'){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'MHS'){
                    if(localStorage.getItem('KP') != null){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'BDAY'){
                    if(localStorage.getItem('tanggalLahir') == this.todayDate){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'MDK'){
                    this.promosAvailable.push(this.promos[i].jenisPromo);
                }
            }
            if(this.promosAvailable == null){
                this.promosAvailable = 'Yah, belum ada promo untuk kamu'
            }
        },
        checkTransaksi(){
            if(this.transaksi == null){
                this.empty = true;
                this.isTransaksi = false;
                this.load = false;
                this.other = true;
            }else{
                this.load=false;
                this.isTransaksi = true;
                this.empty = false;
                this.other = true;
            }
        },
        async showByCustomer(){
            this.load = true;
            var url = this.$api + '/showInProgress/transaksi/' + localStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.transaksi = response.data.data;
                if(response.data.data != null){
                    this.getCarName(response.data.data.idMobil);
                    this.getDriverName(response.data.data.idDriver);
                    this.getCustomerServiceName(response.data.data.idPegawai);
                    this.getAllPromo();
                    this.getPromo(response.data.data.idPromo);
                }else{
                    this.getAllPromo();
                    this.checkTransaksi();
                }
            })
        },
        async getCarName(item) {
            var url = this.$api + '/show/mobil/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.namaMobil = response.data.data.namaMobil;
                this.platNomor = response.data.data.platNomor;
            })
        },
        async getDriverName(item) {
            var url = this.$api + '/show/driver/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data != null){
                    this.namaDriver = response.data.data.namaDriver;
                }else{
                    this.namaDriver = 'Tidak Menggunakan Driver';
                }
            })
        },
        async getCustomerServiceName(item) {
            var url = this.$api + '/show/pegawai/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.namaCS = response.data.data.namaPegawai;
            })
        },
        async getPromo(item) {
            var url = this.$api + '/show/promo/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data != null){
                    this.namaPromo = response.data.data.jenisPromo;
                    this.besarPromo = response.data.data.besarPromo;
                }else{
                    this.namaPromo = 'Tidak Menggunakan Promo';
                    this.besarPromo = '0.0';
                }
                this.checkTransaksi();
            })
        },
        async getAllPromo(){
            var url = this.$api + '/promo';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.promos = response.data.data;
                this.todayDay = response.data.day;
                this.todayDate = response.data.date;
                this.checkPromoAvailable();
            })
        },
        
    },

    async mounted(){
        await this.showByCustomer();
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

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>