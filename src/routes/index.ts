import {createRouter, createWebHistory} from 'vue-router'
import LandingPage from "@/views/LandingPage.vue";
/* import AboutView from "@/views/AboutView.vue"; */
import ServicesView from "@/views/ServicesView.vue";
import ElevView from "@/views/ElevView.vue";
import GalleryView from "@/views/GalleryView.vue";
import NewsAndEvents from "@/views/NewsAndEvents.vue";
import CareerView from "@/views/CareerView.vue"
import ContactView from "@/views/ContactView.vue"
import CareerListing from "@/views/CareerSingleListing.vue"
import NewsSingleListing from "@/views/NewsSingleListing.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          meta: {
            title: "Landing Page",
          },
          path: "/",
          name: "Landing",
          component: LandingPage,
        },

        {
          meta: {
            title: "Services Page",
          },
          path: "/services",
          name: "Services",
          component: ServicesView,
        },

        {
          meta: {
            title: "Elev Page",
          },
          path: "/elev",
          name: "Elev",
          component: ElevView,
        },

        {
          meta: {
            title: "Gallery Page",
          },
          path: "/gallery",
          name: "Gallery",
          component: GalleryView,
        },

        {
          meta: {
            title: "News Page",
          },
          path: "/news",
          name: "news",
          component: NewsAndEvents,
        },

        {
          meta: {
            title: "NewsSingleListing",
          },
          path: "/news/:newsAndEventsId",
          name: "News Article",
          component: NewsSingleListing,
        },


        {
          meta: {
            title: "Careers Page",
          },
          path: "/career",
          name: "Career",
          component: CareerView,
        },

        {
          meta: {
            title: "Careers Single Listing Page",
          },
          path: "/career/:careerId",
          name: "CareerDetails",
          component: CareerListing,
        },


        {
          meta: {
            title: "Contact Page",
          },
          path: "/contact",
          name: "contact",
          component: ContactView,
        }
    ]
})



export default router