<template>
    <div class="dashboard">

        <v-navigation-drawer 
            v-model="drawer" 
            class="blue darken-4" 
            width="250" 
            dark 
            app
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title" > Atma Jogja Rental</v-list-item-title>
                    <v-list-item-subtitle> Welcome Manager</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to"
                    color="yellow darken-1"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group :value="value" prepend-icon="mdi-book" class="yellow darken-3 text-right" color="black">
                    <template v-slot:activator >
                        <v-list-item-title>Inspeksi Data</v-list-item-title>
                    </template>
                    <v-list-item
                    v-for="item in readItems"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to"
                    color="blue darken-4"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content class="text-left">
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer> 

        <v-app-bar dark app fixed height="68px" color="#5A95ED">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer/>
            <v-avatar>
                <v-img src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png"></v-img>
            </v-avatar>
            <h4 class="white--text ml-3 mr-6" >Manager Name</h4>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab class="ml-4" text color="white" router v-bind="attrs" v-on="on"> <v-icon>mdi-power</v-icon> </v-btn>
                </template>
                <span>Logout</span>
            </v-tooltip>
        </v-app-bar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return{
            value: false,
            drawer: true, //ini tambahan GD11
            items: [
                {icon: "mdi-percent-circle", title: "Promo", to: "/promo"},
                {icon: "mdi-clipboard-file-outline", title: "Atur Jadwal", to: "/aturJadwal"},
                {icon: "mdi-calendar-range", title: "Jadwal Pegawai", to: "/jadwalKaryawan"},
            ],
            readItems: [
                {icon: "mdi-account-circle", title: "Tampil Pegawai", to: "/readPegawai"},
                {icon: "mdi-calendar-range", title: "Tampil Mobil", to: "/readMobil"},
                {icon: "mdi-account-multiple", title: "Tampil Mitra", to: "/readMitra"},
                {icon: "mdi-calendar-range", title: "Tampil Driver", to: "/readDriver"},
            ],
        };
    },

    methods: {
        // logout(){
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("id");
        //     this.$router.push({
        //         name: 'Login',
        //     });
        // }
    }
};
</script>

<style scoped>
.blue {
    min-height: 100vh !important;
}

.router{
    text-decoration: none;
    color: black;
}
</style>

