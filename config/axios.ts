import IHttpClientConstructor from 'App/Interfaces/Http/IHttpClientConstructor';
import axios from 'axios';

export const HttpClient = ({ baseURL, bearerToken }: IHttpClientConstructor) => {
  if (!baseURL)
    throw new Error('Base URL is required')

  const instance = axios.create({ baseURL })
  
  if (bearerToken)
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken

  return instance
}
