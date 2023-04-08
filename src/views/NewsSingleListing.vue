<script setup lang="ts">
    import { getCurrentInstance, onMounted, ref, reactive, nextTick } from "vue";
    import api from "@/services/apiService";
    import { useRouter } from "vue-router";
    import { loadMainJS } from "@/assets/assets/js/main.js"

    nextTick(() => {
        loadMainJS();
    })

    onMounted(() => {
        window.scrollTo(0, 0);
    })

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
            <div class="article" v-html="getAllData.article"></div>
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
        font-weight: 600;
    }

    .article {
        font-size: 1rem;
        margin-left: -3rem;
        line-height: 1.9;
        font-weight: 500;
    }

    @media (min-width: 280px) and (max-width: 281px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
            width: 111%;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 191%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }


    @media (min-width: 375px) and (max-width: 376px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 320px) and (max-width: 321px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 414px) and (max-width: 415px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 390px) and (max-width: 395px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 360px) and (max-width: 361px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 412px) and (max-width: 415px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 136%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 540px) and (max-width: 541px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            width: 124%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }


    @media (min-width: 820px) and (max-width: 821px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 768px) and (max-width: 769px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

    @media (min-width: 912px) and (max-width: 913px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
         }

         .news-headline h3 {
            font-size: 2rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
         }
    }

   

</style>