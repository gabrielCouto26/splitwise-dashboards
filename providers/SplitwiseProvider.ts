import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ExpenseService from 'App/Services/ExpenseService';
import SplitwiseClient from 'App/Integrators/SplitwiseClient';

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class SplitwiseProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Registra SplitwiseClient
    this.app.container.singleton('ioc:SplitwiseClient', (app) => {
      const HttpClient = app.use('ioc:HttpClient')
      return new SplitwiseClient({ HttpClient });
    });

    // Registra ExpenseService
    this.app.container.singleton('ioc:ExpenseService', (app) => {
      const Expense = app.use('App/Models/Expense').default
      const SplitwiseClient = app.use('ioc:SplitwiseClient')
      return new ExpenseService({ SplitwiseClient, Expense });
    });
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
