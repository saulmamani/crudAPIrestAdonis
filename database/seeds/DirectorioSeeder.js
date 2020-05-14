'use strict'

/*
|--------------------------------------------------------------------------
| DirectorioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class DirectorioSeeder {
  static async run () {
    await Database.table('directorios').insert([
      {
        nombre_completo: "Saul Mamani M",
        direccion: "Plan 400 y jaen, Oruro",
        telefono: 76137269,
        url_foto: null,
      },
      {
        nombre_completo: "Lidia Marce",
        direccion: "Plan 3000 y jaen, Santa Cruz",
        telefono: 76765432,
        url_foto: null,
      },
    ])
  }
}

module.exports = DirectorioSeeder
