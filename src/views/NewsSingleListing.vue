<script setup lang="ts">
    import { getCurrentInstance, onMounted, ref, reactive } from "vue";
    import api from "@/services/apiService";

    const getAllData = ref([]);

    onMounted(async() => {
        const instance = getCurrentInstance();
        const newsAndEventsId = instance.proxy.$route.params.newsAndEventsId;

        const getNewsData = await api.get(`/NewsAndEvents/${newsAndEventsId}`);
            getAllData.value = getNewsData.data;
            console.log(getAllData.value);
    });
</script>


<template>
    <Header></Header>
        <div class="news-headline">
            <h3 v-html="getAllData.title"></h3>
             <div v-html="getAllData.article"></div>
        </div>
    <Footer></Footer>
</template>

<style> 
    .news-headline {
        margin-top: 5rem;
        padding: 5rem;
        margin-bottom: 10rem;
    }
    
    .news-headline h3 {
        text-align: center;
        margin-bottom: 5rem;
    }
</style>