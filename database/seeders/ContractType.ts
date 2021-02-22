import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import ContractType from 'App/Models/ContractType'

export default class ContractTypeSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await ContractType.createMany([
      {
        name: 'Contratado',
        hours: 8,
        slug: 'hired',
      },
      {
        name: 'Estagiário',
        hours: 6,
        slug: 'intern',
      },
    ])
  }
}
