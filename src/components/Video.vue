<script setup lang="ts">
    import  video from "@/assets/video/my-video.mp4"
</script>

<template>
    <section id="hero">
      <video autoplay loop muted style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;">
        <source :src="video" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <!-- Add your content here -->
      <div class="hero-container">
        <!-- Your content goes here -->
       
      </div>
    </section>
  </template>