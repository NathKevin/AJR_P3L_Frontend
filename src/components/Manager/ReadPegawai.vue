<template>
    <v-main class="list">
        <div class="bg">
        <h1>Inspek Pegawai</h1>
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

            <v-data-table :headers="headers" :items="pegawais" :search="search" loading="true">
                <template v-slot:[`item.fotoPegawai`]="{ item }">
                    <v-avatar>
                        <v-img :src="checkPicture(item)" >
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
                <template v-slot:[`item.isActive`]="{ item }">
                    <span v-if=" item.isActive == 1"> <v-chip small label class="green lighten-1" color="white--text">Active</v-chip></span>
                    <span v-else> <v-chip small label class="red lighten-2" color="white--text">Non-Active</v-chip> </span>
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
            height="720px"
            width="450px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Pegawai</v-card-title>
            </v-toolbar>
                <v-divider></v-divider>
            <v-card class="mr-3 ml-3 " elevation="5">
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Jabatan   </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailRole }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.namaPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                 <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Alamat  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.alamatPegawai }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.tanggalLahirPegawai }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.jenisKelaminPegawai }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noTelpPegawai }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text  class="text-md-body-1 font-weight-black text-left ml-2"> Foto Pegawai  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text  class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-img v-if="checkIsPhoto()" @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoPegawai" height="150" width="150" class="mb-4"></v-img>
                        <span  v-if="checkIsPhoto()" class="text-body-1">Klik Gambar untuk zoom</span>
                    </v-col>
                </v-row>
            </v-card>

        </v-navigation-drawer>

        <v-overlay :value="overlay">
            <v-card>
                <v-img @click="overlay = !overlay" :src="$baseUrl+'/storage/'+detailForm.fotoPegawai" max-height="900" max-width="500" ></v-img>
                <v-card-text class="text-body-1"> Klik gambar untuk menutup</v-card-text>
            </v-card>
        </v-overlay>

    </v-main>
</template>

<script>
import image from "../../assets/personIcon.png"

export default {
    name: "List",
    data() {
        return{
            activePicker: null,
            menu: false,
            date: null,
            selectedRole : null,
            detailRole: null,
            drawer: false,
            overlay: false,
            previewIMG : null,
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
            dialogEmail: false,
            dialogPassword: false,
            image : image,
            oldPassword: null,
            headers: [
                {
                    text: "Foto Profil",
                    value: "fotoPegawai",
                },
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaPegawai",
                },
                { text: "Jabatan", value: "namaRole" },
                { text: "No.Telepon", value: "noTelpPegawai"},
                { text: "Status", value: "isActive" },
                { text: "Actions", value: "actions"},
            ],
            roleType: [
                {
                    text: "Manager",
                    value: 'Manager'
                },
                {
                    text: "Admin",
                    value: 'Admin'
                },
                {
                    text: "Customer Sercive",
                    value: 'Customer Service'
                }
            ],
            pegawai: new FormData,
            pegawais: [],
            roles: [],
            form: {
                idRole: null,
                namaPegawai: null,
                alamatPegawai: null,
                tanggalLahirPegawai: null,
                jenisKelaminPegawai: null,
                email: null,
                password: null,
                noTelpPegawai: null,
                fotoPegawai: null,
            },
            detailForm:{
                idRole: null,
                namaPegawai: null,
                alamatPegawai: null,
                tanggalLahirPegawai: null,
                jenisKelaminPegawai: null,
                email: null,
                password: null,
                noTelpPegawai: null,
                fotoPegawai: null,
                isActive: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        };
    },
    //ini untuk tanggallahir
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },

    methods: {
        checkIsPhoto(){
            if(this.detailForm.fotoPegawai == null ){
                return false;
            }else{
                return true;
            }
        },
        checkPicture(item){
            if(item.fotoPegawai == null ){
                return this.image;
            }else{
                return this.$baseUrl+'/storage/'+item.fotoPegawai;
            }
            
        },
        //Read Data Pegawais
        readData(){
            var url = this.$api + '/pegawai';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.pegawais = response.data.data;
            })
        },
        detailHandler(item){
            this.detailRole = item.namaRole;
            this.editId = item.idPegawai;
            this.detailForm.idRole = item.idRole;
            this.detailForm.namaPegawai = item.namaPegawai;
            this.detailForm.alamatPegawai = item.alamatPegawai;
            this.detailForm.tanggalLahirPegawai = item.tanggalLahirPegawai;
            this.detailForm.jenisKelaminPegawai = item.jenisKelaminPegawai;
            this.detailForm.email = item.email;
            this.detailForm.noTelpPegawai = item.noTelpPegawai;
            this.detailForm.fotoPegawai = item.fotoPegawai;
            this.detailForm.isActive = item.isActive;
            this.drawer = !this.drawer;
        },
    },

    mounted() {
        this.readData();
    }
};
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

</style>