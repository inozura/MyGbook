/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Public
Route.group(() => {
  Route.get('/search', 'GbooksController.search')

  Route.post('/login', 'UsersController.login')
  Route.post('/register', 'UsersController.register')
}).prefix('api')

Route.group(() => {
  // Auth
  Route.post('/logout', 'UsersController.logout')

  Route.get('/bookmark', 'BookmarksController.index')
  Route.post('/bookmark', 'BookmarksController.create')
  Route.delete('/bookmark', 'BookmarksController.destroy')
})
  .middleware('apiAuth')
  .prefix('api')

Route.get('/', async () => {
  return { hello: 'world' }
})
