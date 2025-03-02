<script setup lang="ts">
// import { usePageStore } from '@/stores/page'
// import { storeToRefs } from 'pinia'
// import TopNavBar from '@/components/Layout/TopNavBar.vue'
// import SideBar from '@/components/Layout/SideBar.vue'

const { pageData } = storeToRefs(usePageStore())
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <SideBar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navbar -->
      <TopNavBar />

      <!-- Page Content -->
      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p6">
        <div class="flex items-center">
          <h1 class="text-2xl font-semibold">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
