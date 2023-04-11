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
    })

    const getAddress = ref({})
    const getEmail = ref({});
    const getPhoneNumber = ref({});
    const contactDetails = ref([]);
    const isVerified = ref(false);
    const getRecipientEmail = ref({});
    /* const toast = useToast(); */

    onMounted(async() => {
      const responseLocation = await api.get("/Location");
        contactDetails.value = responseLocation.data;
        getAddress.value = responseLocation.data[0].address;
        console.log(getAddress.value)
        
      const { latitude, longitude } = contactDetails.value[0];
        map.center = { lat: latitude, lng: longitude };

      const responseEmail = await api.get("/ContactInfo");
        getEmail.value = responseEmail.data[0].recipientEmail;
       /*  getEmail.value = responseEmail.data;
        console.log(getEmail.value); */
        getPhoneNumber.value = responseEmail.data[0].officePhoneNumber
        getRecipientEmail.value = responseEmail.data[0].contactInfoId
        console.log("contact info id", getRecipientEmail.value);
    })


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
          name: event.target.name.value,
          senderEmail: event.target.senderEmail.value,
          subject: event.target.subject.value,
          contactInfoId: getRecipientEmail.value,
          message: event.target.message.value
        };

        try {
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
    };

    function recaptchaExpired () {
      this.$refs.vueRecaptcha.reset();
    }

    function recaptchaFailed () {
      
    }
</script>

<template>
    <!-- <ToastContainer /> -->
     <div id="contact" class="contact-area">
      <div class="contact-inner area-padding">
        <div class="contact-overly"></div>
        <div class="container ">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="section-headline text-center">
                <h2>Contact us</h2>
              </div>
            </div>
          </div>
          <div class="row">
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
              >
                <GMapMarker :options="{ position: map.center }" />
              </GMapMap>
              <!-- End Map -->
            </div>
            <!-- End Google Map -->

            <!-- Start  contact -->
            <div class="col-md-6">
              <div class="form contact-form">
                <form class="php-email-form"  @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required>
                  </div>
                  <div class="form-group mt-3">
                    <input type="email" class="form-control" name="senderEmail" id="email" placeholder="Your Email" required>
                  </div>
                  <div class="form-group mt-3">
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
                  </div>
                  <!-- <div class="form-group mt-3">
                    <input type="text" class="form-control" name="RecipientEmail" id="subject" placeholder="Your Recipient Email" required>
                  </div> -->
                  <div class="form-group mt-3">
                    <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                  </div> 
                  <div class="form-group mt-3 captcha">
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




