import Env from '@ioc:Adonis/Core/Env'
import Splitwise from 'splitwise'

export default class SplitwiseFactory {
  private static instance: Splitwise

  private constructor() {
    const consumerKey = Env.get('SPLITWISE_CONSUMER_KEY', '')
    const consumerSecret = Env.get('SPLITWISE_CONSUMER_SECRET', '')
    if (!consumerKey || !consumerSecret)
      throw new Error('SPLITWISE_CONSUMER_KEY and SPLITWISE_CONSUMER_SECRET must be set in .env')

    return Splitwise({ consumerKey, consumerSecret })
  }

  public static getInstance(): Splitwise {
    if (!SplitwiseFactory.instance) {
      SplitwiseFactory.instance = new SplitwiseFactory()
    }

    return SplitwiseFactory.instance
  }
}