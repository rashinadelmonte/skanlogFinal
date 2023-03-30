<script setup lang="ts">
    import { getCurrentInstance, onMounted, ref, reactive } from "vue";
    import api from "@/services/apiService";
    import { useRouter } from "vue-router";

    const getAllData = ref([]);
    const router = useRouter();

    onMounted(async() => {
        const instance = getCurrentInstance();
        const newsAndEventsId = instance.proxy.$route.params.newsAndEventsId;

        const getNewsData = await api.get(`/NewsAndEvents/${newsAndEventsId}`);
            getAllData.value = getNewsData.data;
            console.log(getAllData.value);
    });

    function goBack () {
        router.go(-1);
    }
</script>
<template>
    <Header></Header>
        <div class="news-headline">
            <button @click="goBack">Back to News</button>
            <h3 v-html="getAllData.title"></h3>
             <div v-html="getAllData.article"></div>
        </div>
    <Footer></Footer>
</template>

<style> 
     .news-headline button {
        background: #3EC1D5 none repeat scroll 0 0;
        border: none;
        color: #fff;
        padding: 10px 35px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        margin-top: 5rem;
        margin-block: 1rem;
    }

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