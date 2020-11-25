import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WorkedHours extends BaseSchema {
  protected tableName = 'worked_hours'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.uuid('type_id').references('id').inTable('types').onDelete('CASCADE')
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
