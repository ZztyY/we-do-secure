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
  Dialog, Select, Option, DatePicker,
  Switch, RadioGroup, Radio,
  InfiniteScroll, Message, InputNumber,
  Empty, RadioButton
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import router from './router'
import store from './store'
import http from 'axios'
import App from './App.vue'

locale.use(lang)

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
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(InfiniteScroll)
Vue.use(InputNumber)
Vue.use(Empty)
Vue.use(RadioButton)

Vue.prototype.$http = http
Vue.prototype.$message = Message

router.beforeEach(( to, from, next) =>  {
  store.commit('getUser')
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
