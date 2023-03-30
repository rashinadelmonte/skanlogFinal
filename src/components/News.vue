<script setup lang="ts">
      import image from "@/assets/assets/img/about/1.jpg";
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
      }
</script>

<template>
     <div class="news-area area-padding">
      <div class="container">
        <div class="block">
            <el-date-picker
              v-model="selectedDate.value"
              type="month"
              placeholder="Select a month"
              class="datepicker"
            />
         </div>
      </div>
      
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="section-headline">
                <h2>Latest News</h2>
              </div>
          </div>
            <div class="news-wrapper">
              <h3>Top Stories > </h3>
                  <div class="news-content fade-in" v-if="filteredNews.length > 0">
                      <div class="content-title fade-in">
                        <div v-for="news in filteredNews" :key="news.newsAndEventsId">
                          <router-link :to="{ name: 'News Article', params: { newsAndEventsId: news.newsAndEventsId }}">
                            <div class="line"></div>
                                <div class="fade-in">
                                  <span>{{ formatDate(news.date) }}</span>
                                  <h3>{{ news.title }}</h3> 
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

  .block {
    float: right;
    margin-top: 2rem;
    background: #ffff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .datepicker {
    width: 18rem !important;
    height: 3.5rem !important;
  }

  .datepicker input::-webkit-input-placeholder {
  font-size: 18px; /* adjust font size as needed */
}

  
  .content-title span {
    color: #3EC1D5;
    font-size: 1rem;
  }  

  .not-found p {
    text-align: center;
    font-size: 2.5rem;
    padding: 10rem;
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

  .news-content {
    display: flex;
  }

  .right-image {
    display: flex;
    justify-content: flex-end;
  }

  .right-image img {
    margin-top: -3.9rem;
    max-width: 40%;
    border-radius: 1rem;
  }


  .news-wrapper h3{
    color: #3EC1D5;
    padding-top: 1rem;
  }

  .news-wrapper .line {
    margin-bottom: 1.5rem;
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

  .content-title h3 {
    color: #333;
    font-size: 1rem;
    
  }

  .content-title .line {
    color: #333;
    opacity: 0.1;
  }

  @include media-breakpoint-up(md) {
    .right-image img {
        max-width: 20%;
        border-radius: 1rem;
    }

    .content-title h3 {
      font-size: 2rem;
    }
  }

  .section-headline {
    margin-top: 8rem;
    text-align: center;    
  }

</style>