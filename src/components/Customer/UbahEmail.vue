<template>
    <v-main class="ubahEmail">
        <br><br><br><br>
        <v-progress-circular
            size="60"
            v-if="load"
            indeterminate
            color="primary"
        ></v-progress-circular>
        <v-overlay :value="load"></v-overlay>
        <v-container class="backgroundContainer" fill-height fluid>
            <v-row justify="center" align="center">
                <v-card v-if="dialog" elevation="20" class="backgroundCard" width="800" height="500" max-height="600" max-width="900">
                    <v-row>
                        <v-col class="ml-1" cols="6">
                            <v-card-title class="justify-center mt-10">
                                <h3>ATMA JOGJA RENTAL</h3>
                            </v-card-title>
                            <v-card-sub-title>
                                <h5>Ubah Email</h5>
                            </v-card-sub-title>
                            <br>
                            <br>
                            <br>
                            <v-container>
                                <v-form ref="form">
                                    <v-text-field
                                        dense
                                        outlined
                                        rounded
                                        v-model="form.email"
                                        label="Email"
                                        :rules="rules.null"
                                    >
                                    </v-text-field>
                                </v-form>
                                <br><br>
                                <v-btn plain class="btnLogin blue darken-4" >
                                    <span @click="submit" class="btnLogin2 white--text">Ubah</span>
                                </v-btn>
                                <br><br><br><br><br><br>
                            </v-container>
                        </v-col>
                        <v-col>
                            <v-container fill-height fluid>
                                <v-row class="mr-1" justify="center" align="center">
                                        <v-card class="overlap" height="350" width="300" max-width="300" max-height="350">
                                            <v-icon class="mt-12" size="50px">mdi-email</v-icon>
                                            <br><br>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:justify;">
                                                    Pastikan email anda aktif dan dapat digunakan.
                                                </h5>
                                            </v-card-sub-title>
                                            <br>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    Panduan Ubah Email :
                                                </h5>
                                            </v-card-sub-title>
                                            <v-card-sub-title >
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    1. Email yang tertampil adalah email anda yang lama
                                                </h5>
                                                <h5 class="ml-5 mr-5" style="text-align:left;">
                                                    2. Gantilah dengan email baru sesuai dengan format email. ex : atmajogjarentalexample@gmail.com
                                                </h5>
                                            </v-card-sub-title>
                                        </v-card>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>

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
    name: "login",
    data() {
        return{
            dialog: false,
            error_message: null,
            success_message: null,
            color: null,
            snackbar: null,
            snackbar2: null,
            load: true,
            email: null,
            pass: null,
            customer: {},
            form : {email: null},
            menuItems:[
                { title: 'Beranda', path: '/AtmaJayaRental' },
            ],
            sidebar: false,
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        }
    },

    methods:{
        toHome(){
            this.$router.push({
                name: 'AJR',
            });
        },
        submit() {
            if(this.$refs.form.validate()) {
                //cek validasi data yang terkirim
                this.load = true;
                this.dialog = false;
                this.$http.put(this.$api + '/updateEmail/customer/' + localStorage.getItem('id'), this.form
                ).then(response => {
                    //simpan data id user yang diinput
                    this.success_message = response.data.message;
                    this.color = "green";
                    this.snackbar2 = true;
                    this.load = false;
                    this.dialog = true;
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    localStorage.removeItem('token');
                    this.load = false;
                    this.dialog = true;
                })
            }
        },
        async getCustomer() {
            var url = this.$api + '/show/customer/' + localStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + localStorage.getItem('token')
                  }
            }).then(response => {
                this.customer = response.data.data;
                this.form.email = this.customer.email;
                this.load = false;
                this.dialog = true;
            })
        },
        clear() {
            this.$refs.form.reset() //clear form login
        }
    },

    async mounted(){
        await this.getCustomer();
     }
}
</script>

<style scoped>
.backgroundCard{
    background: linear-gradient(90deg, #FFFFFF 50%, #0D47A1 50%);
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 0.65;
    animation-fill-mode: forwards;
}

.btnLogin {
  border-radius: 4px;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
}

.btnLogin2 {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btnLogin2:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btnLogin:hover span {
  padding-right: 25px;
}

.btnLogin:hover span:after {
  opacity: 1;
  right: 0;
}

.overlap{
   position:absolute;
   animation: fadeInAnimation ease 3s;
    animation-iteration-count: 0.65;
    animation-fill-mode: forwards;
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