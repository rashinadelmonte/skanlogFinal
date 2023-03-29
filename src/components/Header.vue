<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Logo from "@/assets/assets/img/CompanyLogo/SkanlogLogoHD.png"
</script>

<template>
    <!-- ======= Header ======= -->
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex justify-content-between">

      <div class="logo">
        <h1><router-link to="/"><span>Skanlog</span>PH</router-link></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'Landing' }" to="/">Home</router-link></li>
          <!-- <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'About' }" to="/about">About</router-link></li> -->
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'Career' }" to="/career">Careers</router-link></li>
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'Gallery' }" to="/gallery">Gallery</router-link></li>
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'Elev' }" to="/elev">Elev</router-link></li>
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'News' }" to="/news">News And Events</router-link></li>
          <li><router-link class="nav-link scrollto" :class="{ active : useRoute().name == 'Contact' }" to="/contact">Contacts</router-link></li>
          <!-- <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><a href="#">Deep Drop Down 5</a></li>
                </ul>
              </li>
              <li><a href="#">Drop Down 2</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li> -->
        </ul>   
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
</template>

<style>
    #header {
        background-color: #1A1F26 !important
    }
</style>