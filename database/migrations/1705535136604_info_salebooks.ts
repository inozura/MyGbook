import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'info_sale_books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bookmark_id').unsigned().references('bookmarks.id').onDelete('CASCADE')
      table.string('country')
      table.string('saleability')
      table.boolean('is_ebook')
      table.json('list_price')
      table.json('retail_price')
      table.string('buy_link')
      table.json('offers')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
