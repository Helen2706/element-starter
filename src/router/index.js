import Vue from 'vue'
import Router from 'vue-router'
import BackManagement from '../components/BackManagement'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/back',
            name:'BackManagement',
            component:BackManagement
        }, {
            path:'',
            name:'BackManagement',
            component:BackManagement
        }
    ]
})