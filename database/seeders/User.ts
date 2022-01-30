import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'mario@garantia.com',
        password: 'secret',
        username: 'Mario de la cruz',
        phone: '3312182604',
      },
      {
        email: 'julio@garantia.com',
        password: 'supersecret',
        username: 'Julio Boris',
        phone: '6541561561',
      },
    ])
    {
      // Write your database queries inside the run method
    }
  }
}
