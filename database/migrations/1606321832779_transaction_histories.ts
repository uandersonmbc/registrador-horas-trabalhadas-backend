import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionHistories extends BaseSchema {
  protected tableName = 'transaction_histories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.integer('previous_hours').defaultTo(0)
      table.integer('later_hours').defaultTo(0)
      table.integer('hours').defaultTo(0)
      table.boolean('added').notNullable()
      table.date('date')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
