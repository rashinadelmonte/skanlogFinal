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
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        margin-bottom: 1em;
        margin-top: 5rem;
        position: relative;
        left: -3rem;
        top: -3rem;
        padding: 10px 30px;
        font-size: 1.2rem;

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
        font-size: 2rem;
    }

    .article {
        font-size: 1.4rem;
        margin-left: -3rem;
        line-height: 2rem;
        font-weight: 500;
    }

    @media (min-width: 280px) and (max-width: 281px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 10px 10px;
            font-size: 1rem;
            width: 115%;
         }

         .news-headline h3 {
            font-size: 1.1rem;
            margin-bottom: 3rem;
            font-weight: 600;
            column-count: 1;
            width: 110%;
         }

         .article {
            font-size: 1rem;
            width: 191%;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 425px) and (max-width: 426px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 10px 15px;
            font-size: 1rem;
            
         }

         .news-headline h3 {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            font-weight: 600;
            column-count: 1;
         }

         .article {
            font-size: 1rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }


    @media (min-width: 375px) and (max-width: 376px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 20px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            font-weight: 800;
            column-count: 1;
            text-align: center;
         }

         .article {
            font-size: 1rem;
            width: auto;
            line-height: 1.9;
            font-weight: 400;
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 320px) and (max-width: 321px) { 
       .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 20px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            font-weight: 800;
            column-count: 1;
            text-align: center;
         }

         .article p{
            font-size: 1rem;
            line-height: 1.7rem;
            font-weight: 400;
            overflow-wrap: break-word;
         }
    }


    @media (min-width: 390px) and (max-width: 395px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            font-weight: 600;
            width: 110%;
            left: -1rem;
            position: relative;
         }

         .article {
            font-size: 1rem;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 360px) and (max-width: 361px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            font-weight: 600;
            width: 120%;
            position: relative;
            left: -2rem;
         }

         .article {
            font-size: 1rem;
            margin-left: -3rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 412px) and (max-width: 415px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 15px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 540px) and (max-width: 541px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 25px;
            font-size: 1rem;
         }

         .news-headline h3 {
            font-size: 1.9rem;
            margin-bottom: 3rem;
            font-weight: 600;
         }

         .article {
            font-size: 1rem;
            line-height: 1.9;
            font-weight: 500;
            overflow-wrap: break-word;
         }
    }


    @media (min-width: 820px) and (max-width: 821px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 30px;
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
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 768px) and (max-width: 769px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 30px;
            font-size: 1rem;
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
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 912px) and (max-width: 913px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 30px;
            font-size: 1rem;
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
            overflow-wrap: break-word;
         }
    }

    @media (min-width: 1024px) and (max-width: 1025px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 30px;
            font-size: 1rem;
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
            overflow-wrap: break-word;
         }
      }

      @media (min-width: 1280px) and (max-width: 1281px) { 
        .news-headline button {
            position: relative;
            left: -4rem;
            top: -3rem;
            padding: 7px 30px;
            font-size: 1rem;
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
            overflow-wrap: break-word;
         }
    }


   

</style>