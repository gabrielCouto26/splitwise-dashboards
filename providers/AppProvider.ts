import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import GroupController from 'App/Controllers/Http/GroupController';

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Registra GroupController
    this.app.container.singleton('App/Controllers/Http/GroupController', (app) => {
      const SplitwiseService = app.use('App/Services/SplitwiseService')
      return new GroupController({ SplitwiseService });
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
