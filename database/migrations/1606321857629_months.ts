import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Months extends BaseSchema {
  protected tableName = 'months'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.integer('year').notNullable()
      table.integer('month').notNullable()
      table.integer('amount_hours').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
