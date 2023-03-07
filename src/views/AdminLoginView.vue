<script>
import adminStore from '../stores/adminStore.js';
import { mapActions } from 'pinia';
import router from '../router';
const { VITE_API, VITE_PATH } = import.meta.env;
import MessageModalComponent from "../components/MessageModalComponent.vue"
export default {
    data(){
        return {
            isLoading: false,
            fullPage:true,
            messageModal: {}
        }
    },
    watch: {
        isLoading(){
            setTimeout(()=> {
                this.isLoading=false
            },500)
        },
    },
    methods: {
        onSubmit(value){
            this.isLoading = true
            this.$http.post(`${VITE_API}admin/signin`, {username:value.email, password:value.password}).then(res => {
                const {expired, token } = res.data;
                document.cookie = `week7Token=${token};expires=${new Date(expired)}`
                this.$router.push("/admin")
                this.messageModal.showMessage("歡迎回來！")
                
            })
            .catch(err => {
                this.messageModal.showMessage("登入錯誤")
            })
        }

    },
    components: {
        MessageModalComponent
    },
    mounted(){
        // const token =  document.cookie.replace(/(?:(?:^|.*;\s*)week7Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // this.$http.defaults.headers.common['Authorization'] = token;
            this.$http.post(`${VITE_API}api/user/check`)
            .then(res => {
                router.push("/admin")
            })
            this.messageModal=this.$refs.messageModal
            console.log(this.messageModal);
    }
}
</script>

<template>
    <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <MessageModalComponent ref="messageModal"></MessageModalComponent>
<div class=" vh-100 d-flex justify-content-center align-items-center">
   <v-form class="form" @submit="onSubmit">
        <div class="mb-3">
            <label for="loginUsername" class="form-label">Email address</label>
        <v-field type="email" class="form-control" placeholder="Email address" id="loginUsername" name="email" rules="required|email"></v-field>
        <v-error-message class="text-danger" name="email"></v-error-message>
        </div>
        <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
        <v-field  type="password" class="form-control" placeholder="Password" id="loginPassword" name="password" rules="required|min:8"></v-field>
        <v-error-message class="text-danger" name="password"></v-error-message>
        </div>
       <div class="d-flex justify-content-end">
        <button class="btn btn-primary"> 登入</button>
       </div>
   </v-form>
</div>
</template>