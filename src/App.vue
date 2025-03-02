<script setup lang="ts">
import { RouterView } from 'vue-router'
// import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <h1>Loading...</h1>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
