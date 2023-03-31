<script setup lang="ts">
    import Header from "@/components/Header.vue"
    import Hero from "@/components/Hero.vue"
    import Reviews from "@/components/Reviews.vue"
    import Arrow from "@/components/Arrow.vue"
    import Personnel from "@/components/Personnel.vue"
    import Testimonials from "@/components/Testimonials.vue"
    import { onMounted } from "vue"
    /* import Subscribe from "@/components/Subscribe.vue"
    import Contact from "@/components/Contact.vue" */
    import Main from "@/layouts/Main.vue"
    /* import Loader from "@/components/Loader.vue" */

    onMounted(() => {
        window.scrollTo(0, 0);
    })

</script>

<!-- <script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        mounted() {
          
        }
    });
</script> -->

<template>
    <Header></Header>
    <Hero></Hero>  
    <Main>
        <About></About>
        <Reviews></Reviews>
        <Personnel></Personnel>
        <Testimonials></Testimonials>
       <!--  <Subscribe></Subscribe> -->
       <!--  <Contact></Contact> -->
    </Main>
    <!-- <Loader></Loader> -->
    <Arrow></Arrow>
</template>


