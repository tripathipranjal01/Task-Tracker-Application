import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "./store/auth";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:3000"; 

app.use(router);
app.use(store);

app.mount("#app");
