<template>
    <v-main class="list">

        <div class="bg">
        <h1>Inspek Driver</h1>
        <br>

        <v-card elevation="3">
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

             <v-data-table :headers="headers" :items="drivers" :search="search" loading="true">
                  <template v-slot:[`item.fotoDriver`]="{ item }">
                    <v-avatar>
                        <v-img :src="$baseUrl+'/storage/'+item.fotoDriver" >
                            <template v-slot:placeholder>
                                <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                                >
                                <v-progress-circular
                                    indeterminate
                                    size="25"
                                    color="blue darken-2"
                                ></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>
                    </v-avatar>
                </template>
                 <template v-slot:[`item.statusBerkas`]="{ item }">
                    <span v-if=" item.statusBerkas == 1"> <v-chip small label class="green lighten-1" color="white--text">Verified</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Unverified</v-chip> </span>
                </template>
                 <template v-slot:[`item.isActive`]="{ item }">
                    <span v-if=" item.isActive == 1"> <v-chip small label class="green lighten-1" color="white--text">Active</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Non-active</v-chip> </span>
                </template>
                <template v-slot:[`item.statusKetersediaanDriver`]="{ item }">
                    <span v-if=" item.statusKetersediaanDriver == 1"> <v-chip small label class="green lighten-1" color="white--text">Available</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-3" color="white--text">Unavailable</v-chip> </span>
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
            height="820px"
            width="450px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Driver</v-card-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card class="mr-3 ml-3 " elevation="5">
                
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2">  Nama  </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.namaDriver }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Alamat   </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.alamatDriver }}  </v-card-text>
                    </v-col>
                </v-row>
                 <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Tanggal Lahir  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.tanggalLahirDriver }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jenis Kelamin  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.jenisKelaminDriver}}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Email  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.email }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> No.Telepon  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noTelpDriver }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Bahasa Yang Dikuasai  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.bahasa }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> Rp {{ detailForm.hargaSewaDriver }},00  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Foto Driver  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-img v-if="checkIsPhoto()" @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoDriver" height="150" width="150" class="mb-4"></v-img>
                        <span class="text-body-1">Klik gambar untuk zoom</span>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4"></v-col>
                    <v-col sm="4"></v-col>
                    <v-col sm="3">
                        <v-btn small block class="mt-5 mb-5"  elevation="8" outlined color="blue darken-4" @click="dialogBerkas = !dialogBerkas">File berkas</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-navigation-drawer>

        <v-overlay :value="overlay">
            <v-card>
                <v-img @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoDriver" max-height="1000" max-width="1000" ></v-img>
                <v-card-text class="text-body-1"> Klik gambar untuk menutup</v-card-text>
            </v-card>
        </v-overlay>

        <v-dialog v-model="dialogBerkas" fullscreen >
            <v-card>
                <v-app-bar color="white--text" class="blue darken-4" fixed >
                    <span  class="headline">File Berkas</span>
                    <v-spacer/>
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dialogBerkas = !dialogBerkas" router v-bind="attrs" v-on="on" icon fab> 
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Exit</span>
                    </v-tooltip>
                </v-app-bar>
                <br><br><br>
                <v-card-content>
                    <v-row dense no-gutters>
                        <v-col sm="6" >
                            <v-card-text style="font-size: 20px;" class="text-left">File Fotocopy SIM </v-card-text>
                            <v-flex>
                                <v-img class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.fotocopySIM" max-height="1280" max-width="720" ></v-img>
                            </v-flex>
                        </v-col>
                        <v-col sm="6" >
                            <v-card-text style="font-size: 20px;" class="text-left">File Surat Bebas NAPZA </v-card-text>
                            <v-flex>
                                <v-img class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.bebasNAPZA" max-height="1280" max-width="720" ></v-img>
                            </v-flex>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-row dense no-gutters>
                        <v-col sm="6" >
                            <v-card-text style="font-size: 20px;" class="text-left">File Surat Kesehatan Jiwa </v-card-text>
                            <v-flex>
                                <v-img class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.kesehatanJiwa" max-height="1280" max-width="720" ></v-img>
                            </v-flex>
                        </v-col>
                        <v-col sm="6" >
                            <v-card-text style="font-size: 20px;" class="text-left">File Surat Kesehatan Jasmani </v-card-text>
                            <v-flex>
                                <v-img class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.kesehatanJasmani" max-height="1280" max-width="720" ></v-img>
                            </v-flex>
                        </v-col>
                    </v-row>
                     <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-row dense no-gutters>
                        <v-card-text style="font-size: 20px;" class="text-left">File Surat Keterangan Catatan Polisi </v-card-text>
                        <v-flex>
                            <v-img class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.SKCK" max-height="1280" max-width="720" ></v-img>
                        </v-flex>
                    </v-row>
                </v-card-content>
                    
            </v-card>
        </v-dialog>

    </v-main>
