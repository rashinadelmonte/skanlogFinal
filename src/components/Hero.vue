<script setup lang="ts">
    import carouse1 from "@/assets/assets/img/hero-carousel/1.jpg"
    import carouse2 from "@/assets/assets/img/hero-carousel/2.jpg"
    import carouse3 from "@/assets/assets/img/hero-carousel/3.jpg"
    import { watch, ref, onMounted, nextTick } from "vue";
    import api from "@/services/apiService";
    import { loadMainJS } from "@/assets/assets/js/main.js";


    const listOfMedia = ref([]);
    const fileType = ref('');

    onMounted(async () => {
      try {
        // Fetch the list of galleries
        const responseGallery = await api.get("/MediaSliderManager");
        listOfMedia.value = responseGallery.data;
        console.log(listOfMedia.value);

    
       /*  fileType.value = listOfMedia.value[0].fileType; */

       
    
       
        } catch (error) {
          console.error(error);
        }
    });

   


    

</script>
<template>
    <!-- ======= hero Section ======= -->
  <section id="hero">
    <div class="hero-container">
      <div 
        id="heroCarousel" 
        class="carousel slide carousel-fade"
        data-bs-ride="carousel" 
        :data-bs-interval="fileType.startsWith('png') ? 500 : 16000"> 

    <!--   <ol id="hero-carousel-indicators" class="carousel-indicators"></ol> -->
      
        <div class="carousel-inner" role="listbox">
          <!-- <div 
            v-for="(media, index) in listOfMedia" :key="media"
            :class="{'carousel-item': true, 'active': index === 0}"
            >
              <div v-if="media.fileType.startsWith('png')">
                <img :src="'https://localhost:7243/MediaSliderManager/' + media.fileName" alt="">
              </div>
              <div v-else-if="media.fileType.startsWith('mp4')">
                <video autoplay loop muted>
                    <source :src="'https://localhost:7243/MediaSliderManager/' + media.fileName">
                </video>
              </div>
          
              <div class="carousel-container">
                <div class="container">
                  <h2 class="animate__animated animate__fadeInDown">The Best Business Information </h2>
                  <p class="animate__animated animate__fadeInUp">We're In The Business Of Helping You Start Your Business</p>
                  <a href="#about" class="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
                </div>
              </div>
          </div> -->

          <div v-for="(media, index) in listOfMedia" :key="media">
            <div class="carousel-item" :class="{'active': index === 0}" :style="{ 'background-image': `url(${'https://localhost:7243/MediaSliderManager/' + media.fileName})` }" v-if="media.fileType.startsWith('png')">
              <div class="carousel-container">
                  <div class="container">
                    <h2 class="animate__animated animate__fadeInDown">The Best Business Information </h2>
                    <p class="animate__animated animate__fadeInUp">We're In The Business Of Helping You Start Your Business</p>
                    <a href="#about" class="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
                  </div>
                </div>
            </div>
            <div class="carousel-item" :class="{'active': index === 0}" v-else>
              <video autoplay loop muted class="videoBG">
                  <source :src="'https://localhost:7243/MediaSliderManager/' + media.fileName">
              </video>
              <div class="carousel-container">
                  <div class="container">
                    <h2 class="animate__animated animate__fadeInDown">The Best Business Information </h2>
                    <p class="animate__animated animate__fadeInUp">We're In The Business Of Helping You Start Your Business</p>
                    <a href="#about" class="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
                  </div>
                </div>
            </div>
          </div>

          <!-- <div class="carousel-item active" :style="{ 'background-image': `url(${carouse2})` }">
            <div class="carousel-container">
              <div class="container">
                <h2 class="animate__animated animate__fadeInDown">At vero eos et accusamus</h2>
                <p class="animate__animated animate__fadeInUp">Helping Business Security & Peace of Mind for Your Family</p>
                <a href="#about" class="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </div>

          <div class="carousel-item" :style="{ 'background-image': `url(${carouse3})` }">
            <div class="carousel-container">
              <div class="container">
                <h2 class="animate__animated animate__fadeInDown">Temporibus autem quibusdam</h2>
                <p class="animate__animated animate__fadeInUp">Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem</p>
                <a href="#about" class="btn-get-started scrollto animate__animated animate__fadeInUp">Get Started</a>
              </div>
            </div>
          </div> -->

        </div>
     
        
        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </a>

      </div>
    </div>
  </section><!-- End Hero Section -->
