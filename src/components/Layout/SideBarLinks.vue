<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface SidebarLinkProps {
  icon: string
  title: string
  to: string
}

//props
defineProps<{ links: SidebarLinkProps[]; isSidebarOpen: boolean }>()
</script>

<template>
  <RouterLink
    exactActiveClass="text-primary bg-muted"
    v-for="link in links"
    :key="link.title"
    :to="link.to"
    class="flex items-center px-4 py-3 hover:bg-gray-800 transition"
  >
    <iconify-icon :icon="link.icon" class="mr-3 text-lg"></iconify-icon>
    <span v-if="isSidebarOpen">{{ link.title }}</span>
  </RouterLink>
</template>
