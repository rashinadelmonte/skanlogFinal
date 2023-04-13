<!-- <script lang="ts">


export default {
  name: 'app',
  components: {
	vueRecaptcha
  },
  data() {
	return { showRecaptcha: false }
  },
  methods: {
	recaptchaVerified(response) {
	},
	recaptchaExpired() {
	  this.$refs.vueRecaptcha.reset();
	},
	recaptchaFailed() {
	}
  }
};
</script> -->

<script setup lang="ts">
  import { computed, onMounted, ref, reactive, watch } from "vue";
  import api from "@/services/apiService";
  import vueRecaptcha from 'vue3-recaptcha2';
  import { ElMessage } from 'element-plus'

 /*  import { useToast } from 'vue-toastification'; */
  
    const map = reactive({
      center: { lat: 0, lng: 0 },
    });

    const isLoading = reactive({ status: true });

    const loading = reactive({
      status: false,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    
    const name = ref('');
    const message = ref('');
    const senderEmail = ref('');
    const getAddress = ref({});
    const subject = ref('');
    const getEmail = ref({});
    const getPhoneNumber = ref({});
    const contactDetails = ref([]);
    const isVerified = ref(false);
    const getRecipientEmail = ref({});

    /* const toast = useToast(); */

    onMounted(async() => {
        try {
          const responseLocation = await api.get("/Location");
          contactDetails.value = responseLocation.data;
          getAddress.value = responseLocation.data[0].address;
          isLoading.status = false;
          console.log(getAddress.value)
          
          const { latitude, longitude } = contactDetails.value[0];
            map.center = { lat: latitude, lng: longitude };

          const responseEmail = await api.get("/ContactInfo");
            getEmail.value = responseEmail.data[0].recipientEmail;
            getPhoneNumber.value = responseEmail.data[0].officePhoneNumber
            getRecipientEmail.value = responseEmail.data[0].contactInfoId
            isLoading.status = false;

        } catch (error) {
          console.error(error);
        }
    });


    const verifyCallback = (async(response: any) => {
        if (response) {
          isVerified.value = true;
        }
    })

    async function handleSubmit (event: any) {
      event.preventDefault();

        if (!isVerified.value) {
          ElMessage.error("Please complete the reCAPTCHA verification");
          return;
        }
        // Get form data
        const formData = {
          name: name.value,
          senderEmail: senderEmail.value,
          subject: subject.value,
          contactInfoId: getRecipientEmail.value,
          message: message.value
        };
        
        try {
          loading.status = true;
          // Send form data to server-side endpoint
          const response = await api.post('/Inquiry', formData);
          console.log(response);
          // Handle response as needed

          ElMessage.success("Successfully Submitted");
         
          window.location.href = '/contact'; 
        } catch (error) {
          // Handle error as needed
          console.error(error);
        }
        loading.status = false;
    };

    function recaptchaExpired () {
      this.$refs.vueRecaptcha.reset();
    }

    function recaptchaFailed () {
      
    }
</script>

<template>
    <!-- <ToastContainer /> -->
    <div class="loader-line" v-if="isLoading.status"></div>
     <div id="contact" class="contact-area" v-else v-loading="loading.status" :text="loading.text">
      <div class="contact-inner">
        <div class="contact-overly"></div>
        <div class="container ">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="section-headline text-center">
                <h2>Contact us</h2>
              </div>
            </div>
          </div>
          <div class="row contact-details">
            <!-- Start contact icon column -->
            <div class="col-md-4">
              <div class="contact-icon text-center">
                <div class="single-icon">
                  <i class="bi bi-phone"></i>
                  <p>
                    Call: {{ getPhoneNumber }}<br>
                    <span>Monday-Friday (9am-5pm)</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- Start contact icon column -->
            <div class="col-md-4">
              <div class="contact-icon text-center">
                <div class="single-icon">
                  <i class="bi bi-envelope"></i>
                  <p>
                    {{ getEmail }}<br>
                   <!--  <span>Web: www.example.com</span> -->
                  </p>
                </div>
              </div>
            </div>
            <!-- Start contact icon column -->
            <div class="col-md-4">
              <div class="contact-icon text-center">
                <div class="single-icon">
                  <i class="bi bi-geo-alt"></i>
                  <p>
                    <!-- Location: A108 Adam Street<br> -->
                    <span>{{ getAddress }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">

            <!-- Start Google Map -->
            <div class="col-md-6">
              <!-- Start Map -->
              <GMapMap
                style="width: 100%; height: 500px"
                :center="map.center"
                :zoom="15"
                class="google-map"
              >
                <GMapMarker :options="{ position: map.center }" />
              </GMapMap>
              <!-- End Map -->
            </div>
            <!-- End Google Map -->

            <!-- Start  contact -->
            <div class="col-md-6">
              <div class="form contact-form">
                <form class="php-email-form" @submit="handleSubmit">
                  <div class="form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required v-model="name">
                  </div>
                  <div class="form-group mt-3">
                    <input type="email" class="form-control" name="senderEmail" id="email" placeholder="Your Email" required v-model="senderEmail">
                  </div>
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required v-model="subject">
                  </div>
                  <!-- <div class="form-group mt-3">
                    <input type="text" class="form-control" name="RecipientEmail" id="subject" placeholder="Your Recipient Email" required>
                  </div> -->
                  <div class="form-group mt-3">
                    <textarea class="form-control" name="message" rows="5" placeholder="Message" required v-model="message"></textarea>
                  </div> 
                  <div class="mt-3 text-center captcha">
                    <vue-recaptcha
                      sitekey="6LfQAVglAAAAAPiSs63EPHUOhqVaHE4rok0q1gHs"
                      @verify="verifyCallback"
                      @expire="recaptchaExpired"
                      @fail="recaptchaFailed"
                     
                      >
                    </vue-recaptcha>
                  </div> 

                 <!--  <div class="my-3">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">Your message has been sent. Thank you!</div>
                  </div> -->
                  <div class="text-center"><button type="submit">Send Message</button></div>
                </form>
              </div>
            </div>
            <!-- End Left contact -->
          </div>
        </div>
      </div>
    </div><!-- End Contact Section -->
</template>


<style>
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

  .form { 
    margin-bottom: 10rem;
  }

  .contact-details {
    position: relative;
    top: -2rem;
  }

  .captcha {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .google-map {
    margin-bottom: 1.9rem;
  }

  @media (min-width: 820px) and (max-width: 821px) {
    .google-map {
       width: 110%;
       position: relative;
       left: -2.5rem;
   }
  }


  @media (min-width: 912px) and (max-width: 912px) {
    .google-map {
       width: 130%;
       position: relative;
       left: -5.5rem;
   }
  }
</style>




