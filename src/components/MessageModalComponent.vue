<script>
import adminStore from "../stores/adminStore.js"

import { mapActions,mapState } from "pinia";

import { Modal } from "bootstrap";

export default {
    data(){
        return {
            message: "",
            messageModal: {}
        }
    },
    methods: {
      showMessage(msg){
            this.message = msg
            this.messageModal.show();
            setTimeout(()=> {
                this.messageModal.hide();
                this.message = ""
            },1000)
        },
    },
    mounted(){
        this.messageModal = new Modal(this.$refs.messageModal);
    }
}

</script>

<template>
<div class="modal" tabindex="-1" ref="messageModal">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <p class="modal-title">{{ message }}</p>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    </div>
  </div>
</div>

</template>