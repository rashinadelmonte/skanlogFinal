<script setup lang="ts">
    import api from "@/services/apiService";
    import { getCurrentInstance, onMounted, ref, reactive } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import { useRouter } from "vue-router";

    const career = ref([]);
    
    const router = useRouter();
    
    const email = reactive({
        recipientEmail: ""
    });


    onMounted(async() => {
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
            <button @click="goBack">Back to Career</button>
            <h2>{{ career.careerName }}</h2>
            <div class="career-description" v-html="career.careerDescription">
            </div>
            <div class="footer-section" id="apply-now">
                <button>Apply Now</button>
                <h2>Send your resume here: <span>{{ email.recipientEmail }}</span></h2>
            </div>
        </div>
    <Footer></Footer>
</template>

<style>
    .single-header {
        margin-top: 5rem;
        padding: 5rem;
        margin-bottom: 5rem;
        
    }

    .single-header span {
        cursor: pointer;
    }

    .single-header h2 {
        text-align: center;
    }

    .single-header button {
        background: #3EC1D5 none repeat scroll 0 0;
        border: none;
        color: #fff;
        padding: 10px 35px;
        text-transform: uppercase;
        transition: all 0.4s ease 0s;
        border-radius: 30px;
        margin-top: 5rem;
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
</style>