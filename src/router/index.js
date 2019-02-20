import Vue from 'vue'
import Router from 'vue-router'
import BackManagement from '../components/BackManagement'
import NavbarManagement from '../components/NavbarManagement'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/back',
            name:'BackManagement',
            component:BackManagement,
            children:[
                {
                    path:'',
                    name:'NavbarManagement',
                    component:NavbarManagement
                },{
                    path:'menu',
                    name:'NavbarManagement',
                    component:NavbarManagement
                }
            ]
        }, {
            path:'',
            name:'BackManagement',
            component:BackManagement,
            children:[
                {
                    path:'',
                    name:'NavbarManagement',
                    component:NavbarManagement
                }]
        }
    ]
})