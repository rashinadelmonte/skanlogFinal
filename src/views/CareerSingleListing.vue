<script setup lang="ts">
    import api from "@/services/apiService";
    import { getCurrentInstance, onMounted, ref, reactive, nextTick } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import { useRouter } from "vue-router";
    import { loadMainJS } from "@/assets/assets/js/main.js"

    const career = ref([]);
    
    const router = useRouter();
    
    const email = reactive({
        recipientEmail: ""
    });

    nextTick(() => {
        loadMainJS();
    })
    
    onMounted(async() => {
        window.scrollTo(0, 0);
        const instance = getCurrentInstance();
        const careerId = instance.proxy.$route.params.careerId;
        
        try {
            const careerDescription = await api.get(`/Career/${careerId}`);
                career.value = careerDescription.data;
                console.log(career.value);

            const getRecipientEmail = await api.get('/ContactInfo');
                 email.recipientEmail = getRecipientEmail.data[0].recipientEmail;
                 console.log(email.recipientEmail);

            const query = router.currentRoute.value.query;
            const applyNowElement = document.getElementById("apply-now");

            if(query.scrollToFooter == "applyNow" && applyNowElement) {
                applyNowElement.scrollIntoView({ behavior: "smooth"});
            }

        } catch(error) {
            console.error(error);
        }
    });
    
   function goBack () {
        router.go(-1);
   }
</script>

<template>
    <Header></Header>
        <div class="single-header">
            <button class="back" @click="goBack">Back to Career</button>
            <h2 class="career-title">{{ career.careerName }}</h2>
            <div class="career-description" v-html="career.careerDescription">
            </div>
            <div class="footer-section" id="apply-now">
                <button class="apply">Apply Now</button>
                <h2>Send your resume here: <span>{{ email.recipientEmail }}</span></h2>
            </div>
        </div>
        
    <Footer></Footer>
</template>

<style>
    .single-header {
        padding: 5rem;
        margin-bottom: 5rem;
        
    }

    .career-title {
        margin-bottom: 5rem;
    }

    .career-description {
        column-count: 1;
        width: 100%;
        font-size: 1.1rem;
        line-height: 1.9rem;
    }

    .single-header span {
        cursor: pointer;
    }

    .single-header h2 {
        text-align: center;
    }

    .single-header .apply {
        background: #3EC1D5 none repeat scroll 0 0;
        border: none;
        color: #fff;
        padding: 10px 35px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        margin-top: 5rem;
    }

    .single-header .back {
        background: #3EC1D5 none repeat scroll 0 0;
        border: none;
        color: #fff;
        padding: 10px 35px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        margin-top: 5rem;
        margin-bottom: 1rem;
    }

    .footer-section {
        display: inline-block;
    }

    .footer-section h2 {
        margin-top: 1.5rem;
        font-size: 2rem;

    }

    .footer-section span {
        font-size: 2rem;
        font-weight: 500;
        opacity: 0.7;
    }

    
    @media (min-width: 320px) and (max-width: 321px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 1.5rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 157%;
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 157%;
            font-size: 1rem;
            line-height: 1.8rem;
            overflow-wrap: break-word;
        }

        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

       

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

      
    @media (min-width: 375px) and (max-width: 376px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .career-title {
            font-size: 2rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 140%;
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 140%;
            font-size: 1rem;
            line-height: 1.8rem;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    @media (min-width: 412px) and (max-width: 415px) { 

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 135%;
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 135%;
            font-size: 1rem;
            line-height: 1.8rem;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    

    @media (min-width: 390px) and (max-width: 395px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .career-title {
            font-size: 2rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 145%;
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 145%;
            font-size: 1rem;
            line-height: 1.8rem;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    @media (min-width: 360px) and (max-width: 361px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .career-title {
            font-size: 2rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 157%;
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 150%;
            font-size: 1rem;
            line-height: 1.8rem;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  


    @media (min-width: 540px) and (max-width: 541px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2.3rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            width: 129%;
            
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            width: 125%;
            font-size: 1rem;
            line-height: 1.8rem;
        }

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    @media (min-width: 280px) and (max-width: 281px) { 

        
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2.3rem;
            margin-bottom: 2rem;
            font-weight: 700;
        
            
        }

        .career-description {
            margin-left: -3rem;
            width: 210%;
            font-size: 1rem;
            line-height: 1.8rem;
            overflow-wrap: break-word;
        }

        
        .career-description h1 {
            font-size: 1.5rem !important;
        }

        .career-description h2 {
            font-size: 1.5rem !important;
        }

        .career-description h3 {
            font-size: 1.5rem !important;
        }

        .career-description h4 {
            font-size: 1.5rem !important;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -4.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  


    @media (min-width: 820px) and (max-width: 821px) { 
        
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2.3rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            font-size: 1.3rem;
            line-height: 1.8rem;
            width: 110%;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -3.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  


    @media (min-width: 912px) and (max-width: 913px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2.3rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            font-size: 1.2rem;
            line-height: 1.8rem;
            width: 110%;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -3.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  


    @media (min-width: 1024px) and (max-width: 1025px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 2.3rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            font-size: 1.3rem;
            line-height: 2rem;
            width: 110%;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -3.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    @media (min-width: 1280px) and (max-width: 1281px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 1.9rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
            
        }

        .career-description {
            margin-left: -3rem;
            font-size: 1rem;
            line-height: 1.8rem;
            width: 108%;
            
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -3.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  

    @media (min-width: 768px) and (max-width: 769px) { 
        .single-header .back {
            margin: 1rem -4rem 0rem;
            padding: 9px 13px;
            margin-bottom: 2rem;
            font-size: 10px;
        }

        .career-title {
            font-size: 1.9rem;
            margin-left: -2.9rem;
            margin-bottom: 2rem;
            font-weight: 700;
          
        }

        .career-description {
            margin-left: -3rem;
            /* text-align: left; */
            font-size: 1.2rem;
            line-height: 1.8rem;
            width: 112%;
        }

        .apply {
            position: relative;
            left: -4rem;
            top: -3rem;
        }

       .footer-section h2 {
            font-size: 1.3rem;
            margin-top: -1rem;
            margin-left: -3.5rem;
            
       }

       .footer-section span {
            font-size: 1.5rem;
            
       } 
    }  
</style>