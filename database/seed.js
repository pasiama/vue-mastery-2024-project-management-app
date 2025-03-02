import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://shkqwiehqpylkhgibnsz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoa3F3aWVocXB5bGtoZ2libnN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDg2MDI3MSwiZXhwIjoyMDU2NDM2MjcxfQ.vdyHFasyDLWct_OsMpkGva-sKpsAXOB9BQtvCZlV1Gw',
)

const SeedProjects = async (numEntries) => {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements(['']),
    })
  }

  await supabase.from('projects').insert(projects)
}

await SeedProjects(10)
