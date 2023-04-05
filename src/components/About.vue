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
   <div class="container">
    <div class="about-wrapper" data-aos="fade-up">
      <div class="content" v-html="getHistory.content"></div>
    </div>
   </div> 
</template>

<style> 
  .about-wrapper {
    background: #fff;
    margin-top: 5rem;
    padding: 2rem;
  }

  .content {
    line-height: 1.9rem;
  }

</style>