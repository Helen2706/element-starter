import Vue from 'vue'
import Router from 'vue-router'
import BackManagement from '../components/BackManagement'
import NavbarManagement from '../components/NavbarManagement'
import BasicSetting from '../components/BasicSetting'

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
                    name:'BasicSetting',
                    component:BasicSetting
                },{
                    path:'menu',
                    name:'NavbarManagement',
                    component:NavbarManagement
                },
                {
                    /*学院网站信息基础设置*/
                    path:'basic-setting',
                    name:'BasicSetting',
                    component:BasicSetting
                }
            ]
        }, {
            path:'',
            name:'BackManagement',
            component:BackManagement,
            children:[
                {
                    path:'',
                    name:'BasicSetting',
                    component:BasicSetting
                }]
        }
    ]
})