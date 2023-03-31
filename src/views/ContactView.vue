<script setup lang="ts">
    import Header from "@/components/Header.vue"
    import Main from "@/layouts/Main.vue"
    import { onMounted } from "vue";

    onMounted(() => {
        window.scrollTo(0, 0);
    })

</script>

<template>
    <Header></Header>
    <Main>
        <Contact></Contact>
    </Main>
</template>