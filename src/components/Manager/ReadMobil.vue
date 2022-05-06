<template>
    <v-main class="list">

        <div class="bg">
        <h1>Inspek Mobil</h1>
        <br>
        
        <v-card elevation="3" >
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
            </v-card-title>

            <div>
                <v-row>
                    <v-chip-group>
                        <v-chip  @click="readDataTrigger()" class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Show All</v-chip>
                        <v-chip  @click="readDataByContractTrigger()" class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Show Contract</v-chip>
                    </v-chip-group>
                </v-row>
            </div>

            <v-data-table v-if="showDataForAll" :headers="headers" :items="mobils" :search="search" loading="true">
                <template v-slot:[`item.statusKetersediaanMobil`]="{ item }">
                    <span v-if=" item.statusKetersediaanMobil == 1"> <v-chip small label class="green lighten-1" color="white--text">Available</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Unavailable</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="detailHandler(item)" 
                    flat icon color="black"> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
                </template>
            </v-data-table>

            <v-data-table v-if="showDataForContract" :headers="headers2" :items="mobilsContract" :search="search" loading="true">
                <template v-slot:[`item.statusKetersediaanMobil`]="{ item }">
                    <span v-if=" item.statusKetersediaanMobil == 1"> <v-chip small label class="green lighten-1" color="white--text">Available</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Unavailable</v-chip> </span>
                </template>
                <template v-slot:[`item.diff`]="{ item }">
                    <span v-if=" item.diff <= 30 && item.diff > 0"> <v-chip small label class="yellow darken-3" color="white--text">Contract Will End Soon</v-chip></span>
                    <span v-else-if="item.diff <= 0"> <v-chip small label class="red lighten-2" color="white--text">Contract Expired</v-chip> </span>
                    <span v-else> <v-chip small label class="green lighten-1" color="white--text">Contract On Going</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-btn class="mr-2" small @click="detailHandler(item)" 
                    flat icon color="black"> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
                </template>
            </v-data-table>
        </v-card>

        </div>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            right
            bottom
            hide-overlay
            height="800px"
            width="500px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Mobil</v-card-title>
            </v-toolbar>
                <v-divider></v-divider>
            <v-card class="mr-3 ml-3 ">
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama Mobil </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ this.detailForm.namaMobil }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row class="mt-5" dense no-gutters >
                    <v-col sm="4" v-if="checkKontrak()">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama Mitra </v-card-text>
                    </v-col>
                    <v-col sm="1" v-if="checkKontrak()">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5" v-if="checkKontrak()">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ this.namaMitra}}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Tipe Mobil  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ this.detailTipeMobil }}  </v-card-text>
                    </v-col>
                </v-row>
                 <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jenis Transmisi  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ this.detailJenisTransmisi }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jenis Bahan Bakar  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{this. detailJenisBahanBakar }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Volume Bahan Bakar  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.volumeBahanBakar }} liter  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Warna Mobil  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.warnaMobil }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Kapasitas Penumpang  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ this.detailKapasitas }} orang  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Fasilitas  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.fasilitas }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Plat Nomor  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.platNomor }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nomor STNK  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.nomorSTNK }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Kategori Aset  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.kategoriAset }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Harga Sewa  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left">Rp {{ detailForm.hargaSewaMobil }},00  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Tanggal Terakhir Servis  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.tanggalTerakhirServis }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> Periode Kontrak Mulai  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.periodeKontrakMulai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> Periode Kontrak Akhir  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.periodeKontrakAkhir }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> Sisa Kontrak  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text v-if="checkKontrak()" class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.diff }} hari  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Gambar Mobil  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-img v-if="checkIsPhoto()" @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.gambarMobil" max-height="300" max-width="200" class="mb-4"></v-img>
                        <span v-if="checkIsPhoto()" class="text-body-1">Klik gambar untuk zoom</span>
                    </v-col>
                </v-row>
                
            </v-card>
       
        </v-navigation-drawer>

         <v-overlay :value="overlay">
            <v-card>
                <v-img @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.gambarMobil" max-height="900" max-width="700" ></v-img>
                <v-card-text class="text-body-1"> Klik gambar untuk menutup</v-card-text>
            </v-card>
        </v-overlay>

    </v-main>
</template>

