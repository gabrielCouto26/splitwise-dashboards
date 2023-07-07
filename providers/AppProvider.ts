import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import GroupController from 'App/Controllers/Http/GroupController';
import IHttpClientConstructor from 'App/Interfaces/Http/IHttpClientConstructor';
import SplitwiseClient from 'App/Integrators/SplitwiseClient';
import SplitwiseService from 'App/Services/SplitwiseService';
import ExpenseService from 'App/Services/ExpenseService';
import GroupService from 'App/Services/GroupService';

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Registra GroupController
    this.app.container.singleton('App/Controllers/Http/GroupController', (app) => {
      const GroupService = app.use('ioc:GroupService')
      const ExpenseService = app.use('ioc:ExpenseService')
      return new GroupController({ GroupService, ExpenseService });
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

    // Registra SplitwiseService
    this.app.container.singleton('ioc:SplitwiseService', (app) => {
      const Expense = app.use('App/Models/Expense').default
      const SplitwiseClient = app.use('ioc:SplitwiseClient')
      return new SplitwiseService({ SplitwiseClient, Expense });
    });

    // Registra ExpenseService
    this.app.container.singleton('ioc:ExpenseService', (app) => {
      const ExpenseRepository = require('App/Repositories/ExpenseRepository').default
      return new ExpenseService({ ExpenseRepository });
    });

    // Registra GroupService
    this.app.container.singleton('ioc:GroupService', (app) => {
      const SplitwiseClient = app.use('ioc:SplitwiseClient')
      return new GroupService({ SplitwiseClient });
    });
  }

  public async boot () {
    // IoC container is ready
    await this.app.container.use('ioc:SplitwiseService').loadExpenses()
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
