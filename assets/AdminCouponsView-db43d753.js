import{_ as y,h as D,M as w,a as i,o as d,c as u,b as t,d as e,w as T,i as A,v as x,F as M,m as E,j as k,k as P,t as _,p as I}from"./index-62ca245e.js";import{A as L}from"./AlertModalComponent-d4f00c71.js";const{VITE_API:b,VITE_PATH:v}={VITE_API:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"sophiee22",BASE_URL:"/vue-live-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},$={data(){return{isLoading:!1,fullPage:!0,messageModal:{},couponModal:{},coupon:{is_enabled:!1},dueDate:""}},watch:{isLoading(){setTimeout(()=>{this.isLoading=!1},500)}},mounted(){this.couponModal=new D(this.$refs.couponModal),this.messageModal=this.$refs.messageModal},methods:{showCouponModal(l={data:{is_enabled:!1}}){if(this.coupon={...l},this.coupon.due_date){const o=new Date(this.coupon.due_date*1e3).toISOString().split("T")[0];this.dueDate=o}this.couponModal.show()},editCoupon(l){this.isLoading=!0;let o=Math.floor(new Date(this.dueDate)/1e3);this.coupon.due_date=o,l.is_enabled?l.is_enabled=1:l.is_enabled=0;let r="post",m=`${b}api/${v}/admin/coupon`;this.coupon.id&&(r="put",m=`${b}api/${v}/admin/coupon/${this.coupon.id}`),this.$http[r](m,{data:l}).then(()=>{this.couponModal.hide(),this.$emit("getCoupons"),setTimeout(()=>{this.messageModal.showMessage("已更新優惠劵")},1e3),this.coupon={is_enabled:!1},this.dueDate=""}).catch(s=>{this.messageModal.showMessage("無法更新優惠劵")})}},components:{MessageModalComponent:w},emits:["getCoupons"]},S={class:"modal",tabindex:"-1",ref:"couponModal"},U={class:"modal-dialog"},R={class:"modal-content"},B={class:"modal-header"},H={class:"modal-title"},O={key:0},q={key:1},j=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),F={class:"modal-body"},G={class:"mb-3"},N=e("label",{for:"couponTitle",class:"form-label"},"標題",-1),z={class:"mb-3"},J=e("label",{for:"couponCode"},"優惠碼",-1),K={class:"mb-3"},Q=e("label",{for:"couponDue",class:"form-label"},"到期日",-1),W={class:"mb-3"},X=e("label",{for:"couponPercent",class:"form-label"},"折扣百分比",-1),Y={class:"mb-3"},Z=e("label",{for:"couponStatus",class:"form-label"},"是否啟用",-1),ee={class:"modal-footer"},oe=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消",-1),se={class:"btn btn-primary"},te={key:0},ne={key:1};function le(l,o,r,m,s,h){const g=i("loading"),f=i("MessageModalComponent"),c=i("v-field"),p=i("v-error-message"),a=i("v-form");return d(),u(M,null,[t(g,{active:s.isLoading,"onUpdate:active":o[0]||(o[0]=n=>s.isLoading=n),"is-full-page":s.fullPage},null,8,["active","is-full-page"]),t(f,{ref:"messageModal"},null,512),e("div",S,[e("div",U,[e("div",R,[e("div",B,[e("h5",H,[s.coupon.id?(d(),u("span",O,"編輯優惠卷")):(d(),u("span",q,"新增優惠卷"))]),j]),t(a,{onSubmit:o[6]||(o[6]=n=>h.editCoupon(s.coupon))},{default:T(()=>[e("div",F,[e("div",G,[N,t(c,{type:"text",id:"couponTitle",name:"標題",class:"form-control",placeholder:"請輸入標題",modelValue:s.coupon.title,"onUpdate:modelValue":o[1]||(o[1]=n=>s.coupon.title=n),rules:"required"},null,8,["modelValue"]),t(p,{class:"text-danger",name:"標題"})]),e("div",z,[J,t(c,{type:"text",id:"couponCode",name:"優惠碼",class:"form-control",placeholder:"請輸入優惠碼",modelValue:s.coupon.code,"onUpdate:modelValue":o[2]||(o[2]=n=>s.coupon.code=n),rules:"required"},null,8,["modelValue"]),t(p,{class:"text-danger",name:"優惠碼"})]),e("div",K,[Q,t(c,{id:"couponDue",name:"到期日",class:"form-control",placeholder:"請輸入到期日",modelValue:s.dueDate,"onUpdate:modelValue":o[3]||(o[3]=n=>s.dueDate=n),type:"date",rules:"required"},null,8,["modelValue"]),t(p,{class:"text-danger",name:"到期日"})]),e("div",W,[X,t(c,{type:"number",id:"couponPercent",name:"折扣百分比",class:"form-control",placeholder:"請輸入折扣百分比",modelValue:s.coupon.percent,"onUpdate:modelValue":o[4]||(o[4]=n=>s.coupon.percent=n),modelModifiers:{number:!0},min:"1",max:"99",rules:"required|max_value:100|min_value: 1"},null,8,["modelValue"]),t(p,{class:"text-danger",name:"折扣百分比"})]),e("div",Y,[A(e("input",{type:"checkbox",id:"couponStatus",name:"",class:"form-check-input me-2",placeholder:"請輸入是否啟用","onUpdate:modelValue":o[5]||(o[5]=n=>s.coupon.is_enabled=n)},null,512),[[x,s.coupon.is_enabled]]),Z])]),e("div",ee,[oe,e("button",se,[s.coupon.id?(d(),u("span",te,"編輯優惠劵")):(d(),u("span",ne,"新增優惠劵"))])])]),_:1})])])],512)],64)}const ae=y($,[["render",le]]),{VITE_API:C,VITE_PATH:V}={VITE_API:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"sophiee22",BASE_URL:"/vue-live-week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},ie={data(){return{isLoading:!1,fullPage:!0,messageModal:{},alertModal:{},couponModal:{},coupons:{}}},components:{CouponModalComponent:ae,MessageModalComponent:w,AlertModalComponent:L},watch:{isLoading(){setTimeout(()=>{this.isLoading=!1},1e3)}},mounted(){this.couponModal=this.$refs.couponModal,this.messageModal=this.$refs.messageModal,this.alertModal=this.$refs.alertModal,this.getCoupons()},methods:{...E(P,["getDate"]),getCoupons(){this.isLoading=!0,this.$http.get(`${C}api/${V}/admin/coupons`).then(l=>{this.coupons={...l.data.coupons},this.messageModal.showMessage("取得優惠券列表")}).catch(()=>{this.messageModal.showMessage("無法取得優惠券列表")})},delCoupon(l){this.isLoading=!0,this.$http.delete(`${C}api/${V}/admin/coupon/${l}`).then(o=>{this.alertModal.hideAlert(),this.getCoupons(),this.messageModal.showMessage("已刪除優惠券")}).catch(o=>{this.messageModal.showMessage("無法刪除優惠券")})}}},de={class:"d-flex justify-content-end"},ue={class:"table"},ce=e("thead",null,[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",null,"是否啟用"),e("th",null,"編輯")])],-1),pe={class:"btn-group"},re=["onClick"],me=["onClick"];function he(l,o,r,m,s,h){const g=i("loading"),f=i("AlertModalComponent"),c=i("MessageModalComponent"),p=i("CouponModalComponent");return d(),u(M,null,[t(g,{active:s.isLoading,"onUpdate:active":o[0]||(o[0]=a=>s.isLoading=a),"is-full-page":s.fullPage},null,8,["active","is-full-page"]),t(f,{ref:"alertModal",onEmitDeldata:h.delCoupon},null,8,["onEmitDeldata"]),t(c,{ref:"messageModal"},null,512),t(p,{ref:"couponModal",onGetCoupons:h.getCoupons},null,8,["onGetCoupons"]),e("div",de,[e("button",{type:"button",class:"btn btn-primary my-4",onClick:o[1]||(o[1]=a=>s.couponModal.showCouponModal())},"建立新的優惠券")]),e("table",ue,[ce,e("tbody",null,[(d(!0),u(M,null,k(s.coupons,a=>(d(),u("tr",{key:a.id},[e("td",null,_(a.title),1),e("td",null,_(a.percent)+" %",1),e("td",null,_(l.getDate(a.due_date)),1),e("td",{class:I({"text-success":a.is_enabled})},_(a.is_enabled?"啟用":"未啟用"),3),e("td",null,[e("div",pe,[e("button",{type:"button",class:"btn btn-outline-primary",onClick:n=>s.couponModal.showCouponModal(a)},"編輯",8,re),e("button",{type:"button",class:"btn btn-outline-danger",onClick:n=>this.alertModal.showAlert(a)},"刪除",8,me)])])]))),128))])])],64)}const fe=y(ie,[["render",he]]);export{fe as default};