import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Type from 'App/Models/Type'

export default class TypeSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Type.createMany([
      {
        name: 'Trabalho',
        slug: 'work',
      },
      {
        name: 'Café',
        slug: 'coffee',
      },
      {
        name: 'Almoço',
        slug: 'lunch',
      },
      {
        name: 'Ausente',
        slug: 'absent',
      },
    ])
  }
}
