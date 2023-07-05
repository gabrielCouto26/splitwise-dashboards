import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigint('id').notNullable()
      table.bigint('group_id').nullable()
      table.string('description').nullable()
      table.string('details').nullable()
      table.string('cost').nullable()
      table.string('date').nullable()
      table.string('created_at').notNullable()
      table.string('updated_at').nullable()
      table.string('deleted_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
