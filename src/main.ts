import { createApp } from 'vue'
import router from '@/routes'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { isEqual as fastDeepEqual } from 'fast-deep-equal';


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDwZJVgyzP4sGjWADYw_UO2PaXfN6Gq4qg",
      libraries: "places",
    },
  /*   installComponents: true,
    autobindAllEvents: false,
    isNumber: false,
    apiVersion: '3',
    rectAutocomplete: { bounds: {}, strictBounds: false, componentRestrictions: {} },
    locationAutocomplete: { types: [], componentRestrictions: {} },
    onBeforeLoad: undefined,
    onAfterLoad: undefined,
    onBeforeMount: undefined,
    onAfterMount: undefined,
    onBeforeUnmount: undefined,
    onAfterUnmount: undefined,
    onBeforeUpdate: undefined,
    onAfterUpdate: undefined,
    onBeforeResize: undefined,
    onAfterResize: undefined,
    onBeforeRecenter: undefined,
    onAfterRecenter: undefined,
    customMarkerIcon: undefined,
    customClusterIcon: undefined,
    customLabel: undefined, */
    fastDeepEqual: fastDeepEqual // Pass the function here
  })
app.mount('#app')