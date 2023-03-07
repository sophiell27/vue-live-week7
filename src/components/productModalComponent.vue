<script>
import adminStore from '../stores/adminStore'
import { mapActions } from 'pinia'
import { Modal } from 'bootstrap'
import axios from 'axios'
const { VITE_API, VITE_PATH } = import.meta.env

export default {
    data(){
        return {
          loadingItem: "",
          productModal: {},
          temp: {
            imagesUrl: [""]
          },
        }
    },
    methods: {
      // ...mapActions(adminStore, ["loading"]),
    showProductModal(product={
            imagesUrl: [""]
          }){
        this.temp = {...product}
        this.productModal.show();
    },
    hideProductModal(){
      this.productModal.hide();
      this.temp = {
            imagesUrl: [""]
          }
    },
    delImg(){
      if (confirm("是否確定刪除圖片？")){
        this.temp.imageUrl = "";
      }
    },
    uploadFile(refindex) {
      let file;
      if (refindex === "filtINput") {
        file = this.$refs[refindex].files[0];
      } else {
        file = this.$refs[refindex][0].files[0];
      }
      const formData = new FormData();
      formData.append("file-to-upload", file);

      if (confirm("是否確定上傳檔案？")) {
        axios
          .post(`${VITE_API}api/${VITE_PATH}/admin/upload`, formData)
          .then((res) => {
            if ((refindex === "filtINput")) {
              this.temp.imageUrl = res.data.imageUrl;
            } else {
                this.temp.imagesUrl[this.temp.imagesUrl.length - 1] =
                  res.data.imageUrl;
                  console.log(this.temp.imagesUrl)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    loading(){
      const loader = this.$loading.show();
      this.loadingItem = "loading"
      setTimeout(()=> {
        loader.hide();
        this.loadingItem = ""
      },500)
    }
    },
    mounted(){
       this.productModal = new Modal(this.$refs.productModal)
       
    },
    props: [ "editProduct"]

}
</script>

<template>
    <div class="modal" tabindex="-1" ref="productModal">
      <div class="modal-dialog modal-xl">
    <v-form class="modal-content" @submit="editProduct(temp)">
      <div class="modal-header bg-dark text-white"> 
        <h5 class="modal-title"><span v-if="!temp.id">新增產品</span> <span v-else>編輯產品</span> </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row" g-2>
          <div class="col-4">
        
              
           <div class="mb-5">
           <label class="form-label" for="mainImg">主要圖片</label>
           <img :src="temp.imageUrl" alt="" class="img-fluid mb-2"/>
           <button type='button' class="btn btn-outline-danger mb-3 w-100"   @click="delImg" v-if="temp.imageUrl">刪除圖片</button >
           <input type="file" class="form-control " id="mainImg" @change="uploadFile('filtINput')" ref="filtINput" v-else>
           </div>
           

            <p class="mb-3">細節圖片</p>
             <div class="mb-2" v-for="(item,index) in temp.imagesUrl" :key="'img'+index">
                <template v-if="item.length === 0">
                <input type="file" class="form-control " id="spareImg" @change="uploadFile('spareInput')" ref="spareInput">
                </template>
                <img :src="temp.imagesUrl[index]" alt="" class="img-fluid mb-1"/>
                <button type='button' class="btn btn-outline-danger mb-3 w-100"   @click="temp.imagesUrl.splice(index,1)" v-if="temp.imagesUrl[index].length">刪除圖片</button >
             </div>
             
            <template v-if="Array.isArray(temp.imagesUrl)"> 
            <button type="button" class="btn btn-outline-primary" @click="temp.imagesUrl.push('')" v-if="temp.imagesUrl.length === 0  || temp.imagesUrl[temp.imagesUrl.length-1]">新增圖片</button>
            </template>
             </div>

          <div class="col-8">
              <div class="row">
                
                <div class="mb-3">
                    <label for="productTitle" class="form-label">標題</label>
                    <v-field type="text" id='productTitle' class="form-control" placeholder="請輸入標題" v-model="temp.title" name="標題" rules="required"></v-field>
                    <v-error-message name="標題" class="text-danger"></v-error-message>

                </div>

                <div class="mb-3 col-md-6">
                    <label for="productCat" class="form-label">分類</label>
                    <v-field type="text" id='productCat' class="form-control" placeholder="請輸入分類" v-model="temp.category" name="分類" rules="required"></v-field>
                    <v-error-message name="分類" class="text-danger"></v-error-message>
                </div>

                <div class="mb-3 col-md-6">
                    <label for="productUnit" class="form-label">單位</label>
                    <v-field type="text" id='productUnit' class="form-control" placeholder="請輸入單位" v-model="temp.unit" name="單位" rules="required"></v-field>
                    <v-error-message name="單位" class="text-danger"></v-error-message>
                </div>


                <div class="mb-3 col-md-6">
                    <label for="productOriginPrice" class="form-label">原價</label>
                    <v-field type="number" id='productOriginPrice' class="form-control" placeholder="請輸入原價" v-model.number="temp.origin_price" name="原價" rules="required|min_value:1" min="1"></v-field>
                    <v-error-message name="原價" class="text-danger"></v-error-message>
                </div>

                <div class="mb-3 col-md-6">
                    <label for="productPrice" class="form-label">售價</label>
                    <v-field type="number"  id='productPrice' class="form-control" placeholder="請輸入售價" v-model.number="temp.price" name="售價" rules="required|min_value:1" min="1"> </v-field>
                    <v-error-message name="售價" class="text-danger"></v-error-message>
                </div>

                <div class="mb-3">
                    <label for="productDesc" class="form-label">產品描述</label>
                    <textarea type="text" id='productDesc' class="form-control" placeholder="請輸入產品描述" v-model="temp.description"></textarea>
                </div>

                <div class="mb-3">
                    <label for="productContent" class="form-label">說明內容</label>
                    <textarea type="text" id='productContent' class="form-control" placeholder="請輸入說明內容" v-model="temp.content"></textarea>
                </div>
                <div class="mb-3">
                    <input type="checkbox" id='productEnable' class="form-check-input me-2" v-model="temp.is_enabled">
                    <label for="productEnable" class="form-label">是否啟用</label>
                </div>
              </div>
          </div>
          
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button class="btn btn-primary" :disabled="loadingItem.length">確認</button>
      </div>
    </v-form>
  </div>
  </div>
    
</template>