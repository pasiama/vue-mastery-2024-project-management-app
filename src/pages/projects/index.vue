<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { h, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
// import DataTable from '@/components/ui/datatable/DataTable.vue'
import { RouterLink } from 'vue-router'
// import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[] | null>(null)

const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) {
    console.log('ERROR MESSAGE', error)
  }
  projects.value = data
}
await getProjects()

const statusColors: Record<string, string> = {
  Completed: 'bg-green-500 text-white',
  'In Progress': 'bg-yellow-500 text-white',
  Pending: 'bg-gray-500 text-white',
  Overdue: 'bg-red-500 text-white',
}

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted w-full block',
        },
        () => row.getValue('name'),
      )
    },
  },

  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Slug'),
    cell: ({ row }) => {
      const slug = row.getValue('slug') || 'No Slug'

      return h('div', { class: 'text-left text-gray-500' }, slug)
    },
  },

  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Status'),
    cell: ({ row }) => {
      const status = row.getValue('status') || 'Pending'
      return h(
        'span',
        {
          class: `px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || 'bg-gray-500 text-white'}`,
        },
        status,
      )
    },
  },
]
</script>
<template>
  <main>
    <DataTable v-if="projects" :columns="columns" :data="projects" />
  </main>
</template>
