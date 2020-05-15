'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Pagina de contactos' }
})


Route.post('users', 'UserController.store');
Route.post('login', 'UserController.login');

Route.group(() => {
  Route.resource('directorios', 'DirectorioController').apiOnly();
  Route.post('cargar_foto/:id', 'DirectorioController.cargarFoto');

  Route.get('user', 'UserController.getUser');
  Route.post('logout', 'UserController.logout');
}).middleware('auth');



