import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import ExpenseController from 'App/Controllers/Http/ExpenseController';
import IHttpClientConstructor from 'App/Interfaces/Http/IHttpClientConstructor';
import SplitwiseClient from 'App/Integrators/SplitwiseClient';
import ExpenseService from 'App/Services/ExpenseService';

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
