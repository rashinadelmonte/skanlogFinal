<script setup lang="ts">
    import { watch,ref, onMounted, nextTick } from "vue";

    const props = defineProps({
        title: {
            type: String,
            default: ""
        },
        listOfFiles: {
            type: Object,
            default: Array
        }
    })
    
    const images = ref([])
    watch(
        () => props.listOfFiles,
        async (value) => {
            images.value = value.map((item:any) => {
                return {
                    ...item,
                    imageList: 'https://localhost:7243/Files/'+item.fileName
                }
            })
        },
        { immediate: true }, // Fetch the files immediately when the component is mounted

    )
    

    const backToAlbum = () => {
        emit('back-to-album')
    }
    const emit = defineEmits(["back-to-album"])
</script>
<template>
    <!-- ======= Portfolio Section ======= -->
    <div id="portfolio" class="portfolio-area area-padding fix" v-if="listOfFiles.length > 0">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="section-headline text-center">
              <h2>{{ title }}</h2>
            </div>
            <button class="back-button" @click="backToAlbum"><span>-Back to Gallery</span></button>
          </div>
        </div>
        <div class="row awesome-project-content portfolio-container">
          <!-- portfolio-item start -->
          <div class="col-md-4 col-sm-4 col-xs-12 portfolio-item filter-app portfolio-item" v-for="image in images" :key="image.galleryId">
            <div class="single-awesome-project">
              <div class="awesome-img">
                <a href="#"><img :src="image.imageList" alt="" /></a>
                <div class="add-actions text-center">
                  <div class="project-dec">
                    <a class="portfolio-lightbox" data-gallery="myGallery" :href="image.imageList">
                      <h4>Business City</h4>
                      <span>Web Development</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- portfolio-item end -->
        </div>
      </div>
    </div><!-- End Portfolio Section -->
</template>


<style>
  .back-button {
    border: none;
    background: #3ec1d5;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out; 
    transform: translateY(0)
  }

  .back-button:hover {
    transform: translateX(-1rem);
  }
</style>