<template>
    <v-main class="list">

        <div class="bg">
        <h1>Jadwal Pegawai</h1>
        <br>

            <v-card>
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
            </v-card>
            <br>
            <div>
                <v-row>
                    <v-chip v-model="trigger"  @click="triggerAllReveal()" class="ml-5 mt-3 " color="white" text-color="blue lighten-2" > {{ this.chipMessage }} </v-chip>
                </v-row>
            </div>

            <br><br>

            <v-row >
                <v-col md="6">
                        
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        max-height="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                        <p class="text-h4 text-right" >
                            {{ this.dayType[0].text }} <!-- SENIN -->
                        </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="white"
                                @click="reveal = !reveal"
                            >
                                <v-icon>{{ reveal ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                <v-card-text>{{reveal ? 'CLOSE' : 'OPEN'}}</v-card-text>
                            </v-btn>
                        </v-card-actions>
                        
                        <v-expand-transition>
                        <v-card v-show="reveal">
                            <v-card-text class="pb-0">
                                <v-data-table :headers="headers" :items="senin" :search="search" dense hide-default-footer >
                                    <template v-slot:[`item.actions`]="{ item }">    
                                        <v-btn class="mr-2" small @click="editHandler(item)" 
                                        flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                        flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>

                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                            <p class="text-h4 text-right" >
                                {{ this.dayType[1].text }} <!-- SELASA -->
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="white"
                                @click="reveal1 = !reveal1"
                            >
                                <v-icon>{{ reveal1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                <v-card-text>{{reveal1 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                            <v-card v-if="reveal1" >
                                <v-card-text class="pb-0">
                                    <v-data-table :headers="headers" :items="selasa" :search="search" dense hide-default-footer >
                                        <template v-slot:[`item.actions`]="{ item }">    
                                            <v-btn class="mr-2" small @click="editHandler(item)" 
                                            flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                            <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                            flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-actions class="pt-0">
                                </v-card-actions>
                            </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>

            <v-row >
                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                        <p class="text-h4 text-right" >
                            {{ this.dayType[2].text }} <!-- RABU -->
                        </p>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn
                            text
                            color="white"
                            @click="reveal2 = !reveal2"
                        >
                            <v-icon>{{ reveal2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            <v-card-text>{{reveal2 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card v-if="reveal2">
                            <v-card-text class="pb-0">
                                <v-data-table :headers="headers" :items="rabu" :search="search" dense hide-default-footer >
                                    <template v-slot:[`item.actions`]="{ item }">    
                                        <v-btn class="mr-2" small @click="editHandler(item)" 
                                        flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                        flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>

                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                            <p class="text-h4 text-right" >
                                {{ this.dayType[3].text }}  <!-- KAMIS -->
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="white"
                                @click="reveal3 = !reveal3"
                            >
                               <v-icon>{{ reveal3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                               <v-card-text>{{reveal3 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                            <v-card v-if="reveal3" >
                                <v-card-text class="pb-0">
                                    <v-data-table :headers="headers" :items="kamis" :search="search" dense hide-default-footer >
                                        <template v-slot:[`item.actions`]="{ item }">    
                                            <v-btn class="mr-2" small @click="editHandler(item)" 
                                            flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                            <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                            flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-actions class="pt-0">
                                </v-card-actions>
                            </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>

             <v-row >
                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                        <p class="text-h4 text-right" >
                            {{ this.dayType[4].text }} <!-- JUMAT -->
                        </p>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn
                            text
                            color="white"
                            @click="reveal4 = !reveal4"
                        >
                            <v-icon>{{ reveal4 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            <v-card-text>{{reveal4 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card v-if="reveal4">
                            <v-card-text class="pb-0">
                                <v-data-table :headers="headers" :items="jumat" :search="search" dense hide-default-footer >
                                    <template v-slot:[`item.actions`]="{ item }">    
                                        <v-btn class="mr-2" small @click="editHandler(item)" 
                                        flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                        flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>

                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                            <p class="text-h4 text-right" >
                                {{ this.dayType[5].text }}  <!-- SABTU -->
                            </p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="white"
                                @click="reveal5 = !reveal5"
                            >
                               <v-icon>{{ reveal5 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                               <v-card-text>{{reveal5 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                            <v-card v-if="reveal5" >
                                <v-card-text class="pb-0">
                                    <v-data-table :headers="headers" :items="sabtu" :search="search" dense hide-default-footer >
                                        <template v-slot:[`item.actions`]="{ item }">    
                                            <v-btn class="mr-2" small @click="editHandler(item)" 
                                            flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                            <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                            flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-actions class="pt-0">
                                </v-card-actions>
                            </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>

            <v-row >
                <v-col md="6">
                    <v-card
                        class="mx-auto"
                        max-width="1000px"
                        color="#5A95ED"
                    >
                        <v-card-text class="white--text">
                        <p class="text-h4 text-right" >
                            {{ this.dayType[6].text }} <!-- MINGGU -->
                        </p>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn
                            text
                            color="white"
                            @click="reveal6 = !reveal6"
                        >
                            <v-icon>{{ reveal6 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            <v-card-text>{{reveal6 ? 'CLOSE' : 'OPEN'}}</v-card-text>
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card v-if="reveal6">
                            <v-card-text class="pb-0">
                                <v-data-table :headers="headers" :items="minggu" :search="search" dense hide-default-footer >
                                    <template v-slot:[`item.actions`]="{ item }">    
                                        <v-btn class="mr-2" small @click="editHandler(item)" 
                                        flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn class="mr-2" small @click="deleteHandler(item.idDetailJadwal)" 
                                        flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">{{ formTitle }} Jadwal Karyawan</span>
                </v-toolbar>
                    <v-card-text>
                        <v-container>
                        <v-select
                            v-model="idPegawai"
                            item-text="namaPegawai" 
                            item-value="idPegawai"
                            :items="pegawai"
                            label="Nama Pegawai"
                            :rules="rules.null"
                            clearable
                        >
                        </v-select>
                        <v-select
                            v-model="hari"
                            :items="dayType"
                            label="Hari Kerja"
                            :rules="rules.null"
                            clearable
                        >
                        </v-select>
                        <v-select
                            v-model="waktuMulai"
                            item-text="waktuMulai"
                            item-value="waktuMulai"
                            :items="times"
                            label="Jam Mulai Kerja"
                            :rules="rules.null"
                            clearable
                        >
                        </v-select>
                        <v-select
                            v-model="waktuSelesai"
                            item-text="waktuSelesai"
                            item-value="waktuSelesai"
                            :items="times"
                            label="Jam Selesai Kerja"
                            :rules="rules.null"
                            clearable
                        >
                        </v-select>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="setForm"> Save </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

             <v-dialog v-model="dialogConfirm" persistent max-width="400px">
                <v-card>
                    <v-toolbar color="white--text" class="red" flat>
                        <span  class="headline">Warning!</span>
                    </v-toolbar>
                    <br>
                    <v-card-text> <strong>Anda yakin ingin menghapus jadwal karyawan ini?</strong> </v-card-text>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogConfirm = false"> Cancel </v-btn>
                        <v-btn color="red darken-1" text @click="deleteData"> Delete </v-btn>
                    </v-card-action>
                </v-card>
            </v-dialog>

        </div>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    </v-main>
</template>

<script>
export default {
    name: 'List',
    data() {
        return{
            chipMessage: 'Open All',
            idPegawai: null,
            hasilCek: null,
            statusCek: null,
            trigger: 1,
            hari: null,
            waktuMulai: null,
            waktuSelesai: null,
            inputType: 'Tambah',
            load: false,
            snackbar: false,
            reveal: false,
            reveal1: false,
            reveal2: false,
            reveal3: false,
            reveal4: false,
            reveal5: false,
            reveal6: false,
            error_message: '',
            color: '',
            search: null,
            dialog: false,
            dialogConfirm: false,
            times: [],
            senin: [],
            selasa: [],
            rabu: [],
            kamis: [],
            jumat: [],
            sabtu: [],
            minggu: [],
            pegawai: [],
            headers:[
                {
                    text: "Nama Pegawai",
                    align: "start",
                    sortable: true,
                    value: "namaPegawai",
                },
                { text: "Jabatan", value: "namaRole" },
                { text: "Jam", value: "time" },
                { text: "Actions", value: "actions" },
            ],
            dayType:[
                {text: 'Senin', value: 'Senin'},
                {text: 'Selasa', value: 'Selasa'},
                {text: 'Rabu', value: 'Rabu'},
                {text: 'Kamis', value: 'Kamis'},
                {text: 'Jumat', value: 'Jumat'},
                {text: 'Sabtu', value: 'Sabtu'},
                {text: 'Minggu', value: 'Minggu'},
            ],
            detailJadwal: new FormData,
            detailJadwals: [],
            form: {
                idPegawai: null,
                idJadwal: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val|| 'This field is required'],
            },
        };
    },

    methods: {
         setForm(){
             if(this.inputType === 'Tambah'){
                 this.checkShift(this.idPegawai);
            }else{
                console.log(this.inputType);
                this.checkInputJadwal();
            }
        },
        //Read Data promos
        readData(){
            var url = this.$api + '/dj';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.detailJadwals = response.data.data;
            })
        },
        readDataDaySenin(){
            var url = this.$api + '/show/dj/' + 'Senin';
            this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.senin = response.data.data;
            })
        },
        readDataDaySelasa(){
            var url = this.$api + '/show/dj/' + 'Selasa';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.selasa = response.data.data;
            })
        },
        readDataDayRabu(){
            var url = this.$api + '/show/dj/' + 'Rabu';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.rabu = response.data.data;
            })
        },
        readDataDayKamis(){
            var url = this.$api + '/show/dj/' + 'Kamis';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.kamis = response.data.data;
            })
        },
        readDataDayJumat(){
            var url = this.$api + '/show/dj/' + 'Jumat';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.jumat = response.data.data;
            })
        },
        readDataDaySabtu(){
            var url = this.$api + '/show/dj/' + 'Sabtu';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.sabtu = response.data.data;
            })
        },
        readDataDayMinggu(){
            var url = this.$api + '/show/dj/' + 'Minggu';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.minggu = response.data.data;
            })
        },
        getTime(){
            var url = this.$api + '/getTime/jadwal';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.times = response.data.data;
            })
        },
        getAllPegawaiAktif(){
            var url = this.$api + '/getAktif/pegawai';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.pegawai = response.data.data;
            })
        },
        checkShift($id){
            var url = this.$api + '/cekShift/dj/' + $id;
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.error_message = response.data.message;
                this.hasilCek = response.data.data;
                console.log(this.error_message);
                this.checkInputJadwal();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.hasilCek = error.response.data.data;
                this.statusCek = error.response.data.status;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        checkIsShift($idJadwal, $idPegawai){
            console.log($idJadwal);
            console.log($idPegawai);
            var url = this.$api + '/cekIsShift/dj/' + $idJadwal + '/' + $idPegawai;
            console.log(url);
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.error_message = response.data.message;
                if(this.inputType == 'Tambah'){
                    this.save();
                }else{
                    this.update();
                }
            }).catch(error => {
                console.log(error.response.data.message);
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        checkInputJadwal(){
            var url = this.$api + '/search/jadwal/' + this.hari + '/'+ this.waktuMulai +'/'+ this.waktuSelesai;
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.error_message = response.data.message;
                this.hasilCek = response.data.data;
                this.statusCek = response.data.status;
                this.checkIsShift(this.hasilCek.idJadwal, this.idPegawai);
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Simpan data jadwal Karyawan
        save(){
            if(this.statusCek.status == 0){
                return;
            }

            this.form.idPegawai = this.idPegawai;
            this.form.idJadwal = this.hasilCek.idJadwal;
            this.detailJadwal.append('idPegawai', this.form.idPegawai);
            this.detailJadwal.append('idJadwal', this.form.idJadwal);

            var url = this.$api + '/create/dj'
            this.load = true;
            this.$http.post(url, this.detailJadwal, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData(); //Baca data
                this.readDataDaySenin();
                this.readDataDaySelasa();
                this.readDataDayRabu();
                this.readDataDayKamis();
                this.readDataDayJumat();
                this.readDataDaySabtu();
                this.readDataDayMinggu();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Ubah data promo
        update() {
            if(this.statusCek.status == 0){
                return;
            }
            this.form.idPegawai = this.idPegawai;
            this.form.idJadwal = this.hasilCek.idJadwal;

            let newData = {
                idPegawai: this.form.idPegawai,
                idJadwal: this.form.idJadwal,
            };
            var url = this.$api + '/update/dj/' + this.editId;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.readDataDaySenin();
                this.readDataDaySelasa();
                this.readDataDayRabu();
                this.readDataDayKamis();
                this.readDataDayJumat();
                this.readDataDaySabtu();
                this.readDataDayMinggu();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        //Hapus promo
        deleteData() {
            var url = this.$api + '/delete/dj/' + this.deleteId;
            this.load = true;
            this.$http.delete(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData(); //Baca data
                this.readDataDaySenin();
                this.readDataDaySelasa();
                this.readDataDayRabu();
                this.readDataDayKamis();
                this.readDataDayJumat();
                this.readDataDaySabtu();
                this.readDataDayMinggu();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        triggerAllReveal(){
            if(this.trigger == 1){
                this.reveal = true;
                this.reveal1 = true;
                this.reveal2 = true;
                this.reveal3 = true;
                this.reveal4 = true;
                this.reveal5 = true;
                this.reveal6 = true;
                this.chipMessage = 'Close All';
                this.trigger = 0;
            }else{
                this.reveal = false;
                this.reveal1 = false;
                this.reveal2 = false;
                this.reveal3 = false;
                this.reveal4 = false;
                this.reveal5 = false;
                this.reveal6 = false;
                this.chipMessage = 'Open All';
                this.trigger = 1;
            }
        },
        editHandler(item) {
            this.inputType = 'Ubah';
            this.editId = item.idDetailJadwal;
            this.idPegawai = item.idPegawai;
            this.hari = item.hari;
            this.waktuMulai = item.waktuMulai;
            this.waktuSelesai = item.waktuSelesai;
            this.dialog = true;
        },
        deleteHandler(idDetailJadwal) {
            this.deleteId = idDetailJadwal;
            this.dialogConfirm = true;
        },
        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();
        },
        cancel(){
            this.resetForm();
            this.readData();
            this.dialog = false;
            this.dialogConfirm = false;
            this.inputType = 'Tambah';
        },
        resetForm() {
            this.form = {
                idPegawai : null,
                idJadwal : null,
            };
            this.idPegawai = null,
            this.hari = null,
            this.waktuMulai = null,
            this.waktuSelesai = null
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted() {
        this.readData();
        this.getTime();
        this.getAllPegawaiAktif();
        this.readDataDaySenin();
        this.readDataDaySelasa();
        this.readDataDayRabu();
        this.readDataDayKamis();
        this.readDataDayJumat();
        this.readDataDaySabtu();
        this.readDataDayMinggu();
    }
}
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

.v-card--reveal {
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>

 <!-- <v-container v-for="day in selasa" :key="day.idDetailJadwal" >
    <span v-if="checkJadwal(time,day)">{{ day.namaRole }} - {{ day.namaPegawai }}</span>
</v-container> -->

<!-- <v-list-item v-for="day in selasa" :key="day.idDetailJadwal">
    <v-list-item-title class="text-left">
        <span v-if="checkJadwal(time,day)">{{ day.namaRole }} - {{ day.namaPegawai }}</span>
    </v-list-item-title>
</v-list-item> -->

//THIS IS A METHOD UNUSED WITH THIS ABOVE
// checkJadwal(time, day){
        //     if(time.time == day.time){
        //         return true;
        //     }
        //     return false;
        // },