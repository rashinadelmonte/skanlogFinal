<script setup lang="ts">
    import { computed, onMounted, ref, reactive, watch, nextTick } from "vue";
    import api from "@/services/apiService";
    import GalleryMain from "@/components/GalleryMain.vue";


    const listOfGallery = ref([]);

    onMounted(async () => {
      try {
        // Fetch the list of galleries
        const responseGallery = await api.get("/Gallery");
        listOfGallery.value = responseGallery.data;
        console.log(listOfGallery.value);

        } catch (error) {
          console.error(error);
        }
    });
</script>

<template>
     <gallery-main :listOfGallery="listOfGallery"></gallery-main>
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
</style>

