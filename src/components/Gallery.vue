<script setup lang="ts">
    import { computed, onMounted, ref, reactive, watch, nextTick } from "vue";
    import api from "@/services/apiService";
    import GalleryMain from "@/components/GalleryMain.vue";
    import { loadMainJS } from "@/assets/assets/js/main.js"

    const isLoading = reactive({ status: true});
    const listOfGallery = ref([]);

    onMounted(async () => {
      try {
        // Fetch the list of galleries
        const responseGallery = await api.get("/Gallery");
        listOfGallery.value = responseGallery.data;
        isLoading.status = false;
        console.log(listOfGallery.value);

        } catch (error) {
          console.error(error);
        }
    });
</script>

<template>
     <div class="loader-line" v-if="isLoading.status"></div>
     <gallery-main v-else :listOfGallery="listOfGallery"></gallery-main>
</template>

<style>
  .gallery-section .container {
    margin-top: 10rem;
    margin-bottom: 10rem;
  }

  .image-grid {
    margin-top: 10rem;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    background-color: #fff;
    z-index: 1;
  }

  .image-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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
</style>

