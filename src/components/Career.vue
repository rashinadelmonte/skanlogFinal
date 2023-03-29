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
   <!--  <div id="career" class="personnel-area area-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="section-headline text-center">
              <h2>Job Listing</h2>
            </div>
          </div>
        </div>
      
        <div class="row career_list">
          <div class="col-md-4">
            <div class="career_description">
              <div></div>
              <h3></h3>
              <p></p>
              
            </div>
          </div>
        </div>
      </div>
    </div> -->
    
    <div class="container">
      <career-list :listOfCareer="listOfCareer"></career-list>
    </div>
    <!-- <div class="careerList" v-html="careerListHTML"></div>  -->
    
    
</template>
