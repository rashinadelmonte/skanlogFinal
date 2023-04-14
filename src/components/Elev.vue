<script setup lang="ts">
    import api from "@/services/apiService";
    import {  onMounted, reactive, ref } from "vue";
    
    const activeTab = ref('elev');
    const isLoading = reactive({ status: true })

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
            isLoading.status = false;
          });

          data.all = response.data;

          console.log(data.all);
    });

</script>

<template>
    <div class="elev">
      <div class="loader-line" v-if="isLoading.status"></div>
      <div class="container" v-else>
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

    table {
      border: none;
      margin-top: 6rem;
    }

    tr:first-child td img {
      margin-bottom: 5rem;
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

    @keyframes lineAnim {
        0% {
            left: -40%;
        }
        50% {
            left: 20%;
            width: 80%;
        }
        100% {
            left: 100%;
            width: 100%;
        }
    }

    .elev-content h3,
    .history-content h3,
    .school-content > div {
      margin: 1rem 0;
      padding: 0 1.5rem;
      font-size: 1.3rem;
      line-height: 3rem;
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
      padding: 1em 1em !important;
      font-size: 1.4em !important;
      font-weight: 500 !important;
      border-radius: 2rem;
      font-weight: 1;
      color: #444;
    }
  }

  @media (min-width: 320px) and (max-width: 321px){

      tr:first-child td img {
        margin-bottom: 3rem;
      }

      table {
        border: none;
        margin-top: 1rem;
      }

      .elev .container {
        margin-top: 7rem;
        margin-bottom: 1rem;
        line-height: 1rem;
        text-align: center; 
      }

      .tabs .elev-title {
        font-size: 4rem;
      }
      .wrapper {
        margin: 2rem 0rem;
        margin-bottom: 10px;
      }

      .tabs li {
        padding: 5px 10px;
        font-size: 10px !important;
        font-weight: 700 !important;
        border-radius: 8em;
        line-height: 12px;
      }

      h1 {
        font-size: 1.3em;
      }

      p {
        font-size: 15px;
        line-height: 1.8em;
      }
    }

  @media (min-width: 280px) and (max-width: 281px){

    tr:first-child td img {
        margin-bottom: 3rem;
    }
      
    
    table {
        border: none;
        margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
      text-align: center; 
    }

    .tabs .elev-title {
      font-size: 4rem;
    }
    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2em !important;
      font-size: 1em;
    }

    .tabs li {
      padding: 5px 10px;
      font-size: 8px !important;
      font-weight: 700 !important;
      border-radius: 8em;
      line-height: 12px;
    }

    h1 {
      font-size: 1.3em;
    }

    p {
      font-size: 15px;
      line-height: 1.8em;
    }
  }

  @media (min-width: 540px) and (max-width: 541px){


    tr:first-child td img {
        margin-bottom: 3rem;
    }
      

    table {
        border: none;
        margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
      text-align: center; 
    }

    .tabs .elev-title {
      font-size: 4rem;
    }
    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2em !important;
      font-size: 1em;
    }

    .tabs li {
      padding: 5px 10px;
      font-size: 10px !important;
      font-weight: 700 !important;
      border-radius: 8em;
      line-height: 12px;
    }

    h1 {
      font-size: 1.3em;
    }

    p {
      font-size: 15px;
      line-height: 1.8em;
    }
  }

  @media (min-width: 382px) and (max-width: 383px){

    tr:first-child td img {
        margin-bottom: 3rem;
    }
      
    table {
        border: none;
        margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
      text-align: center; 
    }

    .tabs .elev-title {
      font-size: 4rem;
    }
    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2em !important;
      font-size: 1em;
    }

    .tabs li {
      padding: 5px 10px;
      font-size: 13px !important;
      font-weight: 500 !important;
      border-radius: 8em;
      line-height: 12px;
    }

    h1 {
      font-size: 1.3em;
    }

    p {
      font-size: 15px;
      line-height: 1.8em;
    }
  }
  // =============
  @media (min-width: 360px) and (max-width: 361px) {

    tr:first-child td img {
        margin-bottom: 3rem;
    }
      

    table {
        border: none;
        margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
    }

    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2rem !important;
    }

    .tabs li {
      padding: 1rem 1rem !important;
      font-size: 7.3px !important;
      font-weight: 1000 !important;
      border-radius: 3em !important;
      line-height: 1em !important;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 14px;
      line-height: 1.8rem;
    }
  }
  @media (min-width: 393px) and (max-width: 394px) {

    tr:first-child td img {
        margin-bottom: 3rem;
    }
    
    table {
        border: none;
        margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
    }

    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2rem !important;
    }

    .tabs li {
      padding: 1rem 1rem !important;
      font-size: 10px !important;
      font-weight: 1000 !important;
      border-radius: 3em !important;
      line-height: 1em !important;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 14px;
      line-height: 1.8rem;
    }
  }
  // =============
  @media (min-width: 375px) and (max-width: 376px) {

  tr:first-child td img {
      margin-bottom: 3rem;
  }
    
  table {
      border: none;
      margin-top: 1rem;
  } 

  .elev .container {
    margin-top: 7rem;
    margin-bottom: 1rem;
    line-height: 1rem;
  }

  .wrapper {
    margin: 2rem 0rem;
    margin-bottom: 10px;
  }

  .navbar {
    margin: 1.3rem !important;
  }

  .logo {
    margin: 2rem !important;
  }

  .tabs li {
    padding: 1rem 1rem !important;
    font-size: 7.5px !important;
    font-weight: 1000 !important;
    border-radius: 3em !important;
    line-height: 1em !important;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 14px;
    line-height: 1.8rem;
  }
  }
  // =============
  @media (min-width: 412px) and (max-width: 413px) {

  tr:first-child td img {
      margin-bottom: 3rem;
  }
  
  table {
      border: none;
      margin-top: 1rem;
    }

  .elev .container {
    margin-top: 7rem;
    margin-bottom: 1rem;
    line-height: 1rem;
  }

  .wrapper {
    margin: 2rem 0rem;
    margin-bottom: 10px;
  }

  .navbar {
    margin: 1.3rem !important;
  }

  .logo {
    margin: 2rem !important;
  }

  .tabs li {
    padding: 6px 10px;
    font-size: 12px !important;
    font-weight: 500 !important;
    border-radius: 8em;
    line-height: 12px;
  }

  h1 {
    font-size: 1.5rem;
  }

    p {
      font-size: 14px;
      line-height: 1.8rem;
    }
  }
  // ============= Iphone Promax
  @media (min-width: 390px) and (max-width: 391px) {

    tr:first-child td img {
        margin-bottom: 3rem;
    }
      
    table {
        border: none;
        margin-top: 1rem;
    } 

  .elev .container {
    margin-top: 7rem;
    margin-bottom: 1rem;
    line-height: 1rem;
  }

  .wrapper {
    margin: 2rem 0rem;
    margin-bottom: 10px;
  }

  .navbar {
    margin: 1.3rem !important;
  }

  .logo {
    margin: 2rem !important;
  }

  .tabs li {
    padding: 5px 10px;
    font-size: 13px !important;
    font-weight: 500 !important;
    border-radius: 8em;
    line-height: 12px;
  }

  h1 {
    font-size: 1.5rem;
  }

    p {
      font-size: 15px;
      line-height: 1.8rem;
    }
  }
    // =============
    @media (min-width: 360px) and (max-width: 361px) {

    tr:first-child td img {
      margin-bottom: 3rem;
    }
      
    table {
      border: none;
      margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
    }

    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2rem !important;
    }

    .tabs li {
      padding: 7px 10px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      border-radius: 8em;
      line-height: 12px !important;
    }

    h1 {
      font-size: 1.5rem;
    }

      p {
        font-size: 14px;
        line-height: 1.8rem;
      }
    }
    // ============= XR
    @media (min-width: 414px) and (max-width: 415px) {

    tr:first-child td img {
      margin-bottom: 3rem;
    }

    table {
      border: none;
      margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
    }

    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2rem !important;
    }

    .tabs li {
      padding: 6px 10px;
      font-size: 13px !important;
      font-weight: 500 !important;
      border-radius: 8em;
      line-height: 12px;
    }

    h1 {
      font-size: 1.5rem;
    }

      p {
        font-size: 14px;
        line-height: 1.8rem;
      }
    }
    // Ipad
    @media (min-width: 820px) and (max-width: 821px) {
      
     tr:first-child td img {
        margin-bottom: 3rem;
      }

      table {
        border: none;
        margin-top: 1rem;
      }
      .elev .container {
        margin-top: 8rem;
        margin-bottom: 1rem;
        line-height: 1rem;
      }

      .navbar {
        margin: 2em !important;
      }

      .logo {
        margin: 2rem !important;
      }

      .wrapper {
        margin: 2rem 0rem;
        margin-bottom: 10px;
      }

      .tabs li {
        padding: 12px 15px !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        border-radius: 8em;
        line-height: 12px !important;
      }

      h1 {
        font-size: 2em;
      }

      p {
        font-size: 18px;
        line-height: 1.5em;
      }
    }
    // ===========
    @media (min-width: 768px) and (max-width: 769px) {
    tr:first-child td img {
        margin-bottom: 3rem;
      }
      

    table {
      border: none;
      margin-top: 1rem;
    }

    .elev .container {
      margin-top: 8rem;
      margin-bottom: 1rem;
      line-height: 1rem;
    }
    .navbar {
       margin: 2em !important;
    }

    .logo {
       margin: 2rem !important;
    }

    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .tabs li {
      padding: 13px 15px !important;
      font-size: 16px !important;
      font-weight: 400 !important;
      border-radius: 8em;
      line-height: 12px !important;
    }

    h1 {
    font-size: 2em;
    }

      p {
        font-size: 18px;
        line-height: 1.5em;
      }
    }
    // Ipad
    @media (min-width: 820px) and (max-width: 821px) {

      tr:first-child td img {
        margin-bottom: 3rem;
      }
      

      table {
        border: none;
        margin-top: 1rem;
      }

      .elev .container {
        margin-top: 8rem;
        margin-bottom: 1rem;
        line-height: 1rem;
      }

      .navbar {
        margin: 2em !important;
      }

      .logo {
        margin: 2rem !important;
      }

      .wrapper {
        margin: 2rem 0rem;
        margin-bottom: 10px;
      }

      .tabs li {
        padding: 12px 15px !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        border-radius: 8em;
        line-height: 12px !important;
      }

      h1 {
        font-size: 2em;
      }

      p {
        font-size: 18px;
        line-height: 1.5em;
      }
    }
    // ===========
    @media (min-width: 768px) and (max-width: 769px) {

      tr:first-child td img {
        margin-bottom: 3rem;
      }
      

     table {
        border: none;
        margin-top: 1rem;
     }

      .elev .container {
        margin-top: 8rem;
        margin-bottom: 1rem;
        line-height: 1rem;
      }

      .navbar {
       margin: 2em !important;
      }

      .logo {
        margin: 2rem !important;
      }

      .wrapper {
        margin: 2rem 0rem;
        margin-bottom: 10px;

      }

      .tabs li {
        padding: 13px 15px !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        border-radius: 8em;
        line-height: 12px !important;
      }

      h1 {
        font-size: 2em;
      }

      p {
        font-size: 18px;
        line-height: 1.5em;
      }
    }

    @media (min-width: 375px) and (max-width: 378px){

    tr:first-child td img {
      margin-bottom: 3rem;
    }
      
    table {
      border: none;
      margin-top: 1rem;
    }

    .elev .container {
      margin-top: 7rem;
      margin-bottom: 1rem;
      line-height: 1rem;
      text-align: center; 
    }

    .tabs .elev-title {
     font-size: 4rem;
    }
    .wrapper {
      margin: 2rem 0rem;
      margin-bottom: 10px;
    }

    .navbar {
      margin: 1.3rem !important;
    }

    .logo {
      margin: 2em !important;
      font-size: 1em;
    }

    .tabs li {
      padding: 5px 10px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      border-radius: 8em;
      line-height: 12px;
    }

    h1 {
     font-size: 1.3em;
    }

    p {
      font-size: 15px;
      line-height: 1.8em;
     } 
    }
</style>
