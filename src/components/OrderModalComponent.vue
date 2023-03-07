<script>
import { Modal } from 'bootstrap';
export default {
    data() {
        return {
            orderModal: {},
            order: {}
        }
    },
    methods: {
        showOrderModal(order) {
            this.order = { ...order }
            this.orderModal.show();
        },
        hideOrderModal(){
            this.orderModal.hide();
            this.order = {};
        }
    },
    mounted() {
        this.orderModal = new Modal(this.$refs.orderModal)
    },
    props: ["getDate"],
    emits: ["change-order"]
}
</script>

<template>
    <div class="modal" tabindex="-1" ref="orderModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">訂單細節</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="order.id">
                    <div class="row">
                        <div class="col-lg-4 ">
                            <h2>用戶資料</h2>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th>姓名</th>
                                        <td>{{ order.user.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{{ order.user.email }}</td>
                                    </tr>
                                    <tr>
                                        <th>電話</th>
                                        <td>{{ order.user.tel }}</td>
                                    </tr>
                                    <tr>
                                        <th>地址</th>
                                        <td>{{ order.user.address }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-lg-8">
                            <h2 class="mb-3">訂單細節</h2>
                            <table class="table mb-4">
                                <tbody>
                                    <tr>
                                        <th>訂單編號</th>
                                        <td>{{ order.id }}</td>
                                    </tr>
                                    <tr>
                                        <th>下單時間</th>
                                        <td>{{ getDate(order.create_at) }}</td>
                                    </tr>
                                    <tr>
                                        <th>付款時間</th>
                                        <td>{{ order.is_paid ? getDate(order.create_at) : "N/A" }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>付款狀態</th>
                                        <td>{{ order.is_paid ? "已付款" : "未付款" }}</td>
                                    </tr>
                                    <tr>
                                        <th>總金額</th>
                                        <td>{{ order.total }}</td>
                                    </tr>

                                </tbody>
                            </table>
                            <h2 class="mb-3">選購商品</h2>
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th>姓名</th>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>
                            <input type="checkbox" id="paystatus" class="form-checkinput me-2" v-model="order.is_paid"
                                :value="order.is_paid">
                            <label for="paystatus">{{ order.is_paid ? "已付款" : "未付款" }}</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="$emit('change-order', order)">修改付款狀態</button>
                </div>
            </div>
        </div>
    </div>
</template>