<script setup lang="ts">
    import api from "@/services/apiService";
    import {  onMounted, reactive, ref } from "vue";
    
    const activeTab = ref('elev');

    const data = reactive({
      elev: { section: "", content: ""},
      history: { section: "", content: ""},
      school: { section: "", content: ""},
      all: []
    });

    onMounted(async() => {
      const response = await api.get('/Elev');
          response.data.forEach((item) => {
            if (item.section === 'What is Elev')data.elev = item;
            if (item.section === 'Brief History')data.history = item;
            if (item.section === 'School Participants')data.school = item;
          });

          data.all = response.data;

          console.log(data.all);
    });

</script>

<template>
    <div class="elev">
      <div class="container">
          <ul class="tabs">
            <li @click="activeTab = 'elev'" 
            :class="{ 'filter-active' : activeTab === 'elev'}" 
            v-html="data.elev.section"
            class="elev-title">
           </li>

           <li @click="activeTab = 'history'"
             :class="{ 'filter-active' : activeTab === 'history'}"
             v-html="data.history.section"
              class="history-title">
           </li>

            <li @click="activeTab = 'school'"
            :class="{ 'filter-active' : activeTab === 'school'}"
             v-html="data.school.section" 
             class="school-title">
            </li>
          </ul>
        
          <div class="wrapper">
              <div 
                class="elev-content fade-in"
                v-if="activeTab === 'elev'" 
                :class="{ 'active-content': activeTab === 'elev'}"
                :key="'elev'"
              >
                <h3 v-html="data.elev.content"></h3>
              </div>
        
              <div
                  class="history-content fade-in"
                  v-if="activeTab === 'history'" 
                  :class="{ 'active-content': activeTab === 'history'}"
                  :key="'history'"
                >
                  <h3 v-html="data.history.content"></h3>
              </div>
      
              <div 
                class="school-content fade-in" 
                v-if="activeTab === 'school'"
                :class="{ 'active-content': activeTab === 'school'}"
                :key="'school'"
              >
                <div class="school-logo" v-html="data.school.content"></div>
              </div>
           </div>
      </div>
    </div>
</template>


<style lang="scss">
   @import 'bootstrap/scss/functions';
   @import 'bootstrap/scss/variables';
   @import 'bootstrap/scss/mixins';

  .elev-content h3,
  .history-content h3,
  .school-content > div {
    margin: 1rem 0;
    padding: 0 1.5rem;
    font-size: 1.3rem;
    line-height: 1.5;
  }

  .elev .container{
    margin-top: 10rem;
    margin-bottom: 5rem;
  }

  .wrapper {
    margin-top: 5rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .tabs { 
    padding: 0;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .tabs li {
    cursor: pointer;
    margin: 15px 15px 15px 0;
    line-height: 20px;
    text-transform: uppercase;
    background: #fff;
    margin-bottom: 5px;
    transition: all 0.3s ease-in-out;
    border: 1px solid #444;
  }


  .tabs li.filter-active {
    border-color: #3EC1D5;
    background: #3EC1D5;
    color: #fff;
  }

  .elev-section li:last-child {
    margin-right: 0;
  }

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

  @include media-breakpoint-up(md) {
    .tabs li {
      padding: 1.5rem 4rem !important;
      font-size: 1.5rem !important;
      border-radius: 50px !important;
 
    }
  }

  @include media-breakpoint-down(xs) {
    .tabs li {
      padding: 1rem 1rem;
      font-size: 13px;
      border-radius: 2rem;
      font-weight: 1;
      color: #444;
    }
  }
</style>
