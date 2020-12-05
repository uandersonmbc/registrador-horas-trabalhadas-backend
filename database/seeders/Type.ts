import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Activity from 'App/Models/Activity'

export default class ActivitySeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Activity.createMany([
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
