<script setup lang="ts">
    import about1 from "@/assets/assets/img/about/1.jpg";
    import api from "@/services/apiService";
    import { ref, onMounted } from "vue";
 
    const getHistory = ref({
      content: ""
    });

    onMounted(async() => {
      const getData = await api.get('/AboutSkanlog');

      getHistory.value = getData.data[2];
      console.log(getHistory.value);
    });


</script>
<template>
  <div class="center-wrapper">
    <div class="about-wrapper" data-aos="fade-up">
      <div class="content" v-html="getHistory.content"></div>
    </div>
  </div>
   
   
</template>

<style> 
  .about-wrapper {
    background: #fff;
    margin-top: 5rem;
    padding: 3rem;
    width: 70%;
    margin-left: auto; /* Center the element horizontally */
    margin-right: auto; /* Center the element horizontally */
  }

  .content p:nth-child(1) span{
    position: relative;
    top: 2rem;
    font-size: 4rem !important;
   
  }

  .content h1:nth-child(1) span{
    position: relative;
    top: 1rem;
    font-size: 3rem !important;
   
  }

  .content p span {
    font-size: 1.3rem !important;
    font-weight: 500;
    line-height: 2.5rem !important;
  }

  .content h1 span {
    font-size: 1.3rem !important;
    font-weight: 500;
  }

  @media (min-width: 280px) and (max-width: 281px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 2rem;
      width: 105%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }


  @media (min-width: 320px) and (max-width: 321px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 2rem;
      width: 105%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  
  @media (min-width: 375px) and (max-width: 376px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 1.2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 412px) and (max-width: 415px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 1.2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 390px) and (max-width: 395px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 1.2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 360px) and (max-width: 361px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 1.2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 540px) and (max-width: 541px) {
    .center-wrapper {
      padding: 1rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 1.2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    .center-wrapper {
      padding: 2rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 2rem;
      width: 100%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

  @media (min-width: 1280px) and (max-width: 1281px) {
    .center-wrapper {
      padding: 2rem;
    }
    .about-wrapper {
      background: #fff;
      margin-top: 5rem;
      padding: 2rem;
      width: 90%;
    }

    .content p:nth-child(1) span {
      font-size: 2rem !important;
    }

    .content h1:nth-child(1) span{
      position: relative;
      top: -0.1rem;
      font-size: 2rem !important;
    }

    .content p span {
      position: relative;
      top: -1.1rem;
      font-size: 1.1rem !important;
      font-weight: 500;
   
    }

    .content h1 span {
      font-size: 1.3rem !important;
      font-weight: 500;
    }
  }

</style>