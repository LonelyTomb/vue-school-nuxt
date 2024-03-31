<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/posts' })
</script>

<template>
  <div class="prose min-h-screen mx-auto flex justify-center items-center flex-col">
    <h1 class="text-4xl lg:text-[10rem] lg:leading-[10rem] mb-0">{{ error?.statusCode }}</h1>
    <p>We could not find the post you were looking for</p>
    <button @click="handleError" class="px-6 py-2 bg-black text-white rounded">Back to Home</button>
  </div>
</template>