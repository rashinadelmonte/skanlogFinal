<script setup lang="ts">
    import { watch, ref, onMounted, nextTick } from "vue";
    import { loadMainJS } from "@/assets/assets/js/main.js"

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

    onMounted(() => {
        window.scrollTo(0, 0);

        nextTick(() => {
          loadMainJS();
        })
    })

    
    const images = ref([])
    watch(
        () => props.listOfFiles,
        async (value) => {
            images.value = value.map((item:any) => {
                return {
                    ...item,
                    imageList: 'https://localhost:7243/'+item.filePath,
                    fileType: item.fileType
                }
            })
        },
        { immediate: true }, // Fetch the files immediately when the component is mounted

    )
    

    function backToAlbum() {
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
            <button class="back-button" @click="backToAlbum"><span>-Back to Albums</span></button>
          </div>
        </div>
        <div class="row awesome-project-content portfolio-container">
          <div class="col-md-4 col-sm-4 col-xs-12" v-for="image in images" :key="image.galleryId" data-aos="zoom-in" data-aos-delay="100">
            <div class="single-awesome-project">
              <div class="awesome-img">
                <div v-if="image.fileType.startsWith('png')">
                  <a href="#"><img :src="image.imageList" alt="" /></a>
                </div>
                <div v-else-if="image.fileType.startsWith('mp4')">
                  <a href="#">
                    <video class="video">
                      <source :src="image.imageList" type="video/mp4" class="gallery-video">
                    </video>
                  </a>
                </div>
                
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
        </div>
      </div>
    </div>
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

  .video {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
</style>