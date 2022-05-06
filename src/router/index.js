import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
  return () => import(`../components/${path}.vue`);
}

const routes = [
  {
    path: '/manager',
    name: 'Manager',
    component: importComponent("Manager/DashboardLayoutManager"),
    children: [
      {
        path: "/promo",
        name: "Promo",
        meta: {title: 'Promo'},
        component: importComponent("Manager/Promo"), 
      },
      {
        path: "/aturJadwal",
        name: "Atur_Jadwal",
        meta: {title: 'Atur_Jadwal'},
        component: importComponent("Manager/AturJadwal"), 
      },
      {
        path: "/jadwalKaryawan",
        name: "JadwalKaryawan",
        meta: {title: 'JadwalKaryawan'},
        component: importComponent("Manager/JadwalKaryawan"), 
      },
      {
        path: "/readPegawai",
        name: "TampilDataPegawai",
        meta: {title: 'TampilDataPegawai'},
        component: importComponent("Manager/ReadPegawai"), 
      },
      {
        path: "/readMitra",
        name: "TampilDataMitra",
        meta: {title: 'TampilDataMitra'},
        component: importComponent("Manager/ReadMitra"), 
      },
      {
        path: "/readMobil",
        name: "TampilDataMobil",
        meta: {title: 'TampilDataMobil'},
        component: importComponent("Manager/ReadMobil"), 
      },
      {
        path: "/readDriver",
        name: "TampilDataDriver",
        meta: {title: 'TampilDataDriver'},
        component: importComponent("Manager/ReadDriver"), 
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: importComponent("Admin/DashboardLayoutAdmin"),
    children: [
      {
        path: "/pegawai",
        name: "Pegawai",
        meta: {title: 'Pegawai'},
        component: importComponent("Admin/Pegawai"), 
      },
      {
        path: "/mitra",
        name: "Mitra",
        meta: {title: 'Mitra'},
        component: importComponent("Admin/Mitra"), 
      },
      {
        path: "/mobil",
        name: "Mobil",
        meta: {title: 'Mobil'},
        component: importComponent("Admin/Mobil"), 
      },
      {
        path: "/driver",
        name: "Driver",
        meta: {title: 'Driver'},
        component: importComponent("Admin/Driver"), 
      },
      {
        path: "/readJadwalinAdmin",
        name: "TampilJadwalPegawai1",
        meta: {title: 'TampilJadwalPegawai1'},
        component: importComponent("Admin/ReadJadwal1"), 
      },
    ]
  },
  {
    path: '/cs',
    name: 'CS',
    component: importComponent("CS/DashboardLayoutCS"),
    children: [
      {
        path: "/readJadwalinCS",
        name: "TampilJadwalPegawai2",
        meta: {title: 'TampilJadwalPegawai2'},
        component: importComponent("CS/ReadJadwal2"), 
      },
    ]
    
  },
  {
    path: '/AtmaJayaRental',
    name: 'AJR',
    meta: {title: 'AJR'},
    component: importComponent("AtmaJayaRentalLP"),
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {title: 'Login'},
    component: importComponent("Login"),
  },
  {
    path: '/Register',
    name: 'Register',
    meta: {title: 'Register'},
    component: importComponent("Register"),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
