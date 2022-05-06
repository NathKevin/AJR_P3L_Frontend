<template>
    <v-main class="list">

        <div class="bg">
        <h1>Inspek Mitra</h1>
        <br>

        <v-card elevation="3" class="table">
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

            <v-data-table :headers="headers" :items="mitras" :search="search" loading="true" mobile-breakpoint="0">
                <template v-slot:[`item.isActive`]="{ item }">
                    <span v-if=" item.isActive == 1"> <v-chip label class="green lighten-1" color="white--text">In Progress</v-chip></span>
                    <span v-else> <v-chip label class="red lighten-3" color="white--text">Finished</v-chip> </span>
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
            height="650px"
            width="450px"
        >
            <v-toolbar class="blue darken-4" color="white--text">
                <v-card-title> Detail Data Mitra</v-card-title>
            </v-toolbar>
                <v-divider></v-divider>
            <v-card class="mr-3 ml-3 ">
                <v-row class="mt-5" dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> Nama   </v-card-text>
                    </v-col>
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="5">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.namaMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                <v-row dense no-gutters>
                    <v-col sm="4">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> No.KTP  </v-card-text>
                    </v-col >
                    <v-col sm="1">
                        <v-card-text class="text-md-body-1 font-weight-black text-left ml-2"> :  </v-card-text>
                    </v-col>
                    <v-col sm="6">
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noKTPMitra }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.alamatMitra }}  </v-card-text>
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
                        <v-card-text class="text-md-body-1 font-weight-medium text-left"> {{ detailForm.noTelpMitra }}  </v-card-text>
                    </v-col>
                </v-row>
                
            </v-card>
       
        </v-navigation-drawer>

    </v-main>
</template>

<script>
export default{
    name: "List",
    data() {
        return{
            activePicker: null,
            date: null,
            drawer: false,
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
            headers: [
                {
                    text: "Nama",
                    align: "start",
                    sortable: true,
                    value: "namaMitra",
                },
                { text: "No.KTP", value: "noKTPMitra" },
                { text: "No.Telepon", value: "noTelpMitra"},
                { text: "Status", value: "isActive" },
                { text: "Actions", value: "actions"},
            ],
            mitra: new FormData,
            mitras: [],
            form: {
                namaMitra: null,
                noKTPMitra : null,
                alamatMitra: null,
                noTelpMitra: null,
                
            },
            detailForm:{
                namaMitra: null,
                noKTPMitra : null,
                alamatMitra: null,
                noTelpMitra: null,
                isActive: null,
            },
            deleteId: '',
            editId: '',
            rules: {
                null: 
                    [val => !!val|| 'This field is required'],
            },
        }
    },

    methods: {
        //Read Data mitra
        readData(){
            var url = this.$api + '/mitra';
            this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.mitras = response.data.data;
            })
        },
        detailHandler(item){
            this.editId = item.idMitra;
            this.detailForm.namaMitra = item.namaMitra;
            this.detailForm.noKTPMitra = item.noKTPMitra;
            this.detailForm.alamatMitra = item.alamatMitra;
            this.detailForm.noTelpMitra = item.noTelpMitra;
            this.detailForm.isActive = item.isActive;
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