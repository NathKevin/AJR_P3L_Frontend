<template>
    <v-main class="transaksi">
        <br><br><br>

        <v-container>
            <v-progress-circular
                size="60"
                v-if="load"
                indeterminate
                color="primary"
            ></v-progress-circular>
            <v-overlay :value="load"></v-overlay>
            <v-card elevation="10" class="overlap">
                <v-toolbar class="cyan lighten-2" min-height="80">
                    <h2 class=" ml-7 mt-4 text-left">Buat Transaksi Peminjaman Baru</h2>
                </v-toolbar>
            <template>
                <v-stepper
                    v-model="e6"
                    vertical
                >
                    <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                    >
                    Pendataan Peminjaman 
                    </v-stepper-step>

                    <v-stepper-content step="1">
                    <v-card
                        rounded="xl"
                        color="grey lighten-4"
                        class="mb-5"
                        height="auto"
                    >
                    <v-container>
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
                                class="mt-5"
                                outlined
                                rounded
                                dense
                                v-model="formTransaksi.tanggalWaktuSewa"
                                label="Tanggal Mulai Sewa"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules.null"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="formTransaksi.tanggalWaktuSewa"
                                :active-picker.sync="activePicker"
                                :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <div>
                            <v-menu
                            ref="menu"
                            v-model="menu2"
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
                                v-model="formTransaksi.tanggalWaktuSelesai"
                                label="Tanggal Selesai Sewa"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules.null"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="formTransaksi.tanggalWaktuSelesai"
                                :active-picker.sync="activePicker"
                                :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-select
                            outlined
                            dense
                            rounded
                            type="number"
                            v-model="formPembayaran.promo"
                            :item-text="item=> 'Nama Promo : ' + item.jenisPromo + ' -- ' +  ' Besar Promo : ' + item.besarPromo * 100 + '%'"  
                            item-value="idPromo"
                            :items="promosAvailable"
                            label="Pakai Promo"
                            :rules="rules.null"
                            v-if="promosAvailable != null"
                            clearable
                        >
                        </v-select>
                        <v-radio-group
                        v-model="formPembayaran.metodePembayaran"
                        class="ml-5"
                        label="Metode Pembayaran"
                        row
                        >
                        <v-radio
                            label="Cash"
                            value="Cash"
                        ></v-radio>
                        <v-radio
                            label="Transfer"
                            value="Transfer"
                        ></v-radio>
                    </v-radio-group>
                    </v-container>
                    </v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-4"
                            class="white--text"
                            v-if="formPembayaran.promo != null && formTransaksi.tanggalWaktuSewa != null && formTransaksi.tanggalWaktuSelesai != null && formPembayaran.metodePembayaran != null"
                            @click="checkPromo "
                        >
                            Lanjut
                        </v-btn>
                    </v-card-actions>
                    </v-stepper-content>

                    <v-stepper-step
                    :complete="e6 > 2"
                    step="2"
                    >
                    Pilih Mobil
                    <small>Berikut adalah list mobil yang tersedia</small>
                    </v-stepper-step>

                    <v-stepper-content step="2">
                    <v-card
                        color="grey lighten-4"
                        class="mb-5"
                        rounded="xl"
                        height="auto"
                        width="auto"
                    >
                    <v-container fluid>
                            <h3 class="text-left ml-5 mb-5">Klik untuk memilih mobil</h3>
                            <v-card rounded="xl">
                                <v-list-item-group>
                                    <v-list>
                                        <v-list-item v-for="(item, key) in mobilsAvailable" :key="key">
                                            <v-list-item-content @click="checkSelectedMobil(item, key)">
                                                <v-col>
                                                    <v-row>
                                                        <v-col sm="12" md="12" lg="4" xl="4">
                                                            <v-img :src="$baseUrl+'/storage/'+item.gambarMobil" max-height="700" max-width="1000"></v-img>
                                                        </v-col>
                                                        <v-col sm="12" md="12" lg="6" xl="6">
                                                            <p class="text-left"> Nama Mobil : {{ item.namaMobil }}</p>
                                                            <p class="text-left"> Tipe Mobil : {{ item.tipeMobil }}</p>
                                                            <p class="text-left"> Jenis Transmisi : {{ item.jenisTransmisi }}</p>
                                                            <p class="text-left"> Jenis Bahan Bakar : {{ item.jenisBahanBakar }}</p>
                                                            <p class="text-left"> Kapasitas Penumpang : {{ item.kapasitasPenumpang }} orang</p>
                                                            <p class="text-left"> Fasilitas : {{ item.fasilitas }}</p>
                                                            <p class="text-left"> Harga Sewa /hari : Rp {{ item.hargaSewaMobil }},00 </p>
                                                        </v-col>
                                                        <v-col sm="12" md="12" lg="2" xl="2">
                                                            <v-container fill-height>
                                                                <v-chip class="blue darken-4 white--text" v-if="item.idMobil == selectedMobil">Terpilih</v-chip>
                                                            </v-container>
                                                        </v-col>
                                                    </v-row>
                                                    <v-divider></v-divider>
                                                    <v-divider></v-divider>
                                                </v-col>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-list-item-group>
                            </v-card>
                    </v-container>
                    </v-card>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-4"
                        class="white--text"
                        v-if="selectedMobil != null"
                        @click="e6 = 3"
                    >
                        Lanjut
                    </v-btn>
                        <v-btn @click="e6 = 1" text>
                            Back
                        </v-btn>
                    </v-card-actions>
                    </v-stepper-content>

                    <v-stepper-step
                    :complete="e6 > 3"
                    step="3"
                    >
                    Pilih Driver
                    <small>Berikut adalah list driver yang tersedia</small>
                    </v-stepper-step>

                    <v-stepper-content step="3">
                    <v-card
                        color="grey lighten-4"
                        class="mb-5"
                        height="auto"
                        rounded="xl"
                    >
                    <v-radio-group
                        v-if="cekSIM()"
                        v-model="isDriver"
                        class="ml-5"
                        label="Apakah anda ingin menggunakan Driver?"
                        row
                        >
                        <v-radio
                            label="Pakai"
                            value="Pakai"
                        ></v-radio>
                        <v-radio
                            label="Tidak Pakai"
                            value="Tidak Pakai"
                            @click="deleteDriver"
                        ></v-radio>
                    </v-radio-group>
                    <v-container v-if="cekSIM2()" fluid>
                            <h3 class="text-left ml-5">Klik untuk memilih driver</h3>
                            <h5 v-if="cekSIM3()" class="text-left ml-5 mb-5">Anda tidak memiliki SIM, Anda harus menggunakan Driver</h5>
                            <v-card rounded="xl">
                                <v-list-item-group>
                                    <v-list>
                                        <v-list-item v-for="(item, key) in driversAvailable" :key="key">
                                            <v-list-item-content @click="checkSelectedDriver(item, key)">
                                                <v-col>
                                                    <v-row>
                                                        <v-col sm="12" md="12" lg="4" xl="4">
                                                            <v-img :src="$baseUrl+'/storage/'+item.fotoDriver" max-height="500" max-width="300"></v-img>
                                                        </v-col>
                                                        <v-col sm="12" md="12" lg="6" xl="6">
                                                            <p class="text-left"> Nama Driver : {{ item.namaDriver }}</p>
                                                            <p class="text-left"> Jenis Kelamin : {{ item.jenisKelaminDriver }}</p>
                                                            <p class="text-left"> No. Telepon : {{ item.noTelpDriver }}</p>
                                                            <p class="text-left"> Harga Sewa /hari: Rp {{ item.hargaSewaDriver }},00</p>
                                                            <p class="text-left"> Ratings : 
                                                                <v-rating readonly :v-model="item.rerataRating" background-color="yellow darken-2" color="yellow"></v-rating>
                                                            </p>
                                                        </v-col>
                                                        <v-col sm="12" md="12" lg="2" xl="2">
                                                            <v-container fill-height>
                                                                <v-chip class="blue darken-4 white--text" v-if="item.idDriver == selectedDriver">Terpilih</v-chip>
                                                            </v-container>
                                                        </v-col>
                                                    </v-row>
                                                    <br>
                                                    <v-divider></v-divider>
                                                    <v-divider></v-divider>
                                                </v-col>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-list-item-group>
                            </v-card>
                    </v-container>
                    </v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-4"
                            class="white--text"
                            v-if="selectedDriver != null || isDriver == 'Tidak Pakai'"
                            @click="e6 = 4"
                        >
                            Lanjut
                        </v-btn>
                        <v-btn @click="e6 = 2" text>
                            Back
                        </v-btn>
                    </v-card-actions>
                    </v-stepper-content>

                    <v-stepper-step step="4">
                    Pengecekan Ulang Semua Data
                    </v-stepper-step>
                    <v-stepper-content step="4">
                    <v-card
                        color="grey lighten-4"
                        class="mb-5"
                        height="auto"
                        rounded="xl"
                    >
                    <v-container>
                        <h3 v-if="warning">Lengkapi Form Pembuatan Transaksi Peminjaman Baru Anda Terlebih Dahulu</h3>
                        <h3 v-if="cekInputan()" class="text-left ml-5 mb-5">Rangkuman seluruh pilihan anda</h3>
                        <v-card v-if="cekInputan()" rounded="xl" height="auto">
                            <p class="text-left ml-5 pt-5"> Tanggal Mulai Sewa : {{ formTransaksi.tanggalWaktuSewa }}</p>
                            <p class="text-left ml-5 "> Tanggal Selesai Sewa : {{ formTransaksi.tanggalWaktuSelesai }}</p>
                            <p class="text-left ml-5 "> Promo Dipilih : {{  namaPromo }}</p>
                            <p class="text-left ml-5 "> Besar Promo : {{  besarPromo * 100 }}%</p>
                            <p class="text-left ml-5 "> Metode Pembayaran : {{  formPembayaran.metodePembayaran }}</p>
                            <v-card width="100%" height="auto">
                                <v-container>
                                    <h3 class="text-left ml-5">Pilihan mobil anda</h3>
                                    <v-row>
                                        <v-col sm="12" md="12" lg="4" xl="4">
                                            <v-img :src="$baseUrl+'/storage/'+formSelectedMobil.gambarMobil" max-height="700" max-width="1000"></v-img>
                                        </v-col>
                                        <v-col sm="12" md="12" lg="8" xl="8">
                                            <p class="text-left"> Nama Mobil : {{ formSelectedMobil.namaMobil }}</p>
                                            <p class="text-left"> Tipe Mobil : {{ formSelectedMobil.tipeMobil }}</p>
                                            <p class="text-left"> Jenis Transmisi : {{ formSelectedMobil.jenisTransmisi }}</p>
                                            <p class="text-left"> Jenis Bahan Bakar : {{ formSelectedMobil.jenisBahanBakar }}</p>
                                            <p class="text-left"> Kapasitas Penumpang : {{ formSelectedMobil.kapasitasPenumpang }} orang</p>
                                            <p class="text-left"> Fasilitas : {{ formSelectedMobil.fasilitas }}</p>
                                            <p class="text-left"> Harga Sewa /hari : Rp {{ formSelectedMobil.hargaSewaMobil }},00 </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                            <v-card v-if="isDriver == 'Pakai'" width="100%" height="auto">
                                <v-container>
                                    <h3 class="text-left ml-5">Pilihan driver anda</h3>
                                    <v-row>
                                        <v-col sm="12" md="12" lg="4" xl="4">
                                            <v-img :src="$baseUrl+'/storage/'+formSelectedDriver.fotoDriver" max-height="700" max-width="1000"></v-img>
                                        </v-col>
                                        <v-col sm="12" md="12" lg="8" xl="8">
                                            <p class="text-left"> Nama Driver : {{ formSelectedDriver.namaDriver }}</p>
                                            <p class="text-left"> Jenis Kelamin : {{ formSelectedDriver.jenisKelaminDriver }}</p>
                                            <p class="text-left"> No. Telepon : {{ formSelectedDriver.noTelpDriver }}</p>
                                            <p class="text-left"> Harga Sewa /hari : Rp {{ formSelectedDriver.hargaSewaDriver }},00 </p>
                                            <p class="text-left"> Ratings : 
                                                <v-rating readonly :v-model="formSelectedDriver.rerataRating" background-color="yellow darken-2" color="yellow"></v-rating>
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-card>
                    </v-container>
                    </v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-4"
                            class="white--text"
                            @click="submitHandler"
                        >
                            Konfirmasi
                        </v-btn>
                        <v-btn @click="e6 = 3" text>
                            Back
                        </v-btn>
                    </v-card-actions>
                    </v-stepper-content>
                </v-stepper>
            </template>
            </v-card>
            <br><br>
        </v-container>

        <v-dialog width="700" v-model="dialogPembayaran">
            <v-card height="auto" width="700" max-height="auto" max-width="auto">
                <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">Preview Total Pembayaran</span>
                </v-toolbar>
                    <v-col sm="12" md="12" lg="8" xl="8">
                        <p class="text-left"> Total Hari Meminjam : {{ day }} hari</p>
                        <p class="text-left"> Total Biaya Driver : Rp {{ biayaDriver }},00</p>
                        <p class="text-left"> Total Biaya Mobil : Rp {{ biayaMobil }},00</p>
                        <p class="text-left"> Total Biaya Sebelum Diskon : Rp {{ biayaKotor }},00</p>
                        <p class="text-left"> Diskon : {{ besarPromo * 100 }}%</p>
                        <p class="text-left"> Total Diskon : Rp {{ totalPromo }},00</p>
                        <p class="text-left"> Total Biaya Akhir : Rp {{ biayaBersih }},00</p>
                    </v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-4"
                            class="white--text"
                            @click="confirmHandler"
                        >
                            Submit
                        </v-btn>
                        <v-btn @click="cancel()" outlined color="red" text>
                            Cancel
                        </v-btn>
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
            e6: 1,
            menu: null,
            menu2: null,
            dialogPembayaran: false,
            success_message: false,
            error_message: false,
            color: false,
            snackbar: false,
            snackbar2: false,
            load: false,
            promos: [],
            promosAvailable: [],
            mobilsAvailable: [],
            driversAvailable: [],
            pembayaran: {},
            selectedPromo: null,
            namaPromo: null,
            besarPromo: null,
            selectedMobil: null,
            selectedDriver: null,
            keyMobil : null,
            keyDriver : null,
            isDriver : null,
            date : null,
            warning: null,
            formTransaksi:{
                tanggalWaktuSewa: null,
                tanggalWaktuSelesai: null,
            },
            formPembayaran:{
                promo: null,
                metodePembayaran: null,
            },
            formSelectedMobil:{
                namaMobil: null,
                gambarMobil : null,
                tipeMobil : null,
                jenisTransmisi : null,
                jenisBahanBakar : null,
                kapasitasPenumpang : null,
                fasilitas : null,
                hargaSewaMobil : null,
            },
            formSelectedDriver:{
                namaDriver : null,
                jenisKelaminDriver : null,
                noTelpDriver: null,
                hargaSewaDriver : null,
                rerataRating : null,
                fotoDriver: null
            },
            allForm:{
                tanggalWaktuSewa: null,
                tanggalWaktuSelesai: null,
                hargaSewaMobil : null,
                hargaSewaDriver : null,
                idMobil : null,
                idDriver : null,
                idPromo : null,
                besarPromo : null,
            },
            biayaDriver : null,
            biayaMobil : null,
            biayaKotor : null,
            totalPromo : null,
            biayaBersih : null,
            day : null,
            allPembayaranForm : {
                idMobil : null,
                idDriver : null,
                idPromo : null,
                metodePembayaran : null,
                totalBiayaDriver : null,
                totalBiayaMobil : null,
                totalPromo : null,
                totalBiaya : null,
                dendaPeminjaman : 0,
                statusPembayaran : 0,
            },
            allTransaksiForm : {
                idPegawai : null,
                idCustomer : localStorage.getItem('id'),
                idPembayaran : null,
                idDriver : null,
                tanggalWaktuSewa : null,
                tanggalWaktuSelesai : null,
                tanggalWaktuKembali : null,
            },
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        }
    },
    methods: {
        deleteDriver(){
            this.selectedDriver = null;
        },
        cekInputan(){
            if(this.formTransaksi.tanggalWaktuSewa != null && this.formTransaksi.tanggalWaktuSelesai != null && this.formPembayaran.promo != null){
                this.warning = false;
                return true;
            }
            this.warning = true;
            return false;

        },
        cekSIM(){
            if(localStorage.getItem('SIM') != 'null'){
                return true;
            }else if(localStorage.getItem('SIM') == 'null'){
                return false;
            }
            return false;
        },
        cekSIM2(){
            if(localStorage.getItem('SIM') != "null" && this.isDriver == 'Pakai'){
                return true;
            }else if(localStorage.getItem('SIM') != "null" && this.isDriver == 'Tidak Pakai'){
                return false;
            }else if(localStorage.getItem('SIM') == "null"){
                return true;
            }
            return false;
        },
        cekSIM3(){
            if(localStorage.getItem('SIM') != "null" && this.isDriver == 'Pakai'){
                return false;
            }else if(localStorage.getItem('SIM') == "null"){
                return true;
            }
        },
        async checkPromo(){
            var url = this.$api + '/cekTanggalSewa/transaksi';
            await this.$http.post(url, this.formTransaksi,{
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.success_message = response.data.message;
                this.e6 = 2;
                if(this.formPembayaran.promo == 'None'){
                    this.namaPromo = 'Tidak Pakai'
                    this.besarPromo = '0' 
                }else{
                    for(let i=0 ; i<this.promosAvailable.length ; i++){
                        if(this.promosAvailable[i].idPromo == this.formPembayaran.promo){
                            this.namaPromo = this.promosAvailable[i].jenisPromo 
                            this.besarPromo = this.promosAvailable[i].besarPromo 
                        }
                    }
                }
            }).catch(error => {
                this.e6 = 1;
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });

        },
        checkSelectedMobil(item, key){
            this.selectedMobil = item.idMobil;
            this.keyMobil = key;
            this.formSelectedMobil.namaMobil = item.namaMobil;
            this.formSelectedMobil.gambarMobil = item.gambarMobil;
            this.formSelectedMobil.tipeMobil = item.tipeMobil;
            this.formSelectedMobil.jenisTransmisi = item.jenisTransmisi;
            this.formSelectedMobil.jenisBahanBakar = item.jenisBahanBakar;
            this.formSelectedMobil.kapasitasPenumpang = item.kapasitasPenumpang;
            this.formSelectedMobil.fasilitas = item.fasilitas;
            this.formSelectedMobil.hargaSewaMobil = item.hargaSewaMobil;
        },
        checkSelectedDriver(item, key){
            this.selectedDriver = item.idDriver;
            this.keyDriver = key;
            this.formSelectedDriver.namaDriver = item.namaDriver;
            this.formSelectedDriver.jenisKelaminDriver = item.jenisKelaminDriver;
            this.formSelectedDriver.noTelpDriver = item.noTelpDriver;
            this.formSelectedDriver.hargaSewaDriver = item.hargaSewaDriver;
            this.formSelectedDriver.rerataRating = item.rerataRating;
            this.formSelectedDriver.fotoDriver = item.fotoDriver;
        },
        submitHandler(){
            if(this.isDriver == 'Pakai'){
                this.allForm.idDriver = this.selectedDriver;
            }else if(this.isDriver == 'Tidak Pakai'){
                this.allForm.idDriver = null;
            }
            if(this.formPembayaran.promo == 'None'){
                this.allForm.idPromo = null;
                this.allForm.besarPromo = 0;
            }else if(this.formPembayaran.promo != 'None'){
                this.allForm.idPromo = this.formPembayaran.promo;
                this.allForm.besarPromo = this.besarPromo;
            }
            this.allForm.tanggalWaktuSelesai = this.formTransaksi.tanggalWaktuSelesai
            this.allForm.tanggalWaktuSewa = this.formTransaksi.tanggalWaktuSewa
            this.allForm.hargaSewaMobil = this.formSelectedMobil.hargaSewaMobil
            this.allForm.hargaSewaDriver = this.formSelectedDriver.hargaSewaDriver
            this.allForm.idMobil = this.selectedMobil
            this.hitungBiaya();
        },
        async hitungBiaya(){
            var url = this.$api + '/hitungBiaya/pembayaran';
            await this.$http.post(url, this.allForm, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.biayaDriver = response.data.biayaDriver;
                this.biayaMobil = response.data.biayaMobil;
                this.biayaKotor = response.data.biayaKotor;
                this.totalPromo = response.data.totalPromo;
                this.biayaBersih = response.data.biayaBersih;
                this.day = response.data.day;
                this.dialogPembayaran = true;
            })
        },
        async confirmHandler(){
            if(this.isDriver == 'Pakai'){
                this.allPembayaranForm.idDriver = this.selectedDriver;
            }else if(this.isDriver == 'Tidak Pakai'){
                this.allPembayaranForm.idDriver = null;
            }
            if(this.formPembayaran.promo == 'None'){
                this.allPembayaranForm.idPromo = null;
            }else if(this.formPembayaran.promo != 'None'){
                this.allPembayaranForm.idPromo = this.formPembayaran.promo;
            }
            this.allPembayaranForm.totalBiayaDriver = this.biayaDriver
            this.allPembayaranForm.totalBiayaMobil = this.biayaMobil
            this.allPembayaranForm.totalPromo = this.totalPromo
            this.allPembayaranForm.totalBiaya = this.biayaBersih
            this.allPembayaranForm.metodePembayaran = this.formPembayaran.metodePembayaran
            this.allPembayaranForm.idMobil = this.selectedMobil
            await this.buatPembayaran();
        },
        async buatPembayaran(){
            var url = this.$api + '/create/pembayaran';
            await this.$http.post(url, this.allPembayaranForm, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.success_message = response.data.message;
                this.pembayaran = response.data.data;
                this.allTransaksiForm.idPembayaran = response.data.data.idPembayaran;
                this.transaksiHandler();
            })
        },
        async transaksiHandler(){
            this.allTransaksiForm.idPegawai = null;
            this.allTransaksiForm.idDriver = this.allPembayaranForm.idDriver;
            this.allTransaksiForm.tanggalWaktuSewa = this.formTransaksi.tanggalWaktuSewa;
            this.allTransaksiForm.tanggalWaktuSelesai = this.formTransaksi.tanggalWaktuSelesai;
            this.allTransaksiForm.tanggalWaktuKembali = null;
            await this.buatTransaksi();
        },
        async buatTransaksi(){
            var url = this.$api + '/create/transaksi';
            await this.$http.post(url, this.allTransaksiForm, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.success_message = response.data.message;
                this.snackbar2 = true;
                this.color = 'green';
                this.$router.push({ name: "Beranda",})
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
            });
        },
        async getAllPromo(){
            var url = this.$api + '/promo';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.promos = response.data.data;
                this.checkPromoAvailable();
            })
        },
        checkPromoAvailable(){
            for(let i=0; i<this.promos.length; i++){
                if(this.promos[i].kode == 'WKN'){
                    if(this.todayDay == 'Saturday' || this.todayDay == 'Sunday'){
                        this.promosAvailable.push(this.promos[i]);
                    }
                }
                if(this.promos[i].kode == 'MHS'){
                    if(localStorage.getItem('KP') != null){
                        this.promosAvailable.push(this.promos[i]);
                    }
                }
                if(this.promos[i].kode == 'BDAY'){
                    if(localStorage.getItem('tanggalLahir') == this.todayDate){
                        this.promosAvailable.push(this.promos[i]);
                    }
                }
                if(this.promos[i].kode == 'MDK'){
                    this.promosAvailable.push(this.promos[i]);
                }
            }
            if(this.promosAvailable == null){
                this.promosAvailable = null;
            }else{
                this.promosAvailable.push('None');
            }
        },
        async getMobilAvailable(){
            var url = this.$api + '/getAvailableMobil';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mobilsAvailable = response.data.data;
            })
        },
        async getDriverAvailable(){
            var url = this.$api + '/getAvailableDriver';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.driversAvailable = response.data.data;
            })
        },
        cancel(){
            this.dialogPembayaran = false;
        },
    },

    async mounted(){
        await this.getAllPromo();
        await this.getMobilAvailable();
        await this.getDriverAvailable();
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