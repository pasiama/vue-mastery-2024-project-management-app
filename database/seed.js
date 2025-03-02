import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://shkqwiehqpylkhgibnsz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa3F3aWVocXB5bGtoZ2libnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDg2MDI3MSwiZXhwIjoyMDU2NDM2MjcxfQ.vdyHFasyDLWct_OsMpkGva-sKpsAXOB9BQtvCZlV1Gw',
)

const LogErrorAndExit = (tableName, error) => {
  console.error(
    `An error occured in table '${tableName}' with code '${error.code}' and message '${error.message}'`,
  )
  process.exit(1)
}

const LogStep = (stepMessage) => {
  console.log(stepMessage)
}

const SeedProjects = async (numEntries) => {
  LogStep(`Seeding ${numEntries} projects...`)
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements(['Kofi', 'Ama', 'Yaa']),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')
  if (error) {
    LogErrorAndExit('projects', error)
  }
  return data
}

await SeedProjects(10)

const SeedTasks = async (numEntries, projectsIds) => {
  LogStep(`Seeding ${numEntries} tasks...`)
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    tasks.push({
      name,
      project_id: faker.helpers.arrayElement(projectsIds),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      collaborators: faker.helpers.arrayElements(['Kofi', 'Ama', 'Yaa']),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
      title: faker.lorem.words(6),
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) {
    LogErrorAndExit('tasks', error)
  }
  return data
}

// const seedDatabase = async (numEntriesPerTable) => {
//   const projectsIds = (await SeedProjects(numEntriesPerTable)).map((project) => project.id)
//   return await SeedTasks(numEntriesPerTable, projectsIds)
// }
const seedDatabase = async (numEntriesPerTable) => {
  const projects = await SeedProjects(numEntriesPerTable)

  if (!projects || !Array.isArray(projects)) {
    throw new Error(
      'SeedProjects did not return an array. Check your database connection and seeding logic.',
    )
  }

  const projectsIds = projects.map((project) => project.id)
  return await SeedTasks(numEntriesPerTable, projectsIds)
}
const numEntriesPerTable = 10

await seedDatabase(numEntriesPerTable)