</template>

<style scoped lang="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'bootstrap/scss/mixins';

  // @include media-breakpoint-only(xs) {  }
  // @include media-breakpoint-only(sm) {  }
  // @include media-breakpoint-only(md) {  }
  // @include media-breakpoint-only(lg) {  }
  // @include media-breakpoint-only(xl) {  }
  // @include media-breakpoint-only(xxl) {  }
  // @media (max-width: 400px) { 
  //   .videoBG {
  //     height: 844px !important;
  //     width: 390px !important;
  //   }
  // }
  @include media-breakpoint-only(xs) {  
    .videoBG {
      height: 844px !important;
      width: 390px !important;
     
    }
  }
  @media (min-width: 280px) and (max-width: 281px) { 
    .videoBG {
      height: 653px !important;
      width: 280px !important;
    }
  }
  @media (min-width: 360px) and (max-width: 361px) { 
    .videoBG {
      height: 740px !important;
      width: 360px !important;
   
    }
  }
  @media (min-width: 375px) and (max-width: 376px) { 
    .videoBG {
      height: 667px !important;
      width: 375px !important;
    
    }
  }
  @media (min-width: 412px) and (max-width: 413px) { 
    .videoBG {
      height: 915px !important;
      width: 412px !important;
   
    }
  }
  @media (min-width: 414px) and (max-width: 415px) { 
    .videoBG {
      height: 896px !important;
      width: 414px !important;
    }
  }
  @media (min-width: 540px) and (max-width: 541px) { 
    .videoBG {
      height: 720px !important;
      width: 540px !important;
    }
  }
  @include media-breakpoint-only(sm) { 
    .videoBG {
      height: 844px !important;
      width: 390px !important;
    }
  }
  @media (min-width: 667px) and (max-width: 668px) { 
    .videoBG {
      height: 375px !important;
      width: 667px !important;
  
    }
  }
  @include media-breakpoint-only(md) { 
    .videoBG {
      height: 1180px !important;
      width: 820px !important;
    }
  }
  @media (min-width: 896px) and (max-width: 897px) { 
    .videoBG {
      height: 500px !important;
      width: 940px !important;
 
    }
  }
  @media (min-width: 912px) and (max-width: 913px) { 
    .videoBG {
      height: 1180px !important;
      width: 912px !important;
    }
  }
  @media (min-width: 1024px) and (max-width: 1025px) { 
    .videoBG {
      height: 600px !important;
      width: 1024px !important;
    }
  }
  @media (min-width: 1280px) and (max-width: 1281px) { 
    .videoBG {
      height: 800px !important;
      width: 1280px !important;
    }
  }
  @include media-breakpoint-only(lg) { 
    .videoBG {
      max-height: 930px !important;
      max-width: 1540px !important;
    }
  }
  @include media-breakpoint-only(xl) { 
    .videoBG {
      max-height: 930px !important;
      max-width: 1540px !important;
    }
  }
  @include media-breakpoint-only(xxl) { 
    .videoBG {
      max-height: 930px !important;
      max-width: 1540px !important;
    }
  }
  // @media (max-width: 1141px) {
  //   .videoBG {
  //     max-height: 930px !important;
  //     max-width: 1540px !important;
  //   }
  // }

  // @media (max-width: 1321px){
  //   .videoBG {
  //     max-height: 930px !important;
  //     max-width: 1540px !important;
  //   }
  // }
</style>