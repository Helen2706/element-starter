import Vue from 'vue'
import Router from 'vue-router'
import BackManagement from '../components/BackManagement'
import NavbarManagement from '../components/NavbarManagement'
import BasicSetting from '../components/BasicSetting'
import CollegeWebsite from '../components/CollegeWebsite'
import CollegeHomePage from '../components/CollegeHomePage'
import Education from '../components/Education'
import BoShiEducation from '../components/BoShiEducation'

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
        },
        {
            path:'',
            name:'BackManagement',
            component:BackManagement,
            children:[
                {
                    path:'',
                    name:'BasicSetting',
                    component:BasicSetting
                }]
        },
        {
            path:'/website',
            name:'CollegeWebsite',
            component:CollegeWebsite,
            children:[
                {
                    path:'',
                    name:'CollegeHomePage',
                    component:CollegeHomePage
                },
                {
                    path:'home',
                    name:'CollegeHomePage',
                    component:CollegeHomePage
                },
                {
                    path:'edu',
                    name:'Education',
                    component:Education,
                    children:[
                        {
                            path:'',
                            name:'BoShiEducation',
                            component:BoShiEducation
                        },
                        {
                            path:'boshi',
                            name:'BoShiEducation',
                            component:BoShiEducation
                        }
                    ]
                }
                ]
        }
    ]
})