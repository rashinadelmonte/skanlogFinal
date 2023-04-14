<script setup lang="ts">
      import { onMounted, ref, reactive, computed, watch } from "vue";
      import api from "@/services/apiService";

      const getAllData = ref([]);
      const selectedDate = reactive({ value: ""});
      const state = reactive({
          currentPage: 1
      });

      onMounted(async() => {
          const getData = await api.get('/NewsAndEvents');
            getAllData.value = getData.data;
            console.log(getAllData.value);

      });

      watch(selectedDate, (newVal, oldVal) => {
          if (!newVal) {
              state.currentPage = 1;
          }
      });

      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "long",
         /*  day: "numeric", */
          year: "numeric",
          
        });
      };

      const filteredNews = computed(() => { 
          if (!selectedDate.value) {
            return paginatedList.value;
          } else {
              const formattedDate = formatDate(selectedDate.value);
               return paginatedList.value.filter((news) => formatDate(news.date) === formattedDate);
          }
      });
      
      const paginatedList = computed(() => {
        if (!selectedDate.value) {
          const start = (state.currentPage - 1) * 3;
          const end = start + 3;
          return getAllData.value.slice(start,end);
        } else {
          const filteredData = getAllData.value.filter((news) => {
            const formattedDate = formatDate(news.date);
            return formattedDate === formatDate(selectedDate.value);
          }) 
          return filteredData;
        }
      }); 


      function nextPage () {
        if (state.currentPage < Math.ceil(getAllData.value.length / 3)) {
          state.currentPage++;
        }
      }

      function prevPage () {
        if (state.currentPage > 1) {
          state.currentPage--;
        }
      }

      function onCurrentChange(currentPage: number) {
        state.currentPage = currentPage;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
</script>

<template>
     <div class="news-area">   
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="section-headline">
                <h2>Latest News</h2>
              </div>
                <el-date-picker
                    v-model="selectedDate.value"
                    type="month"
                    placeholder="Select a month"
                    class="datepicker"
                />
          </div>
            <div class="news-wrapper">
              <h3>Top Stories > </h3>
                  <div class="news-content fade-in" v-if="filteredNews.length > 0">
                      <div class="content-title fade-in">
                        <div v-for="news in filteredNews" :key="news.newsAndEventsId">
                          <router-link :to="{ name: 'News Article', params: { newsAndEventsId: news.newsAndEventsId }}">
                            <div class="line"></div>
                                <div class="fade-in">
                                  <div class="left-content">
                                    <span>{{ formatDate(news.date) }}</span>
                                     <h3>{{ news.title }}</h3> 
                                  </div>
                                </div> 
                          </router-link>
                            <div class="right-image">
                              <img :src="'https://localhost:7243' + news.filePath" alt="">
                            </div> 
                        </div>
                      </div>
                  </div>
                  <div class="not-found" v-else>
                    <p>No News Found</p>
                  </div>
            </div>
            
            <el-pagination
              background
              :page-size="3"
              layout="prev, pager, next"
              class="mt-4"
              :total="getAllData.length"
              :current-page="state.currentPage"
              @current-change="onCurrentChange"
              @prev-click="prevPage"
              @next-click="nextPage"
           />
        </div>
    </div>
</template>

<style lang="scss">
    @import 'bootstrap/scss/functions';
    @import 'bootstrap/scss/variables';
    @import 'bootstrap/scss/mixins';

  
/*     @include media-breakpoint-up(md) {
    
    } */

  .fade-in {
    animation: fadeIn 1s ease-in-out;
  }

    @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(-15px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  

  .datepicker {
    width: 18rem !important;
    height: 3.5rem !important;
    background: #ffff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    float: right;
    top: -5rem;
   
  }

  .datepicker input::-webkit-input-placeholder {
  font-size: 18px; /* adjust font size as needed */
}

  
  .content-title span {
    color: #3EC1D5;
    font-size: 1rem;
    font-weight: 600;
  }  

  .not-found p {
    text-align: center;
    font-size: 2.5rem;
    padding: 10rem;
    display: flex;
    justify-content: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
   }
   
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .news-wrapper {
    background: #ffff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 1rem;
    padding: 2rem;
  }

  .right-image {
    display: flex;
    justify-content: flex-end;
    
  }

  .right-image img {
    max-width: 20%;
    border-radius: 1rem;
    position: relative;
    margin-top: -7rem;
  }


  .news-wrapper h3{
    color: #3EC1D5;
    padding-top: 1rem;
  }
  
  .content-title h3 {
    color: #333;
    font-size: 1.5rem;
    font-weight: 400;
    column-count: 2;
    
  }

  .news-wrapper .line {
    margin-bottom: 2.5rem;
    margin-top: 1.5rem;
  }

  .line{
     border: 1px solid ;
     opacity: 0.2; 
  }

  .content-title {
    margin-top: 3rem;
    flex: 1;
    
  }


  .content-title .line {
    color: #333;
    opacity: 0.1;
  }

  /* @include media-breakpoint-up(md) {
    .right-image img {
        max-width: 20%;
        border-radius: 1rem;
    }

    .content-title h3 {
      font-size: 2rem;
    }
  }
 */
  .section-headline {
    margin-top: 8rem;
    margin-bottom: 6rem;
    text-align: center;    
    
  }

  @media (min-width: 280px) and (max-width: 768px) { 
    .datepicker {
      width: 13rem !important;
      height: 2.5rem !important;
      position: relative !important;
      border-radius: 10rem !important;
    }
  } 

  @media (min-width: 320px) and (max-width: 321px) { 
    .content-title h3 {
      color: #333;
      font-size: 12px;
      font-weight: 700;
      column-count: 1;
      width: 50%;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
      max-width: 45%;
      border-radius: 1rem;
      margin-top: -6rem;
       
    }

    .not-found p {
       
      
    }
    
  } 

  @media (min-width: 425px) and (max-width: 426px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 375px) and (max-width: 376px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 412px) and (max-width: 415px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 390px) and (max-width: 391px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 393px) and (max-width: 394px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 360px) and (max-width: 361px) { 
    .content-title h3 {
      color: #333;
      font-size: 14px;
      font-weight: 700;
      column-count: 1;
      overflow-wrap: break-word;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  
  @media (min-width: 820px) and (max-width: 821px) { 
    .content-title h3 {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      column-count: 2;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 768px) and (max-width: 769px) { 
    .content-title h3 {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      column-count: 2;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 912px) and (max-width: 913px) { 
    .content-title h3 {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      column-count: 2;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 540px) and (max-width: 541px) { 
    .content-title h3 {
      color: #333;
      font-size: 12px;
      font-weight: 800;
      column-count: 2;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 280px) and (max-width: 281px) { 
    .content-title h3 {
      color: #333;
      font-size: 10px;
      font-weight: 800;
      column-count: 1;
      line-height: 1.1;
      width: 50%;
   }

   .right-image img {
        max-width: 40%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  @media (min-width: 1024px) and (max-width: 1025px) { 
    .content-title h3 {
      font-size: 1.4rem !important;
      color: #333;
      font-size: 15px;
      font-weight: 700;
      column-count: 2;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 

  
  @media (min-width: 1280px) and (max-width: 1281px) { 
    .content-title h3 {
      color: #333;
      font-size: 1.8rem;
      font-weight: 700;
      column-count: 2;
      overflow-wrap: break-word;
      line-height: 1.1;
   }

   .right-image img {
        max-width: 20%;
        border-radius: 1rem;
        margin-top: -5rem;
    }
  } 


</style>