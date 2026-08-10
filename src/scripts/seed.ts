import { getPayload } from 'payload'
import config from '../../payload.config'

export async function seedDatabase() {
  const payload = await getPayload({ config })

  // Check if admin user already exists
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'yoelkys.rrg@gmail.com',
      },
    },
  })

  if (existingUsers.docs.length === 0) {
    console.log('Creando usuario administrador inicial: yoelkys.rrg@gmail.com')
    await payload.create({
      collection: 'users',
      data: {
        email: 'yoelkys.rrg@gmail.com',
        password: 'Dev@123!',
        name: 'Yoelkys - Admin Krylosys',
        role: 'admin',
      },
    })
    console.log('Usuario yoelkys.rrg@gmail.com creado con éxito.')
  } else {
    console.log('El usuario administrador yoelkys.rrg@gmail.com ya existe.')
  }
}

seedDatabase()
  .then(() => {
    console.log('Proceso de seeding completado.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error al ejecutar seeding:', err)
    process.exit(1)
  })
