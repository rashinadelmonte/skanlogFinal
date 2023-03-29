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
  <div class="pricing-area area-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-6">
          <div 
           class="section-headline text-center"
           id="personnel" 
           :class="{ 'visible': data.isPersonnelVisible }"
          >
            <h2>Current Personnels</h2>
          </div>
        </div>
      </div>
      <div 
        class="row personnels"
        id="row-personnel"
        :class="{ 'row-visible': data.isPersonnelVisible }"
      >
        <div class="col-xs-2 col-md-5">
          <div class="pri_table_list active">
            <h3>Personnel Inquiry</h3>
            <h3 v-html="data.personnel.content"></h3>
            <button>Contact</button>
          </div>
        </div>
        <div class="col-xs-2 col-md-5">
          <div class="pri_table_list active">
            <h3>{{ data.admin.type }}</h3>
            <h3 v-html="data.admin.content"></h3>
            <button>Contact</button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.personnels {
  justify-content: center;
  column-gap: 5rem;
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
</style>