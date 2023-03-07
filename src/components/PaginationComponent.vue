<script>
import { RouterLink } from 'vue-router';

 export default {
  data(){
    return {

    }
  },
    props: ["pagination"],
}
</script>

<template>
    <nav aria-label="Page navigation" v-if="pagination">
      
  <ul class="pagination">
    <li class="page-item" :class='{"disabled" :!pagination.has_pre}'>
      <a class="page-link" href="#" @click.prevent="$emit('getpage', pagination.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    
    </li>

    <li class="page-item" v-for="page in pagination.total_pages" :key="'page'+page" :class="{'active': page === pagination.current_page}">
      <a class="page-link" href="#" @click.prevent="$emit('getpage',page)">{{ page }}</a>
    </li>
    
    <li class="page-item" :class='{"disabled" :!pagination.has_next}'>
      <a class="page-link" href="#" @click.prevent="$emit('getpage', pagination.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
    </nav>
</template>