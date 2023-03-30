<script setup lang="ts">
    import api from "@/services/apiService";
    import {  onMounted, reactive, ref } from "vue";
    import CareerList from "@/components/CareerList.vue"

    
    const listOfCareer = ref([]);    

    onMounted(async() => {
      try {
        const careerList = await api.get('/Career');
          listOfCareer.value = careerList.data;
          console.log(listOfCareer.value);
      } catch(error) {
          console.error(error);
      }
    });
</script>
<template>  
    <div class="container">
      <career-list :listOfCareer="listOfCareer"></career-list>
    </div>
    <!-- <div class="careerList" v-html="careerListHTML"></div>  -->
    
    
</template>
