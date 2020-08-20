import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello');
}

export async function queryList(data: any): Promise<any> {
  return request('/api/list', { data });
}

export async function queryHeroList(): Promise<any> {
  return request('/api/herolist.json');
}

export async function getHeroDetails(params: any): Promise<any> {
  return request('/api/herodetails.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
