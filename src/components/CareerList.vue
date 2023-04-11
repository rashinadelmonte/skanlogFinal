<script setup lang="ts">
    import { onMounted, reactive, computed, watch } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const state = reactive({
        currentPage: 1,
        searchTerm: ""
    });


    //Defining my listOfCareer from career.vue through props
    const props = defineProps({
        listOfCareer: {
            type : Array,
            default : []
        },    
        
    })

    //For pagination
    const paginatedList = computed(() => {
        const start = (state.currentPage - 1) * 4;
        const end = start + 4;
        // filter based on search term
        return props.listOfCareer.filter(career => {
            return career.careerName.toLowerCase().includes(state.searchTerm.toLowerCase());
        }).slice(start,end);
    });


   /*  function prevPage() {
        if (state.currentPage > 1) {
            state.currentPage--;
        }
    }

    function nextPage() {
        if (state.currentPage < Math.ceil(props.listOfCareer.length / 3)) {
            state.currentPage++;
        }
    } */

    function onCurrentChange(currentPage: number) {
        state.currentPage = currentPage;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    watch(() => state.currentPage, () => {
        paginatedList.value
    });


     //For routing direclty to apply now
     function applyNow(careerId: any) {
        router.push({ name: 'CareerDetails', params: {careerId: careerId }, query: { scrollToFooter: "applyNow"}})
    }

    onMounted(() => {
        const query = router.currentRoute.value.query;
        const careerSingleList = document.getElementById("apply-now");

        if (query.scrollToFooter == "applyNow" && careerSingleList) {
            careerSingleList.scrollIntoView({ behavior: "smooth" });
        }
       
    });
</script>

<template>
    <div class="career-header">
        <div class="section-headline text-center">
            <h2>Job Listing</h2>
            <div class="row height d-flex justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="form">
                        <i class="fa fa-search"></i>
                        <input 
                          type="search" 
                          class="form-control form-input" 
                          placeholder="Search Job by title"
                          v-model="state.searchTerm"  
                        >
                    </div>
                </div>
             </div>     
        </div>
        <div class="container">
            <div class="row gx-5 gy-3">
                <div class="career-item col-lg-6"  data-aos="fade-up" v-for="career in paginatedList" :key="career.careerId"> 
                    <router-link :to="{ name: 'CareerDetails', params: { careerId: career.careerId }}">
                        <h2>{{ career.careerName }}</h2>
                    </router-link>
                        <p v-html="career.careerOverview" id="career-overview"></p>
                    <div id="career-footer">
                        <router-link :to="{name: 'CareerDetails', params: { careerId: career.careerId }}">
                            <button>Learn More</button>
                        </router-link>
                        <button @click="applyNow(career.careerId)">Apply</button>
                    </div>
                </div> 
            </div>
        </div>
      <!--   <el-pagination
            class="pagination"
            :current-page="state.currentPage"
            :page-size="3"
            :total="props.listOfCareer.length"
            layout="prev, pager, next"
            @current-change="onCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
        /> -->
        <el-pagination
            background
            :page-size="3"
            layout="prev, pager, next"
            class="mt-4"
            :total="props.listOfCareer.length"
            :current-page="state.currentPage"
            @current-change="onCurrentChange"
        />
    </div>
</template>

<style scoped lang="scss">
     @import 'bootstrap/scss/functions';
     @import 'bootstrap/scss/variables';
     @import 'bootstrap/scss/mixins';

    .form{
        position: relative;
        margin-bottom: -1rem;
    }
    

    .form .fa-search{
        position: absolute;
        top:20px;
        left: 20px;
        color: #9ca3af;
    }

    .form span{
        position: absolute;
        right: 17px;
        top: 13px;
        padding: 2px;
        border-left: 1px solid #d1d5db;

    }

    .left-pan{
       padding-left: 7px;
    }

    .left-pan i{
        padding-left: 10px;
    }

    .form-input{
        height: 55px;
        text-indent: 33px;
        border-radius: 10px;
    }

    .form-input:focus{
        box-shadow: none;
        border:none;
    }

    .card {
        border-radius: 1.3rem;
    }

    input::placeholder {
        font-weight: 600;
        font-size: 1rem;
    }


     .el-pager li.is-active {
        background-color: #3EC1D5 !important;
        color: white !important;
        padding: 1rem;
        font-size: 1rem;
     }

     .el-pagination button:hover {
        background-color: #3EC1D5 !important;
        padding: 1rem;
        color: #fff !important;
     }


     .el-pager li:hover {
        background-color: #3EC1D5 !important;
        color: #fff !important;
        padding: 1rem;
     }

  
    .pagination {
        margin-top: 1rem;
    }


    .career-item h2 {
        font-size: 1.7rem;
        font-weight: 700;
    }
   
    #career-footer {
        column-gap: 0.5rem;
        display: flex;
    }

    #career-overview{
        line-height: 1.5;
        width: 100%;
        font-size: 1.5rem;
        font-weight: 400;
        text-align: left;
        overflow-wrap: break-word;
    }
   
    .career-header {
        margin-bottom: 11rem;
        padding: 1.5rem;
    }

    .career-item {
        padding: 2.6rem;
        /* background-color: #ffff; */
       /*  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; */
       background: #ffff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 3px 20px;

    }



    .career-item button {
        background: #444 none repeat scroll 0 0;
        border: 1px solid #444;
        color: #fff;
        margin-bottom: 25px;
        padding: 10px 35px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        top: 1.9rem;
        position: relative;
    }

    .career-item button:nth-child(2) {
        background-color: #3EC1D5;
        outline: none;
        border: none;
    }

    @media (min-width: 320px) and (max-width: 321px) {
    
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            
        }

        #career-overview {
            line-height: 1.5;
            column-count: 1;
            /* width: 105%; */
            font-size: 1.5rem;
            font-weight: 100;
            text-align: left;
            /* word-spacing: -0.1rem; */
        
        }
        .career-item button {
            margin-top: 5%;
            column-gap: 5rem;
            font-size: 8px;
            padding: 5px 20px;
            
        }

        input::placeholder {
            font-size: 13px 
        }
        .search-wrapper button {
            font-size: 10px;
        }

        .form {
            margin-bottom: -4rem;
        }
    }  

    @media (min-width: 280px) and (max-width: 281px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 10px;
            margin-top: 11rem;
        }
    }  


    @media (min-width: 375px) and (max-width: 376px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 30px;
            margin-top: 5rem;
        }
    }  

    @media (min-width: 390px) and (max-width: 396px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 30px;
            margin-top: 5rem;
        }
    }  

    @media (min-width: 360px) and (max-width: 361px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 30px;
            margin-top: 5rem;
        }
    }  

    

    @media (min-width: 412px) and (max-width: 416px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 30px;
            margin-top: 1rem;
        }
    }  

    @media (min-width: 1024px) and (max-width: 1025px) { 

        .form {
            margin-bottom: -4rem;
        }
        .career-item h2 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 700;
            line-height: 1;
        }

        .career-item p {
            font-size: 14px;
            font-weight: 100;
            width: 100% !important;
            text-align: left;
        }
        .career-item button {
            position: relative;
            column-gap: 5rem;
            font-size: 10px;
            padding: 5px 30px;
            margin-top: 1rem;
        }
    }  
</style>