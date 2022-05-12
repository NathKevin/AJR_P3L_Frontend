<template>
    <v-main class="transaksi">
        <br><br><br>
        <v-container fluid>
            <v-progress-circular
                size="60"
                v-if="load"
                indeterminate
                color="primary"
            ></v-progress-circular>
            <v-overlay :value="load"></v-overlay>
            <v-card class="overlap" v-if="isTransaksi" width="auto" height="auto" elevation="10">
                <v-toolbar class="cyan lighten-2  " min-height="80">
                    <h2 class="text-left ml-7 mt-4">Riwayat Transaksi</h2>
                </v-toolbar>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-list elevation="5">
                    <v-list-item-group>
                        <v-row>
                            <v-list-item  v-for="(item,key) in transaksi" :key="key">
                                <v-list-item-content @click="detailPembayaran(item, key)">
                                    <v-col>
                                        <v-row>
                                            <v-col cols="2">
                                                <h4 class="text-left ml-4">No. Transaksi</h4>
                                            </v-col>
                                            <v-col cols="1">
                                                <h4 class="text-left">:</h4>
                                            </v-col>
                                            <v-col cols="9">
                                                <h4 class="text-left">{{ item.idTransaksi }}</h4>
                                            </v-col>
                                        </v-row>
                                        <v-row >
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Tanggal Transaksi</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left">:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left">{{ item.tanggalTransaksi }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Tanggal Sewa</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left">:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left">{{ item.tanggalWaktuSewa }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Tanggal Selesai</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left">:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left">{{ item.tanggalWaktuSelesai }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Tanggal Kembali</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left" >:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left">{{ kembaliShow(item.tanggalWaktuKembali) }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-row dense justify="start" >
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Status Transaksi</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left" >:</p>
                                            </v-col>
                                            <v-chip small color="gray" v-if="item.statusTransaksi == 'Menunggu Konfirmasi'" dark>
                                                {{ item.statusTransaksi }}
                                            </v-chip>
                                            <v-chip small :color="colorStatus" v-if="item.statusTransaksi == 'Peminjaman Berlangsung'"  dark>
                                                {{ checkStatus(item.statusTransaksi, item.diff) }}
                                            </v-chip>
                                            <v-chip small color="green darken-3" v-if="item.statusTransaksi == 'Peminjaman Selesai'" dark>
                                                {{ item.statusTransaksi }}
                                            </v-chip>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Customer Service</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left">:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left" v-if="show">{{ CsNameCollection[key] }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="2">
                                                <p class="text-left ml-4">Nama Driver</p>
                                            </v-col>
                                            <v-col cols="1">
                                                <p class="text-left">:</p>
                                            </v-col>
                                            <v-col cols="9">
                                                <p class="text-left" v-if="driverShow(item.idDriver)">{{ DriverNameCollection[key] }}</p>
                                            </v-col>
                                        </v-row>
                                        <v-divider></v-divider>
                                        <v-divider></v-divider>
                                    </v-col>
                                </v-list-item-content>
                            </v-list-item>
                        </v-row>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card v-if="empty" class="overlap justify-center pt-5 pb-5">
                    <h3>
                        Belum ada Transaksi Peminjaman
                    </h3>
            </v-card>
     
        </v-container>

        <v-dialog v-model="dialogDetailPembayaran">
            <v-toolbar class="blue darken-4">
                <h3 class="white--text">Detail Transaksi</h3>
            </v-toolbar>
            <v-card width="auto" height="auto">
                <v-container fluid>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Nama Mobil</p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" v-if="show3">{{ MobilCollection[this.key] }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Nomor Plat </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" v-if="show3">{{ noPlatCollection[this.key] }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Jenis Promo </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" v-if="show4">{{ checkPromo() }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Besar Promo </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" v-if="show4">{{ checkPromo2() }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Metode Pembayaran </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >{{ this.formPembayaran.metodePembayaran }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Total Promo </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >Rp {{ this.formPembayaran.totalPromo }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Total Biaya Mobil </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >Rp {{ this.formPembayaran.totalBiayaMobil }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Total Biaya Driver </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >Rp {{ this.formPembayaran.totalBiayaDriver }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Denda </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >Rp {{ this.formPembayaran.dendaPeminjaman }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Total Biaya </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-col cols="9">
                            <p class="text-left" >Rp {{ this.formPembayaran.totalBiaya }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters>
                        <v-col cols="2">
                            <p class="text-left ml-4">Status Pembayaran </p>
                        </v-col>
                        <v-col cols="1">
                             <p class="text-left">:</p>
                        </v-col>
                        <v-chip small color="red" v-if="this.formPembayaran.statusPembayaran == 0" dark>
                            Belum Lunas
                        </v-chip>
                        <v-chip small color="green" v-if="this.formPembayaran.statusPembayaran == 1" dark>
                            Lunas
                        </v-chip>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

    </v-main>
</template>

<script>
export default {
    name: 'transaksi',
    data() {
        return {
            load: true,
            key: null,
            isTransaksi: false,
            dialogDetailPembayaran : false,
            tanggalWaktuKembali: null,
            show: false,
            show2: false,
            show3: false,
            show4: false,
            colorStatus: 'blue darken-4',
            empty: false,
            CsNameCollection: [],
            DriverNameCollection: [],
            MobilCollection: [],
            noPlatCollection: [],
            PromoCollection: [],
            discountCollection: [],
            PembayaranCollection: [],
            transaksi: [],
            formPembayaran:{
                idPembayaran : null,
                idMobil : null,
                idPromo : null,
                idDriver : null,
                metodePembayaran : null,
                totalPromo : null,
                totalBiayaMobil : null,
                totalBiayaDriver : null,
                dendaPeminjaman : null,
                totalBiaya : null,
                statusPembayaran : null,
            },
        }
    },
    methods: {
        checkTransaksi(){
            if(this.transaksi == null){
                this.empty = true;
                this.isTransaksi = false;
                this.load = false;
            }else{
                this.load=false;
                this.isTransaksi = true;
                this.empty = false;
            }
        },
        driverShow(idDriver){
            if(this.show2 == true && idDriver != null){
                return true;
            }
        },
        kembaliShow(item){
            if(item != null){
                return item;
            }else{
                return "Peminjaman Belum Selesai";
            }
        },
        checkStatus(item, diff){
            if(item === "Peminjaman Berlangsung" && diff ==0){
                this.colorStatus = 'yellow darken-3'
                return "Hari ini Pengembalian"
            }else if(item === "Peminjaman Berlangsung" && diff <=0){
                 this.colorStatus = 'red darken-2'
                return "Pengembalian Terlambat"
            }else{
                return "Peminjaman Berlangsung"
            }
        },
        checkPromo(){
            if(this.PromoCollection[this.key] != null){
                return this.PromoCollection[this.key];
            }else{
                return "Tidak Menggunakan Promo"
            }
        },
        checkPromo2(){
            if(this.discountCollection[this.key] != null){
                return this.discountCollection[this.key] * 100 + '%';
            }else{
                return "0%"
            }
        },
        detailPembayaran(item, key){
            this.formPembayaran.idPembayaran = this.PembayaranCollection[key].idPembayaran;
            this.formPembayaran.idMobil = this.PembayaranCollection[key].idMobil;
            this.formPembayaran.idPromo = this.PembayaranCollection[key].idPromo;
            this.formPembayaran.idDriver = this.PembayaranCollection[key].idDriver;
            this.formPembayaran.metodePembayaran = this.PembayaranCollection[key].metodePembayaran;
            this.formPembayaran.totalPromo = this.PembayaranCollection[key].totalPromo;
            this.formPembayaran.totalBiayaMobil = this.PembayaranCollection[key].totalBiayaMobil;
            this.formPembayaran.totalBiayaDriver = this.PembayaranCollection[key].totalBiayaDriver;
            this.formPembayaran.dendaPeminjaman = this.PembayaranCollection[key].dendaPeminjaman;
            this.formPembayaran.totalBiaya = this.PembayaranCollection[key].totalBiaya;
            this.formPembayaran.statusPembayaran = this.PembayaranCollection[key].statusPembayaran;
            this.key = key;
            this.dialogDetailPembayaran = true;
        },
        async showByCustomer(){
            var url = this.$api + '/showAllCustomer/transaksi/' + localStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.transaksi = response.data.data;
            })
        },
        async showByCustomer2(){
            var url = this.$api + '/showAllCustomer/pembayaran/' + localStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.PembayaranCollection = response.data.data;

            })
        },
        async getCustomerServiceName(item) {
            var url = this.$api + '/show/pegawai/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.CsNameCollection.push(response.data.data.namaPegawai); 
                this.show = true;
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
                    this.DriverNameCollection.push(response.data.data.namaDriver); 
                }else{
                    this.DriverNameCollection.push(null); 
                }
                this.show2 = true;
            })
        },
        async getCarName(item) {
            var url = this.$api + '/show/mobil/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.MobilCollection.push(response.data.data.namaMobil); 
                this.noPlatCollection.push(response.data.data.platNomor); 
                this.show3 = true;
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
                    this.PromoCollection.push(response.data.data.jenisPromo); 
                    this.discountCollection.push(response.data.data.besarPromo); 
                }else{
                    this.PromoCollection.push(null); 
                    this.discountCollection.push(null); 
                }
                this.show4 = true;
                this.checkTransaksi()
            })
        },
        // async getPembayaran(item) {
        //     var url = this.$api + '/show/pembayaran/' + item;
        //     await this.$http.get(url, {
        //           headers: {
        //               'Authorization' : 'Bearer ' + localStorage.getItem('token')
        //           }
        //     }).then(response => {
        //         this.PembayaranCollection.push(response.data.data); 
        //         console.log('tes')
        //     })
        // },
        async afterRequestLoaded() {
            if(this.transaksi != null || this.PembayaranCollection != null){
                this.transaksi.forEach(async (request) => await this.getCustomerServiceName(request.idPegawai));
                this.transaksi.forEach(async (request) => await this.getDriverName(request.idDriver));
                this.PembayaranCollection.forEach(async (request) => await this.getCarName(request.idMobil));
                this.PembayaranCollection.forEach(async (request) => await this.getPromo(request.idPromo));
            }else{
                this.checkTransaksi()
            }
        },
        
    },

    async created(){
        await this.showByCustomer();
        await this.showByCustomer2();
        await this.afterRequestLoaded();
    },

    // async mounted(){
    // }
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