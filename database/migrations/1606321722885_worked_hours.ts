import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WorkedHours extends BaseSchema {
  protected tableName = 'worked_hours'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
      table.integer('activity_id').unsigned().notNullable().references('id').inTable('activities')
      table.timestamp('start')
      table.timestamp('end')
      table.boolean('accounted').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
