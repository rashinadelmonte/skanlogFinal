<script setup lang="ts">
    import Header from "@/components/Header.vue"
    import Career from "@/components/Career.vue"
    import Main from "@/layouts/Main.vue"
    import { onMounted } from "vue";

    onMounted(() => {
        window.scrollTo(0, 0);
    })
</script>

<template>
    <Header></Header>
    <Main>
        <Career></Career>
    </Main>
</template>