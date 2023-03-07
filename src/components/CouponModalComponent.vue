<script>
import MessageModalComponent from './MessageModalComponent.vue';
import { Modal } from 'bootstrap';
import { createWebHistory } from 'vue-router';
const { VITE_API, VITE_PATH } = import.meta.env;
export default {
    data() {
        return {
            isLoading: false,
            fullPage: true,
            messageModal: {},
            couponModal: {},
            coupon: {
                is_enabled: false
            },
            dueDate: ""
        }
    },
    watch: {
        isLoading(){
            setTimeout(()=> {
                this.isLoading=false
            },500)
        }
    },
    mounted() {
        this.couponModal = new Modal(this.$refs.couponModal);
        this.messageModal = this.$refs.messageModal;
    },
    methods: {
        showCouponModal(coupon={data: {
                is_enabled: false
            }}) {
            this.coupon = {...coupon}
            if (this.coupon.due_date){
                const transTime = new Date(this.coupon.due_date * 1000).toISOString().split('T')[0];
            this.dueDate = transTime
            }
            this.couponModal.show();
        },
        editCoupon(coupon) {
           this.isLoading = true
           let date = Math.floor(new Date(this.dueDate)/1000)
           this.coupon.due_date=date;
            coupon.is_enabled ? coupon.is_enabled = 1 : coupon.is_enabled = 0;
            let method = "post"
            let url = `${VITE_API}api/${VITE_PATH}/admin/coupon`
            if (this.coupon.id){
                method = "put",
                url = `${VITE_API}api/${VITE_PATH}/admin/coupon/${this.coupon.id}`
            }

            this.$http[method](url, { data:coupon })
                .then(() => {
                    // this.isLoading = false;
                    this.couponModal.hide();
                    this.$emit('getCoupons');
                    setTimeout(()=> {
                        this.messageModal.showMessage("已更新優惠劵")
                    },1000)
                    this.coupon = {
                        is_enabled: false
                    }
                    this.dueDate = ""
                })
                .catch((err) => {
                    this.messageModal.showMessage("無法更新優惠劵")
                    // this.couponModal.hide();
                })
        }
    },
    components: {
        MessageModalComponent
    },
    emits: ["getCoupons"]
}

</script>

<template>
    <loading v-model:active="isLoading"
                 :is-full-page="fullPage"/>
    <MessageModalComponent ref="messageModal"></MessageModalComponent>
    <div class="modal" tabindex="-1" ref="couponModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span v-if="coupon.id">編輯優惠卷</span><span v-else>新增優惠卷</span> </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <v-form @submit="editCoupon(coupon)">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="couponTitle" class="form-label">標題</label>
                            <v-field type="text" id="couponTitle" name="標題" class="form-control" placeholder="請輸入標題"
                                v-model="coupon.title" rules="required"></v-field>
                            <v-error-message class="text-danger" name="標題"></v-error-message>
                        </div>
                        <div class="mb-3">
                            <label for="couponCode">優惠碼</label>
                            <v-field type="text" id="couponCode" name="優惠碼" class="form-control" placeholder="請輸入優惠碼"
                                v-model="coupon.code" rules="required"></v-field>
                            <v-error-message class="text-danger" name="優惠碼"></v-error-message>
                        </div>

                        <div class="mb-3">
                            <label for="couponDue" class="form-label">到期日</label>
                            <v-field id="couponDue" name="到期日" class="form-control" placeholder="請輸入到期日"
                                v-model="dueDate" type="date" rules="required" ></v-field>
                            <v-error-message class="text-danger" name="到期日"></v-error-message>
                        </div>
                        <div class="mb-3">
                            <label for="couponPercent" class="form-label">折扣百分比</label>
                            <v-field type="number" id="couponPercent" name="折扣百分比" class="form-control"
                                placeholder="請輸入折扣百分比" v-model.number="coupon.percent" min="1" max="99"
                                rules="required|max_value:100|min_value: 1"></v-field>
                            <v-error-message class="text-danger" name="折扣百分比"></v-error-message>
                        </div>
                        <div class="mb-3">

                            <input type="checkbox" id="couponStatus" name="" class="form-check-input me-2"
                                placeholder="請輸入是否啟用" v-model="coupon.is_enabled" />
                            <label for="couponStatus" class="form-label">是否啟用</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button class="btn btn-primary"> <span v-if="coupon.id">編輯優惠劵</span> <span v-else>新增優惠劵</span></button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>