</template>

<script>
export default{
    name: "List",
    data() {
        return{
            activePicker: null,
            menu: false,
            show: null,
            valid: false,
            date: null,
            drawer: false,
            inputType: 'Tambah',
            load: false,
            overlay: false,
            snackbar: false,
            snackbar2: false,
            error_message: '',
            success_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogBerkas: false,
            dialogFileUpdate: false,
            dialogConfirm: false,
            headers: [
                {
                    text: "Foto Profil",
                    align: "start",
                    sortable: true,
                    value: "fotoDriver",
                },
                { text: "Nama Driver", value: "namaDriver" },
                { text: "Alamat Driver", value: "alamatDriver" },
                { text: "No. Telepon", value: "noTelpDriver"},
                { text: "Status Ketersediaan", value: "statusKetersediaanDriver" },
                { text: "Status Keaktifan", value: "isActive" },
                { text: "Status Verifikasi Berkas", value: "statusBerkas" },
                { text: "Actions", value: "actions"},
            ],
            driver: new FormData,
            drivers: [],
            form: {
                namaDriver: null,
                alamatDriver: null,
                tanggalLahirDriver: null,
                jenisKelaminDriver: null,
                email: null,
                noTelpDriver: null,
                bahasa: null,
                statusKetersediaanDriver: null,
                hargaSewaDriver: null,
                rerataRating: null,
                fotoDriver: null,
                fotocopySIM: null,
                bebasNAPZA: null,
                kesehatanJiwa: null,
                kesehatanJasmani: null,
                SKCK: null,
                isActive: null,
                statusBerkas: null,
            },
            detailForm:{
                namaDriver: null,
                alamatDriver: null,
                tanggalLahirDriver: null,
                jenisKelaminDriver: null,
                email: null,
                noTelpDriver: null,
                bahasa: null,
                statusKetersediaanDriver: null,
                hargaSewaDriver: null,
                rerataRating: null,
                fotoDriver: null,
                fotocopySIM: null,
                bebasNAPZA: null,
                kesehatanJiwa: null,
                kesehatanJasmani: null,
                SKCK: null,
                isActive: null,
                statusBerkas: null,
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
            if(this.detailForm.fotoDriver == null ){
                return false;
            }else{
                return true;
            }
        },
        //Read Data mitra
        readData(){
            var url = this.$api + '/driver';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.drivers = response.data.data;
            })
        },
        detailHandler(item){
            this.editId = item.idDriver;
            this.detailForm.namaDriver = item.namaDriver;
            this.detailForm.alamatDriver = item.alamatDriver;
            this.detailForm.tanggalLahirDriver = item.tanggalLahirDriver;
            this.detailForm.jenisKelaminDriver = item.jenisKelaminDriver;
            this.detailForm.noTelpDriver = item.noTelpDriver;
            this.detailForm.email = item.email;
            this.detailForm.bahasa = item.bahasa;
            this.detailForm.fotoDriver = item.fotoDriver;
            this.detailForm.hargaSewaDriver = item.hargaSewaDriver;
            this.detailForm.fotocopySIM = item.fotocopySIM;
            this.detailForm.bebasNAPZA = item.bebasNAPZA;
            this.detailForm.kesehatanJiwa = item.kesehatanJiwa;
            this.detailForm.kesehatanJasmani = item.kesehatanJasmani;
            this.detailForm.SKCK = item.SKCK;
            this.detailForm.statusBerkas = item.statusBerkas
            this.detailForm.isActive = item.isActive
            this.drawer = !this.drawer;
        },
    },

    mounted() {
        this.readData();
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