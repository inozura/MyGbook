import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'info_volume_books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bookmark_id').unsigned().references('bookmarks.id').onDelete('CASCADE')
      table.string('title')
      table.json('authors')
      table.string('publisher')
      table.string('published_date')
      table.text('description')
      table.json('reading_modes')
      table.integer('page_count')
      table.integer('printed_page_count')
      table.string('print_type')
      table.json('categories')
      table.float('average_rating')
      table.integer('ratings_count')
      table.string('maturity_rating')
      table.boolean('allow_anon_logging')
      table.string('content_version')
      table.json('panelization_summary')
      table.json('image_links')
      table.string('language')
      table.string('preview_link')
      table.string('info_link')
      table.string('canonical_volume_link')

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
