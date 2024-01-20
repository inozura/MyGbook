import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'info_access_books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bookmark_id').unsigned().references('bookmarks.id').onDelete('CASCADE')
      table.string('country')
      table.string('viewability')
      table.boolean('embeddable')
      table.boolean('public_domain')
      table.string('text_to_speech_permission')
      table.json('epub')
      table.json('pdf')
      table.string('web_reader_link')
      table.string('access_view_status')
      table.boolean('quote_sharing_allowed')

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
