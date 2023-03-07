<script>

import adminStore from '../stores/adminStore'
import { mapActions } from 'pinia'


import AlertModalComponent from '../components/AlertModalComponent.vue';
import productModalComponent from '../components/productModalComponent.vue';
import MessageModalComponent from '../components/MessageModalComponent.vue';
import PaginationComponent from '../components/PaginationComponent.vue';

const { VITE_API, VITE_PATH } = import.meta.env
export default {
    data() {
        return {
            products: [],
            pagination: {},
            productModal: {},
            alertModal: {},
            MessageModal: {},
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        AlertModalComponent,
        productModalComponent,
        MessageModalComponent,
        PaginationComponent,
    },
    watch: {
        isLoading(){
            setTimeout(()=> {
                this.isLoading=false
            },500)
        },
    },
    methods: {
        getProducts(page = 1) {
            this.isLoading = true
            this.$http.get(`${VITE_API}api/${VITE_PATH}/admin/products?page=${page}`)
                .then(res => {
                    this.$router.push(`/admin/products/${page}`)
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;

                })
                .catch(err => {
                    this.MessageModal.showMessage("無法取得產品列表")

                })
        },
        delProduct(productId) {
            this.isLoading = true
            this.$http.delete(`${VITE_API}api/${VITE_PATH}/admin/product/${productId}`)
                .then(() => {
                    this.alertModal.hideAlert();
                    this.MessageModal.showMessage("已刪除產品")
                    this.getProducts();
                })
                .catch(() => {
                    this.MessageModal.showMessage("無法刪除產品")

                });

        },
        editProduct(product) {
            this.isLoading = true;
            let method = "post";
            let url = `${VITE_API}/api/${VITE_PATH}/admin/product`
            if(this.temp?.id){
              method = "put";
              url = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.temp.id}`
            }
            this.$http[method](url, { data: product }).then(() => {
                this.productModal.hideProductModal();
                this.getProducts();
            })
                .catch(err => {
                    this.MessageModal.showMessage("無法編輯產品")
                })

        }

    },
    mounted() {
        this.getProducts(this.$route.params.pageid);
        this.productModal = this.$refs.productModal;
        this.alertModal = this.$refs.alertModal;
        this.MessageModal = this.$refs.MessageModal;
    }
}

</script>

<template>
    <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <MessageModalComponent ref="MessageModal"></MessageModalComponent>
    <AlertModalComponent @emit-deldata="delProduct" ref="alertModal"></AlertModalComponent>
    <productModalComponent ref="productModal" :edit-product="editProduct"></productModalComponent>
    <div class="d-flex justify-content-end my-4">
        <button type="button" class="btn btn-primary" @click="productModal.showProductModal()">建立新產品</button>
    </div>
    <table class="table" v-if="products">
        <thead>
            <tr>
                <th>分類</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.category }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.origin_price }}</td>
                <td>{{ product.price }}</td>
                <td :class="{ 'text-success': product.is_enabled }">{{ product.is_enabled ? "啟用" : "未啟用" }}</td>

                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary"
                            @click="productModal.showProductModal(product)">編輯</button>
                        <button type="button" class="btn btn-outline-danger"
                            @click="alertModal.showAlert(product)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="d-flex justify-content-center">
        <PaginationComponent :pagination="pagination" @getpage="getProducts"></PaginationComponent>
    </div>
</template>