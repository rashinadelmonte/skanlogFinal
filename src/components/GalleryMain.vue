<script setup lang="ts">
    import { watch, ref, nextTick} from "vue";
    import moment from "moment";
    import api from "@/services/apiService";
    import GalleryList from "@/components/GalleryList.vue";
    import { loadMainJS } from "@/assets/assets/js/main.js"

    const showGrid = ref(false);
    const props = defineProps({
        listOfGallery: {
            type: Object,
            default: []
        }
    });

    const listOfGalleryData = ref([]);

    watch(
        () => props.listOfGallery,
        async (value) => {
            if(value.length > 0) {
                listOfGalleryData.value = await Promise.all(props.listOfGallery.map(async(item:any) => {
                  const domain = 'https://localhost:7243/';
                  const imageResponse = await api.get(`Files/${item.galleryId}`);
                  const filteredImages = imageResponse.data.filter(image => image.fileType === 'png');
                  const imagePath = filteredImages.length > 0 ? filteredImages[0] : null;
                  const isVideo = imagePath && imagePath.fileType === 'mp4';
                  const featuredImage = isVideo ? null : (imagePath ? domain+'Files/'+imagePath.fileName : null);
                    return {
                        ...item,
                        featuredImage: featuredImage,
                        listOfFiles: imageResponse.data,
                        /* fileType: imagePath ? imagePath.fileType : null */
                    };
                }))
                console.log(listOfGalleryData.value)
            }
        },
        { immediate: true } // Fetch the files immediately when the component is mounted
    );

    const titleAlbum = ref("")
    const listOfFilesData = ref([])
    function showGridFunc (title:any,listOfFiles:any) {
        listOfFilesData.value = listOfFiles
        titleAlbum.value = title
        showGrid.value = true
        nextTick(() => {
          console.log('DOM updated!')
          loadMainJS()
        })
    }
    function backToAlbum () {
      showGrid.value = false
    }

</script>

<template>
     <gallery-list :title="titleAlbum" :listOfFiles="listOfFilesData" @back-to-album="backToAlbum" v-if="showGrid"></gallery-list>
    <div id="team" class="our-team-area area-padding" v-else>
      <div class="container">
        <div class="row">
          <div class="col-md-16 col-sm-12 col-xs-12" data-aos="zoom-in" data-aos-delay="100">
            <div class="section-headline text-center">
              <h2>Albums</h2>
            </div>
          </div>
        </div>
        <div class="row gy-5" v-if="listOfGalleryData.length > 0">
          <div class="col-md-3 col-sm-4 col-xs-12" data-aos="zoom-in" data-aos-delay="200" v-for="gallery in listOfGalleryData" :key="gallery.galleryId">
            <div class="single-team-member">
              <div class="team-img" @click.prevent="">
                <a href="#" @click.prevent="showGridFunc(gallery.galleryName,gallery.listOfFiles)">
                  <img :src="gallery.featuredImage" alt="">
                </a>
                <div class="team-social-icon">
                    <a href="#">
                         <li>View More Photos</li>
                    </a>
                </div>
              </div>
              <div class="team-content text-center">
                <h4>{{ gallery.galleryName }}</h4>
                <p>{{ moment(gallery.galleryDate).format("ll") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<style>
    .team-social-icon a li {
        font-size: 1.2rem;
        color: #fff;
        list-style: none;
    }
</style>