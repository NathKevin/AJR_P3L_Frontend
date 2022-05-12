<template>
    <v-main class="customerChecks">

        <div class="bg">
        <h1>Customer Checks</h1>
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

            <div>
                <v-row>
                    <v-chip-group>
                        <v-chip @click="showAllCustomer()"  class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Show All</v-chip>
                        <v-chip @click="showNewCustomer()" class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Show New Register</v-chip>
                    </v-chip-group>
                </v-row>
            </div>

            <v-data-table v-if="showAll" :headers="headers" :items="customers" :search="search" >
                <template v-slot:[`item.statusBerkas`]="{ item }">
                    <span v-if=" item.waiting == 1"> <v-chip small label class="grey" color="white--text">Menunggu Verifikasi</v-chip></span>
                    <span v-else-if=" item.statusBerkas == 'Diterima'"> <v-chip small label class="green lighten-1" color="white--text">Diterima</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Ditolak</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <!-- <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn> -->
                    <!-- <v-btn class="mr-2" small @click="deleteHandler(item.idPegawai)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn> -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-btn class="blue darken-4 white--text" small @click="detailHandler(item)" > Lihat Berkas </v-btn>
                    </v-menu>
                </template>
            </v-data-table>

            <h5 class="text-right mr-5" v-if="showNew">Customer baru dalam jangka 1 minggu</h5>

            <v-data-table v-if="showNew" :headers="headers2" :items="newCustomers" :search="search" >
                <template v-slot:[`item.statusBerkas`]="{ item }">
                    <span v-if=" item.waiting == 1"> <v-chip small label class="grey" color="white--text">Butuh Verifikasi</v-chip></span>
                    <span v-else-if=" item.statusBerkas == 'Diterima'"> <v-chip small label class="green lighten-1" color="white--text">Diterima</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Ditolak</v-chip> </span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <!-- <v-btn class="mr-2" small @click="editHandler(item)" 
                    flat icon color="green"> <v-icon>mdi-pencil</v-icon></v-btn> -->
                    <!-- <v-btn class="mr-2" small @click="deleteHandler(item.idPegawai)" 
                    flat icon color="red"> <v-icon>mdi-delete</v-icon></v-btn> -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-btn class="blue darken-4 white--text" small @click="detailHandler(item)" > Lihat Berkas </v-btn>
                    </v-menu>
                </template>
            </v-data-table>
        </v-card>

        </div>

        <v-dialog v-model="dialog" persistent fullscreen>
            <v-card>
                <v-app-bar fixed hide-on-scroll color="white--text" class="blue darken-4" flat>
                    <span  class="headline">File Berkas Customer</span>
                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                    <template v-slot:activator="{ on: menu}">   
                        <v-btn v-on="menu" small elevation="8" plain outlined class="blue lighten-4 mr-5" color="black" >Ubah Status Verifikasi </v-btn>
                    </template>
                    <v-card >
                       <v-btn block class="green white--text" @click="isDiterima" >Diterima</v-btn>
                       <v-btn block class="red white--text" @click="isDitolak">Ditolak</v-btn>
                    </v-card>
                </v-menu>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dialog = !dialog" router v-bind="attrs" v-on="on" icon fab> 
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Exit</span>
                    </v-tooltip>
                </v-app-bar>
                <br><br>
                <v-row dense no-gutters> 
                    <v-card-text style="font-size: 20px;" class="text-left">File KTP </v-card-text>
                    <v-flex>
                        <v-img v-if="this.detailForm.KTP != null" class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.KTP" max-height="1280" max-width="1280" ></v-img>
                    </v-flex>
                </v-row>
                <br>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-row dense no-gutters> 
                    <v-card-text style="font-size: 20px;" class="text-left">File SIM </v-card-text>
                    <v-flex>
                        <v-img v-if="this.detailForm.SIM != null" class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.SIM" max-height="1280" max-width="1280" ></v-img>
                        <h4 v-if="this.detailForm.SIM == null">File SIM Kosong</h4>
                    </v-flex>
                </v-row>
                <br>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-row dense no-gutters> 
                    <v-card-text style="font-size: 20px;" class="text-left">File Kartu Pelajar </v-card-text>
                    <v-flex>
                        <v-img v-if="this.detailForm.KP != null" class="mx-auto" :src="$baseUrl+'/storage/'+detailForm.KP" max-height="1280" max-width="1280" ></v-img>
                        <h4 v-if="this.detailForm.KP == null">File KP Kosong</h4>
                    </v-flex>
                </v-row>
                <br>
                <v-divider></v-divider>
                <v-divider></v-divider>
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
    name: 'CustomerChecks',
    data() {
        return{
            statusBerkas: null,
            snackbar: false,
            snackbar2: false,
            success_message: null,
            error_message: null,
            dialog: false,
            editId: null,
            showAll: true,
            showNew : false,
            search: null,
            load: false,
            customers : [],
            newCustomers : [],
            headers:[
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaCustomer",
                },
                { text: "Kategori Customer", value: "kategoriCustomer" },
                { text: "No.Telepon", value: "noTelpCustomer"},
                { text: "Status Berkas", value: "statusBerkas" },
                { text: "Actions", value: "actions"},
            ],
            headers2:[
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaCustomer",
                },
                { text: "Kategori Customer", value: "kategoriCustomer" },
                { text: "No.Telepon", value: "noTelpCustomer"},
                { text: "Tanggal Daftar", value: "created_at"},
                { text: "Status Berkas", value: "statusBerkas" },
                { text: "Actions", value: "actions"},
            ],
            detailForm:{
                KTP : null,
                SIM : null,
                KP : null,
                statusBerkas : null,
            }
        }
    },

    methods: {
        isDiterima(){
            this.statusBerkas = 'Diterima';
            this.editStatus();
        },
        isDitolak(){
            this.statusBerkas = 'Ditolak';
            this.editStatus();
        },
        readData(){
            var url = this.$api + '/showAll/customer';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.customers = response.data.data;
            })
        },
        showAllCustomer(){
            this.readData();
            this.showAll = true;
            this.showNew = false;
        },
        showNewCustomer(){
            this.readData();
            this.newCustomers = [];
            for(let i=0; i< this.customers.length; i++){
                if(this.customers[i].diff < 8){
                    this.newCustomers.push(this.customers[i]);
                }
            }
            this.showAll = false;
            this.showNew = true;
        },
        editStatus(){
            this.detailForm.statusBerkas = this.statusBerkas;
            let newData = {
                statusBerkas : this.detailForm.statusBerkas
            };
            var url = this.$api + '/updateStatusBerkas/customer/' + this.editId;
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
                if(this.showAll == true){
                    this.showAllCustomer();
                }else{
                    this.showNewCustomer();
                    location.reload();
                }
                this.close();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        detailHandler(item){
            this.editId = item.idCustomer;
            this.detailForm.KTP = item.KTP;
            this.detailForm.SIM = item.SIM
            this.detailForm.KP = item.KP;
            this.detailForm.statusBerkas = item.statusBerkas;
            this.dialog = !this.dialog;
        },
        close(){
            this.dialog = false;
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    mounted() {
        this.showAllCustomer();
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

