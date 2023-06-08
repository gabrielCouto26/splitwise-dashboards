import Env from '@ioc:Adonis/Core/Env'
import ISplitwiseService from 'App/Interfaces/Services/ISplitwiseService'
import Splitwise from 'splitwise'

export default class SplitwiseFactory {
  private static instance: ISplitwiseService

  private constructor() {
    const consumerKey = Env.get('SPLITWISE_CONSUMER_KEY', '')
    const consumerSecret = Env.get('SPLITWISE_CONSUMER_SECRET', '')
    if (!consumerKey || !consumerSecret)
      throw new Error('SPLITWISE_CONSUMER_KEY and SPLITWISE_CONSUMER_SECRET must be set in .env')

    return Splitwise({ consumerKey, consumerSecret })
  }

  public static getInstance(): Splitwise {
    if (!SplitwiseFactory.instance) {
      SplitwiseFactory.instance = new SplitwiseFactory() as ISplitwiseService
    }

    return SplitwiseFactory.instance
  }
}