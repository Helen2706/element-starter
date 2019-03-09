import Vue from 'vue'
import Router from 'vue-router'
import BackManagement from '../components/BackManagement'
import NavbarManagement from '../components/NavbarManagement'
import BasicSetting from '../components/BasicSetting'
import CollegeWebsite from '../components/CollegeWebsite'
import CollegeHomePage from '../components/CollegeHomePage'
import Education from '../components/Education'
import BoShiEducation from '../components/BoShiEducation'
import Carousel from '../components/Carousel'
import AddNews from '../components/AddNews'
import NewsList from '../components/NewsList'
import ModuleManagement from '../components/ModuleManagement'
import NotificationComponent from '../components/NotificationComponent'
import SystemMenuComponent from '../components/SystemMenuComponent'

Vue.use(Router);

export default new Router({
    routes:[{
            path:'/back',
            name:'BackManagement',
            component:BackManagement,
            children:[{
                    path:'',
                    name:'NavbarManagement',
                    component:NavbarManagement
                },{
                    path:'menu',
                    name:'NavbarManagement',
                    component:NavbarManagement
                },{
                    path:'module-management',
                    name:'ModuleManagement',
                    component:ModuleManagement
                },{
                    path:'system-menu',
                    name:'SystemMenuComponent',
                    component:SystemMenuComponent
                },
                {
                    path:'notification',
                    name:'NotificationComponent',
                    component:NotificationComponent
                },
                {
                    path:'add-news',
                    name:'AddNews',
                    component:AddNews
                },
                {
                    path:'news-list',
                    name:'NewsList',
                    component:NewsList
                },
                {
                    /*学院网站信息基础设置*/
                    path:'basic-setting',
                    name:'BasicSetting',
                    component:BasicSetting
                },
                {
                    path:'carousel',
                    name:'Carousel',
                    component:Carousel
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
                    name:'NavbarManagement',
                    component:NavbarManagement
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