import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'


import App from './App.vue'
import router from './router'

// vee-validate 
import { Form,Field,ErrorMessage } from 'vee-validate';
import { defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';
localize({ zh_TW  });
configure({
    generateMessage: localize({
      zh_TW
    })
  });
  setLocale("zh_TW")

  // loading 
  
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

  


const app = createApp(App)

app.component("VForm", Form,)
app.component("VField", Field,)
app.component("VErrorMessage", ErrorMessage),
app.component("loading",Loading)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