<script>
export default{
    name: "List",
    data() {
        return{
            activePicker: null,
            menu: false,
            menu1: false,
            menu2: false,
            overlay: false,
            show: null,
            date: null,
            drawer: false,
            showDataForAll: true,
            showDataForContract: false,
            modelMitra: null,
            mitraType: [],
            statusMobil: null,
            kategoriAset : null,
            tempKategoriAset: null,
            jenisTransmisi: null,
            detailJenisTransmisi: null,
            jenisBahanBakar: null,
            detailJenisBahanBakar: null,
            tipeMobil: null,
            detailTipeMobil: null,
            kapasitasPenumpang: null,
            detailKapasitas: null,
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
            headers2: [
                {
                    text: "Nama Mobil",
                    align: "start",
                    sortable: true,
                    value: "namaMobil",
                },
                { text: "Nama Mitra", value: "namaMitra"},
                { text: "Plat Nomor", value: "platNomor"},
                { text: "Status Ketersediaan", value: "statusKetersediaanMobil" },
                { text: "Status Kontrak", value: "diff" },
                { text: "Actions", value: "actions"},
            ],
            headers: [
                {
                    text: "Nama Mobil",
                    align: "start",
                    sortable: true,
                    value: "namaMobil",
                },
                { text: "Kategori Aset", value: "kategoriAset" },
                { text: "Plat Nomor", value: "platNomor"},
                { text: "Status Ketersediaan", value: "statusKetersediaanMobil" },
                { text: "Actions", value: "actions"},
            ],
            carType: [
                {
                    text: "Sedan",
                    value: 'Sedan'
                },
                {
                    text: "City Car",
                    value: 'City Car'
                },
                {
                    text: "SUV",
                    value: 'SUV'
                },
                {
                    text: "MPV",
                    value: 'MPV'
                }
            ],
            transmissionType: [
                {
                    text: "AT",
                    value: 'AT'
                },
                {
                    text: "MT",
                    value: 'MT'
                },
                {
                    text: "CVT",
                    value: 'CVT'
                },
            ],
            fuelType: [
                {
                    text: "Pertalite",
                    value: 'Pertalite'
                },
                {
                    text: "Pertamax",
                    value: 'Pertamax'
                },
                {
                    text: "Solar",
                    value: 'Solar'
                },
            ],
            capacity: [
                {text: "1",value: '1'},
                {text: "2",value: '2'},
                {text: "3",value: '3'},
                {text: "4",value: '4'},
                {text: "5",value: '5'},
                {text: "6",value: '6'},
                {text: "7",value: '7'},
                {text: "8",value: '8'},
            ],
            showType:[
                {text:"All", value:'All'},
                {text:"Kontrak", value:'Kontrak'},
            ],
            mobil: new FormData,
            mobils: [],
            mobilsContract: [],
            namaMitra: null,
            form: {
                idMitra: null,
                namaMobil: null,
                tipeMobil : null,
                jenisTransmisi: null,
                jenisBahanBakar: null,
                volumeBahanBakar: null,
                warnaMobil: null,
                kapasitasPenumpang: null,
                fasilitas: null,
                platNomor: null,
                nomorSTNK: null,
                kategoriAset: null,
                hargaSewaMobil: null,
                statusKetersediaanMobil: null,
                tanggalTerakhirServis: null,
                gambarMobil: null,
                periodeKontrakMulai: null,
                periodeKontrakAkhir: null,
            },
            detailForm:{
                idMitra: null,
                namaMobil: null,
                tipeMobil : null,
                jenisTransmisi: null,
                jenisBahanBakar: null,
                volumeBahanBakar: null,
                warnaMobil: null,
                kapasitasPenumpang: null,
                fasilitas: null,
                platNomor: null,
                nomorSTNK: null,
                kategoriAset: null,
                hargaSewaMobil: null,
                statusKetersediaanMobil: null,
                tanggalTerakhirServis: null,
                gambarMobil: null,
                periodeKontrakMulai: null,
                periodeKontrakAkhir: null,
                diff: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val || 'This field is required'],
            },
        }
    },

    methods: {
        checkIsPhoto(){
            if(this.detailForm.gambarMobil == null ){
                return false;
            }else{
                return true;
            }
        },
        readDataTrigger(){
            this.readData();
            this.showDataForAll = true;
            this.showDataForContract = false;
        },
        readDataByContractTrigger(){
            this.readDataByContract();
            this.showDataForAll = false;
            this.showDataForContract = true;
        },
        callMitra($idMitra){
            this.namaMitra = this.showOneMitra($idMitra);
        },
        checkKontrak(){
            if(this.namaMitra == null){
                return false;
            }
            return true;
        },
        //Read Data mitra
        readData(){
            var url = this.$api + '/mobil';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mobils = response.data.data;
            })
        },
        readDataByContract(){
            var url = this.$api + '/show/contract/mobil';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mobilsContract = response.data.data;
            })
        },
        readAllMitra(){
            var url = this.$api + '/showAll/mitra';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mitraType = response.data.data;
            })
        },
        //read Mitra
        showOneMitra($idMitra){
            var url = this.$api + '/show/mitra/' + $idMitra;
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.namaMitra = response.data.data.namaMitra;
            })
        },
        detailHandler(item){
            this.editId = item.idMobil;
            this.detailForm.idMitra = item.idMitra;
            this.detailForm.namaMobil = item.namaMobil;
            this.detailForm.tipeMobil = item.tipeMobil;
            this.detailTipeMobil = item.tipeMobil;
            this.detailForm.jenisTransmisi = item.jenisTransmisi;
            this.detailJenisTransmisi = item.jenisTransmisi;
            this.detailForm.jenisBahanBakar = item.jenisBahanBakar;
            this.detailJenisBahanBakar = item.jenisBahanBakar;
            this.detailForm.volumeBahanBakar = item.volumeBahanBakar;
            this.detailForm.warnaMobil = item.warnaMobil;
            this.detailForm.kapasitasPenumpang = item.kapasitasPenumpang;
            this.detailKapasitas = item.kapasitasPenumpang;
            this.detailForm.fasilitas = item.fasilitas;
            this.detailForm.platNomor = item.platNomor;
            this.detailForm.nomorSTNK = item.nomorSTNK;
            this.detailForm.kategoriAset = item.kategoriAset;
            this.detailForm.hargaSewaMobil = item.hargaSewaMobil;
            this.detailForm.statusKetersediaanMobil = item.statusKetersediaanMobil;
            this.detailForm.tanggalTerakhirServis = item.tanggalTerakhirServis;
            this.detailForm.gambarMobil = item.gambarMobil;
            this.detailForm.periodeKontrakMulai = item.periodeKontrakMulai;
            this.detailForm.periodeKontrakAkhir = item.periodeKontrakAkhir;
            this.detailForm.diff = item.diff;
            this.callMitra(item.idMitra);
            this.drawer = !this.drawer;
        },
    },

    mounted() {
        this.readData();
        this.readAllMitra();
    }

    
}
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

</style>