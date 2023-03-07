<script>
import adminStore from '../stores/adminStore';
import CouponModalComponent from '../components/CouponModalComponent.vue';
import MessageModalComponent from '../components/MessageModalComponent.vue';
import AlertModalComponent from '../components/AlertModalComponent.vue';
import { mapActions } from 'pinia';
const { VITE_API, VITE_PATH } = import.meta.env;
export default {
    data(){
        return {
            isLoading: false,
            fullPage: true,
            messageModal: {},
            alertModal: {},
            couponModal: {},
            coupons: {},
        }
    },
    components: {
        CouponModalComponent,
        MessageModalComponent,
        AlertModalComponent
    },
    watch: {
        isLoading(){
            setTimeout(()=> {
                this.isLoading = false
            },1000)
        }
    },
    mounted(){
        this.couponModal = this.$refs.couponModal;
        this.messageModal = this.$refs.messageModal
        this.alertModal = this.$refs.alertModal
        this.getCoupons();
    },
    methods: {
        ...mapActions(adminStore, ["getDate"]),
        getCoupons(){
            this.isLoading = true
            this.$http.get(`${VITE_API}api/${VITE_PATH}/admin/coupons`)
            .then((res)=> {
                this.coupons = {...res.data.coupons}
                this.messageModal.showMessage("取得優惠券列表")
            })
            .catch(()=>{
                this.messageModal.showMessage("無法取得優惠券列表")
            })

        },
        delCoupon(couponId){
            this.isLoading = true
            this.$http.delete(`${VITE_API}api/${VITE_PATH}/admin/coupon/${couponId}`)
            .then(res=> {
                this.alertModal.hideAlert();
                this.getCoupons();
                this.messageModal.showMessage("已刪除優惠券")
            })
            .catch(err => {
                this.messageModal.showMessage("無法刪除優惠券")
            })
        }
    }
}
</script>

<template>
     <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <AlertModalComponent ref="alertModal" @emit-deldata="delCoupon"></AlertModalComponent>
    <MessageModalComponent ref="messageModal"></MessageModalComponent>
    <CouponModalComponent ref="couponModal" @get-coupons="getCoupons"></CouponModalComponent>
   <div class="d-flex justify-content-end">
    <button type="button" class="btn btn-primary my-4" @click="couponModal.showCouponModal()">建立新的優惠券</button>
   </div>
   <table class="table" >
    <thead>
        <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.percent }} %</td>
            <td>{{ getDate( coupon.due_date)  }}</td>
            <td :class="{'text-success': coupon.is_enabled}">{{ coupon.is_enabled? "啟用": "未啟用" }}</td>
            <td>
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-primary" @click="couponModal.showCouponModal(coupon)">編輯</button>
                    <button type="button" class="btn btn-outline-danger" @click="this.alertModal.showAlert(coupon)">刪除</button>
                </div>
            </td>
        </tr>
    </tbody>
   </table>

</template>