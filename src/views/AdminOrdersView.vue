<script>
import adminStore from '../stores/adminStore';
import { mapActions } from 'pinia';
import PaginationComponent from '../components/PaginationComponent.vue';

import OrderModalComponent from '../components/OrderModalComponent.vue';
import MessageModalComponent from '../components/MessageModalComponent.vue';
import AlertModalComponent from '../components/AlertModalComponent.vue';

const { VITE_API, VITE_PATH } = import.meta.env;
export default {
    data() {
        return {
            orders: [],
            orderPagination: {},
            orderModal: {},
            messageModal: {},
            alertModal: {},
            isLoading: false,
            fullPage: true

        }
    },
    watch: {
        isLoading(){
            setTimeout(()=> {
                this.isLoading=false
            },500)
        }
    },
    methods: {
        ...mapActions(adminStore, ["getDate"]),
        getorders(page=1) {
            this.isLoading = true
            this.$http.get(`${VITE_API}api/${VITE_PATH}/admin/orders?page=${page}`)
                .then(res => {
                    
                    this.orders = res.data.orders
                    this.orderPagination = res.data.pagination;
                    this.$router.push(`/admin/orders/${page}`)
                    // console.log(this.orders);
                })
                .catch(() => {
                    return false
                })
        },
        
        changeStatus(){
            order.is_paid = !order.is_paid;
        },
        changeOrder(order){
            this.isLoading = true;
            this.$http.put(`${VITE_API}api/${VITE_PATH}/admin/order/${order.id}`, {data:order})
            .then(res => {
                this.orderModal.hideOrderModal();
                this.messageModal.showMessage("成功更改付款狀態")
                this.getorders();
                
            })
            .catch(err => {
                this.messageModal.showMessage("無法更改付款狀態")
            })
        },
        delOrder(orderId){
            this.isLoading = true;
            this.$http.delete(`${VITE_API}api/${VITE_PATH}/admin/order/${orderId}`)
            .then(()=> {
                this.alertModal.hideAlert();
                this.messageModal.showMessage("已刪除訂單");
                this.getorders();
            })
            .catch(err => {
                this.messageModal.showMessage("無法刪除訂單")
            })
        }
    },
    components: {
        MessageModalComponent,
        PaginationComponent,
        AlertModalComponent,
        OrderModalComponent
    },
    // watch: {
    //     $route(n,o){
    //         this.getorders(n.params.orderpageid);
    //     }
    // },
    mounted(){
        this.getorders(this.$route.params.orderpageid);
        this.orderModal = this.$refs.orderModal;
        this.messageModal = this.$refs.messageModal;
        this.alertModal = this.$refs.alertModal;
    }
}

</script>

<template>
     <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <MessageModalComponent ref="messageModal"></MessageModalComponent>
    <OrderModalComponent ref="orderModal" :get-date="getDate" @change-order="changeOrder"></OrderModalComponent>
    <AlertModalComponent ref="alertModal" @emit-deldata="delOrder"></AlertModalComponent>
    <p class="text-danger" v-if="!orders.length">沒有任何訂單</p>
    <table class="table" v-else>
        <thead>
            <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額 </th>
                <th>是否付款</th>
                <th>編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders">
                <td>{{ getDate(order.create_at) }}</td>
                <td>{{ order.user.email }}</td>
                <td>
                    <p v-for="product in order.products">{{ product.product.title }} / {{ product.qty }}</p>
                </td>
                <td>$ {{ order.total }}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="orderPay" v-model="order.is_paid" @change="changeOrder(order)">
                        <label class="form-check-label" for="orderPay">{{order.is_paid? "已付款": "末付款"}}</label>
                    </div>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary" @click="orderModal.showOrderModal(order)">檢視</button>
                        <button type="button" class="btn btn-outline-danger" @click="alertModal.showAlert(order)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-center">
       <PaginationComponent :pagination="orderPagination" @getpage="getorders"></PaginationComponent>
    </div>
</template>