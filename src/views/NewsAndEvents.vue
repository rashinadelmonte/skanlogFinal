<script setup lang="ts">
    import Header from "@/components/Header.vue"
    import News from "@/components/News.vue"
    import Main from "@/layouts/Main.vue"
    import { onMounted } from "vue";

    onMounted(() => {
    window.scrollTo(0, 0);
    })
</script>
<template>
    <Header></Header>
    <Main>
        <News class="mt-5"></News>
    </Main>
    
</template>

