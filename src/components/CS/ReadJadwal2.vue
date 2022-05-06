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
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>

        </div>

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
    },

    mounted() {
        this.readData();
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