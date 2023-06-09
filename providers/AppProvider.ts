import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import GroupController from 'App/Controllers/Http/GroupController';
import IHttpClientConstructor from 'App/Interfaces/Http/IHttpClientConstructor';

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Registra GroupController
    this.app.container.singleton('App/Controllers/Http/GroupController', (app) => {
      const SplitwiseService = app.use('ioc:SplitwiseService')
      return new GroupController({ SplitwiseService });
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
