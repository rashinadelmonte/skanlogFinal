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
            <div class="row justify-content-center mb-5">
                <div class="col-12 col-md-10 col-lg-8">
                    <form class="card card-sm">
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                                <i class="fas fa-search h4 text-body"></i>
                            </div>
                            <div class="col">
                                <input 
                                    class="form-control form-control-lg form-control-borderless"
                                    type="search" 
                                    placeholder="Search job by title"
                                    v-model="state.searchTerm"
                                >
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-lg btn-success">Search</button>
                            </div>
                        </div>
                    </form>
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

<style lang="scss">
     @import 'bootstrap/scss/functions';
     @import 'bootstrap/scss/variables';
     @import 'bootstrap/scss/mixins';

     .form-control-borderless {
         border: none;
    }

    .form-control-borderless:hover, .form-control-borderless:active, .form-control-borderless:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .card {
        border-radius: 1.3rem;
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

   
    #career-footer {
        column-gap: 0.5rem;
        display: flex;
    }

    #career-overview{
        overflow-wrap: break-word;
        height: 70px;
        margin-bottom: 134px;
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
    }

    .career-item button a{
        background: #444 none repeat scroll 0 0;
        border: 1px solid #444;
        color: #fff;
        margin-bottom: 25px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
    }

    .career-item button:nth-child(2) {
        background-color: #3EC1D5;
        outline: none;
        border: none;
    }
</style>