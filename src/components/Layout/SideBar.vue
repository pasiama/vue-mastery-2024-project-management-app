<script setup lang="ts">
// Sidebar toggle state
import { ref } from 'vue'
// import SideBarLinks from '@/components/Layout/SideBarLinks.vue'

const isSidebarOpen = ref(true)
const link = [
  { icon: 'lucide:home', title: 'Dashboard', to: '/dashboard' },
  { icon: 'lucide:briefcase', title: 'Projects', to: '/projects' },
  { icon: 'lucide:check-square', title: 'Tasks', to: '/tasks' },
  { icon: 'lucide:calendar', title: 'Calendar', to: '/calendar' },
]

const bottomLink = [
  { icon: 'lucide:user', title: 'Profile', to: '/profile' },
  { icon: 'lucide:settings', title: 'Settings', to: '/settings' },
  { icon: 'lucide:log-out', title: 'Sign Out', to: '/signout' },
]
</script>
<template>
  <aside
    :class="isSidebarOpen ? 'w-64' : 'w-16'"
    class="h-full bg-gray-900 text-white flex flex-col transition-all duration-300"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4">
      <span v-if="isSidebarOpen" class="text-lg font-semibold">ProjectApp</span>
      <button @click="isSidebarOpen = !isSidebarOpen" class="text-gray-300">
        <iconify-icon
          :icon="isSidebarOpen ? 'lucide:chevron-left' : 'lucide:chevron-right'"
          class="text-xl"
        ></iconify-icon>
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1">
      <SideBarLinks :links="link" :isSidebarOpen="isSidebarOpen" />
    </nav>

    <!-- Bottom Profile Section -->
    <div class="mt-auto">
      <SideBarLinks :links="bottomLink" :isSidebarOpen="isSidebarOpen" />
    </div>
  </aside>
</template>
