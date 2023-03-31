<script setup lang="ts">
    import { onMounted, nextTick } from 'vue'
    import { loadScript } from "vue-plugin-load-script"
    import { loadMainJS } from "@/assets/assets/js/main.js"
    
    const loadAllScripts = async () => {
      try {
        await loadScript('/src/assets/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')
        console.log("loaded: bundle")

        await loadScript('/src/assets/assets/vendor/glightbox/js/glightbox.min.js')
        console.log("loaded: glightbox")

        await loadScript('/src/assets/assets/vendor/isotope-layout/isotope.pkgd.min.js')
        console.log("loaded: isotope")

        await loadScript('/src/assets/assets/vendor/aos/aos.js')
        console.log("loaded: aos")

        await loadScript('/src/assets/assets/vendor/swiper/swiper-bundle.min.js')
        console.log("loaded: swiper")

        await loadScript('/src/assets/assets/vendor/php-email-form/validate.js')
        console.log("loaded: validate")
        
       
        // await loadScript('/src/assets/assets/js/main.js')
        // console.log("loaded: main")
        
        nextTick(() => {
          console.log('DOM updated!')
          loadMainJS()
        })
      } catch (error) {
        console.log(`Error loading script: ${error}`)
      }
    }

    onMounted(() => {
      loadAllScripts()
    })

</script>

<template>
    <slot/>
    <Footer></Footer>
</template>

<style>
    
    @import 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700|Raleway:300,400,400i,500,500i,700,800,900';
    @import '@/assets/assets/vendor/aos/aos.css';
    @import '@/assets/assets/vendor/animate.css/animate.min.css';
    @import '@/assets/assets/vendor/bootstrap/css/bootstrap.min.css';
    @import '@/assets/assets/vendor/bootstrap-icons/bootstrap-icons.css';
    @import '@/assets/assets/vendor/boxicons/css/boxicons.min.css';
    @import '@/assets/assets/vendor/glightbox/css/glightbox.min.css';
    @import '@/assets/assets/vendor/swiper/swiper-bundle.min.css';
    @import '@/assets/assets/css/style.css';
    
    #header {
        background-color: #1A1F26 !important
    }
</style>
