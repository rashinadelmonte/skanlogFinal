<script setup lang="ts">
    import api from "@/services/apiService";
    import {  onMounted, reactive, ref } from "vue";
    import CareerList from "@/components/CareerList.vue"


    
    const listOfCareer = ref([]);    
    const isLoading = reactive({ status: true });

    onMounted(async() => {
      try {
        const careerList = await api.get('/Career');
          listOfCareer.value = careerList.data;
          isLoading.status = false;
          console.log(listOfCareer.value);
      } catch(error) {
          console.error(error);
      }
    });
</script>
<template>  
  <div class="loader-line" v-if="isLoading.status"></div>
    <div class="container" v-else>
      <career-list :listOfCareer="listOfCareer"></career-list>
    </div>
    <!-- <div class="careerList" v-html="careerListHTML"></div>  -->
    
    
</template>

<style>

.loader-line {
    width: 100%;
    height: 6px;
    position: relative;
    overflow: hidden;
    background-color: #ddd;
    margin: 85px auto;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 40px;
  }

  .loader-line:before {
    content: "";
    position: absolute;
    left: -50%;
    height: 6px;
    width: 40%;
    background-color: #3ec1d5;
    -webkit-animation: lineAnim 1s linear infinite;
    -moz-animation: lineAnim 1s linear infinite;
    animation: lineAnim 1s linear infinite;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  @keyframes lineAnim {
      0% {
          left: -40%;
      }
      50% {
          left: 20%;
          width: 80%;
      }
      100% {
          left: 100%;
          width: 100%;
      }
  }


</style>
