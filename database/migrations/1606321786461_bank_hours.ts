import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BankHours extends BaseSchema {
  protected tableName = 'bank_hours'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.integer('amount_hours').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
