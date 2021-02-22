import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContractTypesSchema extends BaseSchema {
  protected tableName = 'contract_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable()
      table.integer('hours').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
