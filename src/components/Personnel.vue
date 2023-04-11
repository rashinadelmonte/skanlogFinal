<script setup lang="ts">
  import { reactive, ref, onMounted } from "vue";
  import api from "@/services/apiService";

  
  const data = reactive({
    isPersonnelVisible: false,
    personnel: { type: "", content: "" },
    admin: { type: "", content: "" },
    all: []
  });

  const checkPersonnelVisibility = () => {
      const personnelElement = document.getElementById("personnel");
      const rowElement = document.getElementById("row-personnel");
      if(!personnelElement) return;

      const sectionTop = personnelElement.offsetTop;
      /* const sectionHeight = personnelElement.offsetHeight; */ //Para inig saka niya mo fade napud
      /* if(scrollPosition > sectionTop + 100 && scrollPosition > sectionTop + sectionHeight) {
        // ...
      } */
      const scrollPosition = window.scrollY + window.innerHeight;

      if(scrollPosition > sectionTop + 250) {
        data.isPersonnelVisible = true;
        personnelElement.classList.add("visible");
        window.removeEventListener("scroll", checkPersonnelVisibility);
      } 

      if(scrollPosition > sectionTop + 250) {
        data.isPersonnelVisible = true;
        rowElement.classList.add("row-visible");
        window.removeEventListener("scroll", checkPersonnelVisibility);
      }
  }
     
  onMounted(async() => {
    const response = await api.get('/AboutSkanlog');
      response.data.forEach((item) => {
        if (item.type === 'Personnel Inquiries')data.personnel = item;
        if (item.type === 'Administrative Concern Personnel')data.admin = item;
      });

    data.all = response.data;
    console.log(data.all);
  })

  checkPersonnelVisibility();
  window.addEventListener("scroll", checkPersonnelVisibility);
</script>
<template>
  <div class="">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-6">
          <div 
           class="section-headline"
           id="personnel" 
           :class="{ 'visible': data.isPersonnelVisible }"
          >
            <h2>Current Personnels</h2>
          </div>
        </div>
      </div>
      <div class="">
        <div 
        class="personnels"
        id="row-personnel"
        :class="{ 'row-visible': data.isPersonnelVisible }"
      >
          <div class="personnels-contact active">
            <h3>Personnel Inquiry</h3>
            <h3 v-html="data.personnel.content"></h3>
            <button>Contact</button>
          </div>

          <div class="personnels-contact active">
            <h3>Administrative Inquiry</h3>
            <h3 v-html="data.personnel.content"></h3>
            <button>Contact</button>
          </div>
        </div>
      </div>
      
  
  </div>


</template>

<style scoped lang="scss">
  .personnels {
    justify-content: center;
    column-gap: 1rem;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 1rem;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s, transform 1s;
  }
  .row-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 1s, transform 1s;
  }
  #personnel {  
    opacity: 0;
    visibility: hidden;
    /* transform: translateX(-100%); *//* Para left to middle */
    transform: translateY(-50%);/* Para gikan sa top to middle */
  /*   transform: translateY(100%)  Para Gikan sa ubos padong middle*/ 
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.7s ease-in-out;
  }
  #personnel.visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
  #row-personnel {
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);/* Para left to middle */
  /*   transform: translateY(100%)  Para Gikan sa ubos padong middle*/ 
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.7s ease-in-out;
  }
  #row-personnel.row-visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }


  @media (min-width: 280px) and (max-width: 281px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 260px !important;
      }
      .personnels-contact h3 {
        font-size: 1rem;
      }

      .section-headline h2 {
        font-size: 1.5rem;
      }
    }  

  @media (min-width: 399px) and (max-width: 400px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
          padding-left: 10px;
    
      }
      .personnels-contact {
          width: 365px !important;
      }
    }  

  @media (min-width: 375px) and (max-width: 376px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 340px !important;
      }

      .personnels-contact h3 {
          font-size: 1.2rem;
      }
    }

    @media (min-width: 390px) and (max-width: 391px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
          padding-left: 5px;
    
      }
      .personnels-contact {
          width: 350px !important;
      }

      .personnels-contact h3 {
          font-size: 1.3rem;
      }
    } 

    @media (min-width: 320px) and (max-width: 321px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
        width: 305px !important;
      }
      .personnels-contact h3 {
        font-size: 1.2rem;
      }
      
    } 

    
    @media (min-width: 393px) and (max-width: 394px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
          
      }
      .personnels-contact {
          width: 350px !important;
          margin-left: 5px;
      }
      .personnels-contact h3 {
        font-size: 1.2rem;
      }
    } 

    @media (min-width: 360px) and (max-width: 361px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
          
      }
      .personnels-contact {
          width: 345px !important;
      }

      .personnels-contact h3 {
        font-size: 1.2rem;
      }
    } 

    @media (min-width: 412px) and (max-width: 413px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 385px !important;
      }

      .personnels-contact h3 {
        font-size: 1.2rem;
      }
    } 

    @media (min-width: 425px) and (max-width: 426px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 385px !important;
      }

      .personnels-contact h3 {
        font-size: 1.2rem;
      }
    } 


    @media (min-width: 414px) and (max-width: 415px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 385px !important;
      }

      .personnels-contact h3 {
        font-size: 1.3rem;
      }
    }  

    @media (min-width: 540px) and (max-width: 541px) { 
      .personnels {
          display: inline-grid !important;
          row-gap: 2rem;
      }
      .personnels-contact {
          width: 520px !important;
          
      }
    }  

    @media (min-width: 820px) and (max-width: 821px) { 
      .personnels-contact h3 {
        font-size: 1.3rem;
      }
      .personnels-contact {
          width: 810px !important;
      }
    }  

    @media (min-width: 768px) and (max-width: 769px) { 
      .personnels-contact h3 {
        font-size: 1.2rem;
      }

      .personnels-contact {
          width: 810px !important;
          margin-left: 10px;
      }
    }  

    @media (min-width: 912px) and (max-width: 913px) { 
      .personnels-contact h3 {
        font-size: 1.3rem;
      
      }

      .personnels-contact {
        width: 912px !important;
        margin-left: 10px;
      }
    }  

    @media (min-width: 1024px) and (max-width: 1025px) { 
      .personnels-contact h3 {
        font-size: 1.3rem;
      }

      .personnels-contact {
        width: 900px !important;
        margin-right: 15px;
    
      }
    }  
    @media (min-width: 1280px) and (max-width: 1281px) { 
      .personnels-contact h3 {
        font-size: 1.3rem;
      }

      .personnels-contact {
        width: 700px !important;   
        margin-left: 15px;
      }
    }  
  /*   @import 'bootstrap/scss/functions';
    @import 'bootstrap/scss/variables';
    @import 'bootstrap/scss/mixins';

    @include media-breakpoint-only(xs) {  
        .personnels {
            display: inline-grid !important;
            row-gap: 2rem;
            width: 375px;
            padding: 1rem 1rem 1rem 1rem;
          }
        
        
      } */
  /* @include media-breakpoint-only(sm) {  }
  @include media-breakpoint-only(md) {  }
  @include media-breakpoint-only(lg) {  }
  @include media-breakpoint-only(xl) {  }
  @include media-breakpoint-only(xxl) {  } */
</style>