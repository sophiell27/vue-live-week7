<script>
import MessageModalComponent from '../components/MessageModalComponent.vue';
import router from '../router';
const { VITE_API, VITE_PATH } = import.meta.env;
export default {
    data(){
        return{ 
            MessageModal: {},
            loginStatus: ""
        }
    },
    components: {
        MessageModalComponent
    },
    methods: {
        checkLogin(){
            const token =  document.cookie.replace(/(?:(?:^|.*;\s*)week7Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          this.$http.defaults.headers.common['Authorization'] = token;
            const result = this.$http.post(`${VITE_API}api/user/check`)
            .then(res => {
                this.loginStatus = true
            })
            .catch(res => {
                this.MessageModal.showMessage("驗證不成功，請重新登入！")
                router.push("/")
            })
        }
    },
    mounted(){
       this.checkLogin();
       this.MessageModal = this.$refs.MessageModal
    }

}
</script>

<template>
    <MessageModalComponent ref="MessageModal"></MessageModalComponent>
<nav class="bg-dark text-white mb-5">
    <div class="container nav ">
    <RouterLink class="nav-link text-white" to="/admin/orders/1">訂單</RouterLink>
    <RouterLink class="nav-link text-white" to="/admin/products/1">產品</RouterLink>
    <RouterLink class="nav-link text-white" to="/admin/coupons">優惠劵</RouterLink>
    <RouterLink class="nav-link text-white" to="/admin/articles">文章</RouterLink>
    <a class="nav-link text-white ms-auto" href="#">登出</a>
    </div>
</nav>
<div class="container">
   
    <RouterView v-if="loginStatus"></RouterView>

</div>

</template>