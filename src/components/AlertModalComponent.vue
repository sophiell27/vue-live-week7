<script>
import adminStore from "../stores/adminStore.js"

import { mapActions } from "pinia"

import { Modal } from 'bootstrap'

export default {
    data(){
        return {
          alertModal: {},
          data: {},
        }
    },
    methods: {
      showAlert(data,action){
            this.data = data;
            this.alertModal.show();
        },
        hideAlert(){
            this.alertModal.hide();
            this.data = {};
        },
    },
    mounted(){
        this.alertModal = new Modal(this.$refs.alertModal);
    }
}

</script>

<template>
<div class="modal" tabindex="-1" ref="alertModal">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger thext-white ">
        <h6 class="modal-title" v-if="data.create_at">刪除訂單{{data.id}}</h6>
        <h6 class="modal-title" v-else-if="data.code">刪除優惠券{{data.title}}</h6>
        <h6 class="modal-title" v-else>刪除 {{data.title}}</h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p >
           <span v-if="data.create_at">是否刪除訂單 {{ data.id}} ? </span>
           <span v-else-if="data.code">是否刪除優惠券 {{ data.title}} ? </span> 
           <span v-else>是否刪除 {{ data.title}} ? </span> 
           
          <br><span class="text-danger">(刪除後將無法恢復)。</span>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="{$emit('emit-deldata', data.id);}">確認刪除</button>
      </div>
    </div>
  </div>
</div>

</template>