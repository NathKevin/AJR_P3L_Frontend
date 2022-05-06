<template>
    <v-main class="list">

        <div class="bg">
        <h1>Mobil</h1>
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
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
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
                    <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
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

        <v-dialog v-model="dialog" persistent max-width="800px" >
            <v-card>
                <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">{{ formTitle }} Mobil</span>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="form.namaMobil"
                            label="Nama Mobil"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-radio-group
                            v-model="kategoriAset"
                            label="Kategori Aset"
                            row
                            :rules="rules.null"
                            >
                            <v-radio
                                label="Perusahaan"
                                value="Perusahaan"
                            ></v-radio>
                            <v-radio
                                label="Sewa"
                                value="Sewa"
                            ></v-radio>
                        </v-radio-group>
                        <v-select
                            v-if="checkKategoriAset()"
                            v-model="modelMitra"
                            item-text="namaMitra"
                            item-value="idMitra"
                            :items="mitraType"
                            label="Nama Mitra"
                            :rules="rules.null"
                            clearable
                        >
                        </v-select>
                        <div>
                            <div class="mb-6"></div>
                            <v-menu
                            v-if="checkKategoriAset()"
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="form.periodeKontrakMulai"
                                label="Tanggal Mulai Kontak"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.periodeKontrakMulai"
                                :active-picker.sync="activePicker"
                                min="1900-01-01"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <div>
                            <div class="mb-6"></div>
                            <v-menu
                            v-if="checkKategoriAset()"
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="form.periodeKontrakAkhir"
                                label="Tanggal Selesai Kontak"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.periodeKontrakAkhir"
                                :active-picker.sync="activePicker"
                                min="1900-01-01"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-row dense>
                            <v-col>
                                <v-select
                                    v-model="tipeMobil"
                                    :items="carType"
                                    label="Tipe Mobil"
                                    :rules="rules.null"
                                    clearable
                                >
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                    v-model="jenisTransmisi"
                                    :items="transmissionType"
                                    label="Jenis Transmisi"
                                    :rules="rules.null"
                                    clearable
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row dense >
                            <v-col >
                                <v-select
                                    v-model="jenisBahanBakar"
                                    :items="fuelType"
                                    label="Jenis Bahan Bakar"
                                    :rules="rules.null"
                                    clearable
                                >
                                </v-select>
                            </v-col>
                            <v-col>
                                 <v-select
                                    v-model="kapasitasPenumpang"
                                    :items="capacity"
                                    label="Kapasitas Penumpang"
                                    :rules="rules.null"
                                    clearable
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <v-text-field
                                    v-model="form.volumeBahanBakar"
                                    label="Volume Bahan Bakar"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="form.warnaMobil"
                                    label="Warna Mobil"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col>
                                <v-text-field
                                    v-model="form.platNomor"
                                    label="Plat Nomor"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="form.nomorSTNK"
                                    label="Nomor STNK"
                                    :rules="rules.null"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                            v-model="form.hargaSewaMobil"
                            label="Harga Sewa"
                            :rules="rules.null"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="form.fasilitas"
                            label="Fasilitas"
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
                                v-model="form.tanggalTerakhirServis"
                                label="Tanggal Terakhir Servis"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="form.tanggalTerakhirServis"
                                :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1900-01-01"
                            ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-form ref="formGambarMobil">
                            <v-file-input
                                prepend-icon="mdi-camera" 
                                label="Foto Mobil"
                                id="gambarMobil"
                                ref="fileGambar"
                            >
                            </v-file-input>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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

            <br>
            <v-card class="mr-3 ml-3">
                <v-btn block elevation="8" class="mb-3 " outlined plain color="blue darken-4" @click="editStatusHandler">Ubah Status Ketersediaan</v-btn>
            </v-card>
       
        </v-navigation-drawer>

         <v-overlay :value="overlay">
            <v-card>
                <v-img @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.gambarMobil" max-height="900" max-width="700" ></v-img>
                <v-card-text class="text-body-1"> Klik gambar untuk menutup</v-card-text>
            </v-card>
        </v-overlay>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-toolbar color="white--text" class="red" flat>
                    <span  class="headline">Warning!</span>
                </v-toolbar>
                <br>
                <v-card-text> <strong>Anda yakin ingin menghapus mobil ini?</strong> </v-card-text>
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
        ifUpdateMitraToPerusahaan(){
            if(this.kategoriAset == 'Perusahaan' && this.tempKategoriAset == 'Sewa'){
                this.form.periodeKontrakMulai = '1900-01-01'; //ini tanggal sudha lewat, di backend di set NULL
                this.form.periodeKontrakAkhir = '1900-01-01'; //ini hanya untuk ngecek, karena NULL disini tidak bisa karena  validate after_or_equal
                this.modelMitra = 'null';
            }
        },
        checkKategoriAset(){
            if(this.kategoriAset == 'Sewa'){
                this.form.kategoriAset = 'Sewa';
                return true;
            }else if(this.kategoriAset == 'Perusahaan'){
                this.form.kategoriAset = 'Perusahaan';
                return false;
            }
            this.form.kategoriAset = null;
            return false;
        },
        checkTransmisi(){
            if(this.jenisTransmisi == 'AT'){
                this.form.jenisTransmisi = 'AT';
            }else if(this.jenisTransmisi == 'CVT'){
                this.form.jenisTransmisi = 'CVT';
            }else if(this.jenisTransmisi == 'MT'){
                this.form.jenisTransmisi = 'MT';
            }
        },
        checkTipe(){
            if(this.tipeMobil == 'Sedan'){
                this.form.tipeMobil = 'Sedan';
            }else if(this.tipeMobil == 'City Car'){
                this.form.tipeMobil = 'City Car';
            }else if(this.tipeMobil == 'SUV'){
                this.form.tipeMobil = 'SUV';
            }else if(this.tipeMobil == 'MPV'){
                this.form.tipeMobil = 'MPV';
            }
        },
        checkBahanBakar(){
            if(this.jenisBahanBakar == 'Pertalite'){
                this.form.jenisBahanBakar = 'Pertalite';
            }else if(this.jenisBahanBakar == 'Pertamax'){
                this.form.jenisBahanBakar = 'Pertamax';
            }else if(this.jenisBahanBakar == 'Solar'){
                this.form.jenisBahanBakar = 'Solar';
            }
        },
        checkKapasitas(){
            if(this.kapasitasPenumpang == '1'){this.form.kapasitasPenumpang = '1';}
            if(this.kapasitasPenumpang == '2'){this.form.kapasitasPenumpang = '2';}
            if(this.kapasitasPenumpang == '3'){this.form.kapasitasPenumpang = '3';}
            if(this.kapasitasPenumpang == '4'){this.form.kapasitasPenumpang = '4';}
            if(this.kapasitasPenumpang == '5'){this.form.kapasitasPenumpang = '5';}
            if(this.kapasitasPenumpang == '6'){this.form.kapasitasPenumpang = '6';}
            if(this.kapasitasPenumpang == '7'){this.form.kapasitasPenumpang = '7';}
            if(this.kapasitasPenumpang == '8'){this.form.kapasitasPenumpang = '8';}
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
        setForm(){
            this.form.idMitra = this.modelMitra;
            this.checkTransmisi();
            this.checkTipe();
            this.checkBahanBakar();
            this.checkKapasitas();
            if(this.inputType === 'Ubah'){
                this.update();
            }else if(this.inputType === 'Tambah'){
                this.save();
            }else if(this.inputType === 'Ubah Status'){
                this.editStatus();
            }else if(this.inputType === 'Ubah Keaktifan'){
                this.editKeaktifan();
            }
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
        required(value) {
            if (value.length == 0) {
                return 'Required.';
            }
            return !!value || 'Required.';
        },
        //Simpan data mitra
        save(){
            this.form.idMitra = this.modelMitra;

            this.mobil.append('idMitra', this.form.idMitra);
            this.mobil.append('namaMobil', this.form.namaMobil);
            this.mobil.append('tipeMobil', this.form.tipeMobil);
            this.mobil.append('jenisTransmisi', this.form.jenisTransmisi);
            this.mobil.append('jenisBahanBakar', this.form.jenisBahanBakar);
            this.mobil.append('volumeBahanBakar', this.form.volumeBahanBakar);
            this.mobil.append('warnaMobil', this.form.warnaMobil);
            this.mobil.append('kapasitasPenumpang', this.form.kapasitasPenumpang);
            this.mobil.append('fasilitas', this.form.fasilitas);
            this.mobil.append('platNomor', this.form.platNomor);
            this.mobil.append('nomorSTNK', this.form.nomorSTNK);
            this.mobil.append('kategoriAset', this.form.kategoriAset);
            this.mobil.append('hargaSewaMobil', this.form.hargaSewaMobil);
            this.mobil.append('statusKetersediaanMobil', this.form.statusKetersediaanMobil);
            this.mobil.append('tanggalTerakhirServis', this.form.tanggalTerakhirServis);
            this.mobil.append('periodeKontrakMulai', this.form.periodeKontrakMulai);
            this.mobil.append('periodeKontrakAkhir', this.form.periodeKontrakAkhir);

            var gambarMobil = document.getElementById('gambarMobil');

            if(gambarMobil.files[0] != null){
                this.mobil.append('gambarMobil', gambarMobil.files[0]);
            }else{
                this.mobil.append('gambarMobil', 'null');
            }

            var url = this.$api + '/create/mobil'
            this.load = true;
            this.$http.post(url, this.mobil, {
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
            this.ifUpdateMitraToPerusahaan();

            var gambarMobil = document.getElementById('gambarMobil');

             if(gambarMobil.files[0]){
                 this.mobil.append('gambarMobil', gambarMobil.files[0]);
             }

            this.form.idMitra = this.modelMitra;
            this.mobil.append('idMitra', this.form.idMitra);
            this.mobil.append('namaMobil', this.form.namaMobil);
            this.mobil.append('tipeMobil', this.form.tipeMobil);
            this.mobil.append('jenisTransmisi', this.form.jenisTransmisi);
            this.mobil.append('jenisBahanBakar', this.form.jenisBahanBakar);
            this.mobil.append('volumeBahanBakar', this.form.volumeBahanBakar);
            this.mobil.append('warnaMobil', this.form.warnaMobil);
            this.mobil.append('kapasitasPenumpang', this.form.kapasitasPenumpang);
            this.mobil.append('fasilitas', this.form.fasilitas);
            this.mobil.append('platNomor', this.form.platNomor);
            this.mobil.append('nomorSTNK', this.form.nomorSTNK);
            this.mobil.append('kategoriAset', this.form.kategoriAset);
            this.mobil.append('hargaSewaMobil', this.form.hargaSewaMobil);
            this.mobil.append('statusKetersediaanMobil', this.form.statusKetersediaanMobil);
            this.mobil.append('tanggalTerakhirServis', this.form.tanggalTerakhirServis);
            this.mobil.append('periodeKontrakMulai', this.form.periodeKontrakMulai);
            this.mobil.append('periodeKontrakAkhir', this.form.periodeKontrakAkhir);

            var url = this.$api + '/update/mobil/' + this.editId;
            this.load = true;
            this.$http.post(url, this.mobil, {
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
        //ubah status
        editStatus(){
            let newData = {
                statusKetersediaanMobil : this.detailForm.statusKetersediaanMobil
            };
            var url = this.$api + '/updateStatus/mobil/' + this.editId;
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
                this.readDataByContract(); //Baca data 
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //ubah status
        editKeaktifan(){
            if(this.statusMobil === 0){
                this.success_message = 'Mobil sedang dalam pemakaian';
                this.color = "yellow darken-4";
                this.snackbar2 = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.readDataByContract(); //Baca data
                return; 
            }

            let newData = {
                statusKetersediaanMobil : this.detailForm.statusKetersediaanMobil
            };
            var url = this.$api + '/updateStatus/mobil/' + this.editId;
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
                this.readDataByContract(); //Baca data 
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
            var url = this.$api + '/delete/mobil/' + this.deleteId;
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
        editStatusHandler(){
            this.inputType = 'Ubah Status';
            this.detailForm.statusKetersediaanMobil = !this.detailForm.statusKetersediaanMobil;
            this.setForm();
        },
        editKeaktifanHandler(){
            this.inputType = 'Ubah Keaktifan';
            this.statusMobil = this.detailForm.statusKetersediaanMobil;
            this.detailForm.statusKetersediaanMobil = !this.detailForm.statusKetersediaanMobil;
            this.setForm();
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.modelMitra = item.idMitra;
            this.editId = item.idMobil;
            this.form.idMitra = item.idMitra;
            this.form.namaMobil = item.namaMobil;
            this.form.tipeMobil = item.tipeMobil;
            this.tipeMobil = item.tipeMobil;
            this.form.jenisTransmisi = item.jenisTransmisi;
            this.jenisTransmisi = item.jenisTransmisi;
            this.form.jenisBahanBakar = item.jenisBahanBakar;
            this.jenisBahanBakar = item.jenisBahanBakar;
            this.form.volumeBahanBakar = item.volumeBahanBakar;
            this.form.warnaMobil = item.warnaMobil;
            this.form.kapasitasPenumpang = item.kapasitasPenumpang;
            this.kapasitasPenumpang = item.kapasitasPenumpang;
            this.form.fasilitas = item.fasilitas;
            this.form.platNomor = item.platNomor;
            this.form.nomorSTNK = item.nomorSTNK;
            this.form.kategoriAset = item.kategoriAset;
            this.kategoriAset = item.kategoriAset;
            this.tempKategoriAset = item.kategoriAset;
            this.form.hargaSewaMobil = item.hargaSewaMobil;
            this.form.statusKetersediaanMobil = item.statusKetersediaanMobil;
            this.form.tanggalTerakhirServis = item.tanggalTerakhirServis;
            this.form.gambarMobil = item.gambarMobil;
            this.form.periodeKontrakMulai = item.periodeKontrakMulai;
            this.form.periodeKontrakAkhir =  item.periodeKontrakAkhir;
            this.dialog = true;
        },
        deleteHandler(idMobil) {
            this.deleteId = idMobil;
            this.dialogConfirm = true;
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
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.tempKategoriAset = null;
            this.readData();
        },
        cancel(){
            this.modelMitra = null;
            this.kategoriAset = null;
            this.tempKategoriAset = null;
            this.jenisTransmisi = null;
            this.tipeMobil = null;
            this.jenisBahanBakar = null;
            this.kapasitasPenumpang = null;
            this.namaMitra = null;
            this.resetForm();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
            this.$refs.formGambarMobil.reset();
            this.$refs.fileGambar.value = null;
        },
        resetForm() {
            this.form = {
                idMitra : null,
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
            };
            this.$refs.formGambarMobil.reset();
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