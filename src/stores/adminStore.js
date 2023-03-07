import { defineStore} from "pinia";

import axios from 'axios'
import router from "../router";
import { LoadingPlugin } from "vue-loading-overlay";



const { VITE_API, VITE_PATH } = import.meta.env

export default defineStore("adminStore", {
    state: ()=> ({
    }),
    actions: {
        getDate(time) {
            const newTime = new Date(time * 1000)
            const day = newTime.getDate();
            const month = newTime.getMonth() + 1;
            const year = newTime.getFullYear();
            return `${day}/${month}/${year}`
        },
    }
})