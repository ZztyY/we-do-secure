import Vue from 'vue'
import { 
  Button,
  Container,
  Main,
  Header, Aside,
  Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown,DropdownMenu, DropdownItem,
  Row, Col, Card, Form, FormItem,
  Input, Divider, Descriptions, DescriptionsItem,
  Dialog, Select, Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import http from 'axios'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$http = http

router.beforeEach(( to, from, next) =>  {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'overview' })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
