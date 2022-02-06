import { createApp } from 'vue'
import App from './App.vue'

import ClickOutside from './click-outside'

createApp(App).directive('click-outside', ClickOutside).mount('#app')
