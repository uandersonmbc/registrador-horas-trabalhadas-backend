import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Project from 'App/Models/Project'

export default class ProjecteSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Project.createMany([
      {
        name: 'Amaggi',
        slug: 'amaggi',
      },
      {
        name: 'Causas Comuns',
        slug: 'causas_comuns',
      },
      {
        name: 'Apoio Comercial',
        slug: 'apoio_comercial',
      },
      {
        name: 'Apoio RH',
        slug: 'apoio_rh',
      },
    ])
  }
}
