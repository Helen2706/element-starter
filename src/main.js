import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
/*注册axios组件*/
import axios from 'axios'
import VueAxios from 'vue-axios'

/*注册使用富文本编辑框组件*/
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'




Vue.use(VueQuillEditor)
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
