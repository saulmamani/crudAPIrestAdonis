'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DirectorioSchema extends Schema {
  up () {
    this.create('directorios', (table) => {
      table.increments()
      table.string('nombre_completo', 100);
      table.string('direccion').nullable();
      table.integer('telefono').unique();
      table.string('url_foto').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('directorios')
  }
}

module.exports = DirectorioSchema
