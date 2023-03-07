<script>
import { RouterLink, RouterView } from 'vue-router';

import MessageModalComponent from "./components/MessageModalComponent.vue";
export default {
  mounted(){
  
  },
  components: {
    MessageModalComponent,
   
  }
}
</script>

<template>
<MessageModalComponent></MessageModalComponent>
  <RouterView />
</template>

<style lang="scss">

@import "./assets/all.scss"
</style>