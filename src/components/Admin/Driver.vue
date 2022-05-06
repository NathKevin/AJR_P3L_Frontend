<template>
    <v-main class="list">

        <div class="bg">
        <h1>Driver</h1>
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
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
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
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn class="mr-2" small @click="detailHandler(item)" 
                    flat icon color="black"> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
                </template>
            </v-data-table>
        </v-card>

        </div>

        <v-dialog v-model="dialog" persistent max-width="800px" >
            <v-card >
                <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">{{ formTitle }} Driver</span>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                            <v-text-field
                                v-model="form.namaDriver"
                                label="Nama Driver"
                                :rules="rules.null"
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.alamatDriver"
                                label="Alamat Driver"
                                :rules="rules.null"
                            >
                            </v-text-field>
                            <div>
                                <div class="mb-6"></div>
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
                                    v-model="form.tanggalLahirDriver"
                                    label="Tanggal Lahir"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="form.tanggalLahirDriver"
                                    :active-picker.sync="activePicker"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1900-01-01"
                                ></v-date-picker>
                                </v-menu>
                            </div>
                            <v-radio-group
                                v-model="form.jenisKelaminDriver"
                                label="Jenis Kelamin"
                                row
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
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                :rules="rules.null"
                                v-if="checkIfUpdate()"
                            >
                            </v-text-field>
                            <strong><p class="text-left" style="font-size: 16px;">Default Password : Tanggal Lahir(YYYY-MM-DD)</p></strong>
                            <v-text-field
                                v-model="form.noTelpDriver"
                                label="No Telepon"
                                :rules="rules.null"
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.bahasa"
                                label="Bahasa Yang Dikuasai"
                                :rules="rules.null"
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="form.hargaSewaDriver"
                                label="Harga Sewa"
                                :rules="rules.null"
                            >
                            </v-text-field>
                            <v-card-text>
                                <p class="text-md-body-1 text-left"> Foto Terakhir :  {{ this.form.fotoDriver }}</p>
                            </v-card-text>
                            <v-form ref="form">
                                <v-file-input
                                    prepend-icon="mdi-camera" 
                                    label="Foto Driver"
                                    id="fotoDriver"
                                    ref="fileGambar"
                                    accept="image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Fotocopy SIM"
                                    id="fotocopySIM"
                                    ref="fileSIM"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                    v-if="checkIfUpdate()"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Bebas NAPZA"
                                    id="bebasNAPZA"
                                    ref="fileNAPZA"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                    v-if="checkIfUpdate()"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Kesehatan Jiwa"
                                    id="kesehatanJiwa"
                                    ref="fileKesehatanJiwa"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                    v-if="checkIfUpdate()"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Kesehatan Jasmani"
                                    id="kesehatanJasmani"
                                    ref="fileKesehatanJasmani"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                    v-if="checkIfUpdate()"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar SKCK"
                                    id="SKCK"
                                    ref="fileSKCK"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                    v-if="checkIfUpdate()"
                                >
                                </v-file-input>
                            </v-form>

                        <v-btn v-if="!checkIfUpdate()" class="primary" @click="fileUpdateHandler"> Update File Berkas</v-btn>
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>

             <v-dialog v-model="dialogFileUpdate" max-width="500">
                <v-card>
                    <v-card-title>
                        <span class="headline">Ubah File Berkas Driver</span>
                    </v-card-title>
                    <v-card-text>
                        <v-conatiner>
                            <v-form ref="form2">
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Fotocopy SIM"
                                    id="fotocopySIM2"
                                    ref="fileSIM"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Bebas NAPZA"
                                    id="bebasNAPZA2"
                                    ref="fileNAPZA"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Kesehatan Jiwa"
                                    id="kesehatanJiwa2"
                                    ref="fileKesehatanJiwa"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar Kesehatan Jasmani"
                                    id="kesehatanJasmani2"
                                    ref="fileKesehatanJasmani"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                                <v-file-input
                                    prepend-icon="mdi-file-image" 
                                    label="File Gambar SKCK"
                                    id="SKCK2"
                                    ref="fileSKCK"
                                    accept="image/image/png, image/jpeg, image/jpg"
                                >
                                </v-file-input>
                            </v-form>
                        </v-conatiner>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel2"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="setForm"> OK </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-dialog>

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

            <br>
            <v-card class="mr-3 ml-3">
                <v-btn block small class="mb-3" plain  elevation="8" outlined color="blue darken-4" @click="editStatusHandler('aktif')">Ubah Status Aktif</v-btn>
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
                    <v-btn small elevation="8" plain outlined class="blue lighten-4 mr-5" color="black" @click="editStatusHandler('berkas')">Ubah Status Verifikasi </v-btn>
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

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="red" flat>
                    <span  class="headline">Warning!</span>
                </v-toolbar>
                <br>
                <v-card-text> <strong>Anda yakin ingin menghapus driver ini?</strong> </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
                </v-card-action>
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
        fileUpdateHandler(){
            this.inputType = 'OK';
            this.dialogFileUpdate = true;
        },
        checkIfUpdate(){
            if(this.inputType === 'Ubah' || this.inputType === 'OK'){
                return false;
            }
            return true;
        },
        setForm(){
            if(this.inputType === 'Ubah'){
                this.update();
            }else if(this.inputType === 'Tambah'){
                this.save();
            }else if(this.inputType === 'Ubah Status Berkas'){
                this.editStatusBerkas();
            }else if(this.inputType === 'Ubah Status Aktif'){
                this.editStatusAktif();
            }else if(this.inputType === 'OK'){
                this.checkBerkas();
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
        //Simpan data mitra
        save(){
            this.driver.append('namaDriver', this.form.namaDriver);
            this.driver.append('alamatDriver', this.form.alamatDriver);
            this.driver.append('tanggalLahirDriver', this.form.tanggalLahirDriver);
            this.driver.append('jenisKelaminDriver', this.form.jenisKelaminDriver);
            this.driver.append('email', this.form.email);
            this.driver.append('password', this.form.tanggalLahirDriver);
            this.driver.append('noTelpDriver', this.form.noTelpDriver);
            this.driver.append('bahasa', this.form.bahasa);
            this.driver.append('hargaSewaDriver', this.form.hargaSewaDriver);

            var fotoDriver = document.getElementById('fotoDriver');
            var fotocopySIM = document.getElementById('fotocopySIM');
            var bebasNAPZA = document.getElementById('bebasNAPZA');
            var kesehatanJiwa = document.getElementById('kesehatanJiwa');
            var kesehatanJasmani = document.getElementById('kesehatanJasmani');
            var SKCK = document.getElementById('SKCK');

            if(fotoDriver.files[0] != null){
                this.driver.append('fotoDriver', fotoDriver.files[0]);
            }else{
                this.driver.append('fotoDriver', 'null');
            }

            if(fotocopySIM.files[0] != null){
                this.driver.append('fotocopySIM', fotocopySIM.files[0]);
            }else{
                this.driver.append('fotocopySIM', 'null');
            }

            if(bebasNAPZA.files[0] != null){
                this.driver.append('bebasNAPZA', bebasNAPZA.files[0]);
            }else{
                this.driver.append('bebasNAPZA', 'null');
            }

            if(kesehatanJiwa.files[0] != null){
                this.driver.append('kesehatanJiwa', kesehatanJiwa.files[0]);
            }else{
                this.driver.append('kesehatanJiwa', 'null');
            }

            if(kesehatanJasmani.files[0] != null){
                this.driver.append('kesehatanJasmani', kesehatanJasmani.files[0]);
            }else{
                this.driver.append('kesehatanJasmani', 'null');
            }

            if(SKCK.files[0] != null){
                this.driver.append('SKCK', SKCK.files[0]);
            }else{
                this.driver.append('SKCK', 'null');
            }

            var url = this.$api + '/create/driver'
            this.load = true;
            this.$http.post(url, this.driver, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = true;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data mitra
        update() {
            var fotoDriver = document.getElementById('fotoDriver');

            if(fotoDriver.files[0]){
                this.driver.append('fotoDriver', fotoDriver.files[0]);
            }
            
            this.driver.append('namaDriver', this.form.namaDriver);
            this.driver.append('alamatDriver', this.form.alamatDriver);
            this.driver.append('tanggalLahirDriver', this.form.tanggalLahirDriver);
            this.driver.append('jenisKelaminDriver', this.form.jenisKelaminDriver);
            this.driver.append('noTelpDriver', this.form.noTelpDriver);
            this.driver.append('bahasa', this.form.bahasa);
            this.driver.append('hargaSewaDriver', this.form.hargaSewaDriver);

            
            var url = this.$api + '/updateByAdmin/driver/' + this.editId;
            this.load = true;
            this.$http.post(url, this.driver, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        checkBerkas(){
            var fotocopySIM = document.getElementById('fotocopySIM2');
            var bebasNAPZA = document.getElementById('bebasNAPZA2');
            var kesehatanJiwa = document.getElementById('kesehatanJiwa2');
            var kesehatanJasmani = document.getElementById('kesehatanJasmani2');
            var SKCK = document.getElementById('SKCK2');
            if(fotocopySIM.files[0]){
                console.log(fotocopySIM.files[0]);
                this.driver.append('fotocopySIM', fotocopySIM.files[0]);
            }

            if(bebasNAPZA.files[0] ){
                this.driver.append('bebasNAPZA', bebasNAPZA.files[0]);
            }

            if(kesehatanJiwa.files[0]){
                this.driver.append('kesehatanJiwa', kesehatanJiwa.files[0]);
            }

            if(kesehatanJasmani.files[0]){
                this.driver.append('kesehatanJasmani', kesehatanJasmani.files[0]);
            }

            if(SKCK.files[0]){
                this.driver.append('SKCK', SKCK.files[0]);
            }

            this.inputType = 'Ubah';
            this.dialogFileUpdate = false;
        },
        //ubah statusberkas
        editStatusBerkas(){
            let newData = {
                statusBerkas : this.detailForm.statusBerkas
            };
            var url = this.$api + '/updateBerkas/driver/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
         //ubah status aktif
        editStatusAktif(){
            let newData = {
                isActive : this.detailForm.isActive
            };
            var url = this.$api + '/updateStatusAktif/driver/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus mitra
        deleteData() {
            var url = this.$api + '/delete/driver/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.resetForm();
                this.inputType = 'Tambah';
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editStatusHandler(string){
            if(string == 'berkas'){
                this.inputType = 'Ubah Status Berkas';
                this.detailForm.statusBerkas = !this.detailForm.statusBerkas;
            }else{
                this.inputType = 'Ubah Status Aktif';
                this.detailForm.isActive = !this.detailForm.isActive;
            }
            this.setForm();
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.idDriver;
            this.form.namaDriver = item.namaDriver;
            this.form.alamatDriver = item.alamatDriver;
            this.form.tanggalLahirDriver = item.tanggalLahirDriver;
            this.form.jenisKelaminDriver = item.jenisKelaminDriver;
            this.form.noTelpDriver = item.noTelpDriver;
            this.form.bahasa = item.bahasa;
            this.form.fotoDriver = item.fotoDriver;
            this.form.hargaSewaDriver = item.hargaSewaDriver;
            this.form.fotocopySIM = item.fotocopySIM;
            this.form.bebasNAPZA = item.bebasNAPZA;
            this.form.kesehatanJiwa = item.kesehatanJiwa;
            this.form.kesehatanJasmani = item.kesehatanJasmani;
            this.form.SKCK = item.SKCK;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
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
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
            this.$refs.form.reset();
            this.$refs.fileGambar.value = null;
        },
        cancel2(){
            this.inputType = 'Ubah';
            this.dialogFileUpdate = false;
            this.$refs.form.reset();
            this.$refs.fileGambar.value = null;
        },
        resetForm() {
            this.form = {
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
            };
            this.$refs.form.reset();
            this.$refs.fileGambar.value = "";
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
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