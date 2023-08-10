import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './configs/router';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

const pinia = createPinia();

createApp(App).use(pinia).use(autoAnimatePlugin).use(router).mount('#app');
