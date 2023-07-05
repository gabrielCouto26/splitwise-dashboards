import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ExpenseController from 'App/Controllers/Http/ExpenseController';
import IHttpClientConstructor from 'App/Interfaces/Http/IHttpClientConstructor';

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Registra ExpenseController
    this.app.container.singleton('App/Controllers/Http/ExpenseController', (app) => {
      const ExpenseService = app.use('ioc:ExpenseService')
      return new ExpenseController({ ExpenseService });
    })

    // Registra HttpClient
    this.app.container.singleton('ioc:HttpClient', (app) => {
      return ({ baseURL, bearerToken }: IHttpClientConstructor) => {
        const { HttpClient } = app.use('Config/axios')
        if (bearerToken)
          return HttpClient({ baseURL, bearerToken })
        return HttpClient({ baseURL })
      }
    })
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
