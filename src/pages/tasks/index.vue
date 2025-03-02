<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { h, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table'
// import DataTable from '@/components/ui/datatable/DataTable.vue'
import { RouterLink } from 'vue-router'
import { usePageStore } from '@/stores/page'

usePageStore().pageData.title = 'Tasks'
const tasks = ref<Tables<'tasks'>[] | null>(null)

const getTasks = async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) {
    console.log('ERROR MESSAGE', error)
  }
  tasks.value = data
}

await getTasks()

// Define status colors
const statusColors: Record<string, string> = {
  Completed: 'bg-green-500 text-white',
  'In Progress': 'bg-yellow-500 text-white',
  Pending: 'bg-gray-500 text-white',
  Overdue: 'bg-red-500 text-white',
}

// Define priority colors
const priorityColors: Record<string, string> = {
  High: 'bg-red-600 text-white',
  Medium: 'bg-orange-500 text-white',
  Low: 'bg-green-500 text-white',
}

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },

  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Description'),
    cell: ({ row }) => {
      const description = row.getValue('description') || 'No description'
      const truncatedText =
        description.length > 15 ? description.substring(0, 15) + '...' : description
      return h('div', { class: 'text-left text-gray-500' }, truncatedText)
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Due Date'),
    cell: ({ row }) => {
      const dueDate = row.getValue('due_date')
      return h(
        'div',
        { class: 'text-left font-medium' },
        dueDate
          ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(dueDate))
          : 'N/A',
      )
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Collaborators'),
    cell: ({ row }) => {
      const collaborators = row.getValue('collaborators') || []
      return h(
        'div',
        { class: 'flex space-x-2' },
        collaborators.length
          ? collaborators.map((collaborator: any) =>
              h('img', {
                src: collaborator.avatar_url,
                alt: collaborator.name,
                class: 'w-8 h-8 rounded-full border border-gray-300',
              }),
            )
          : 'No collaborators',
      )
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
  {
    accessorKey: 'priority',
    header: () => h('div', { class: 'text-left font-semibold' }, 'Priority'),
    cell: ({ row }) => {
      const priority = row.getValue('priority')
      return h('div', { class: `text-left ${priorityColors[priority]}` }, priority)
    },
  },
]
</script>
<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
