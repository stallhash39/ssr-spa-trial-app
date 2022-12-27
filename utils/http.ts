import { create, GretchResponse, GretchOptions } from 'gretchen'
import { timestampLog, timestampLogError } from '../utils/consolelog'

import axios from 'axios';

const gretch = create({
  baseURL: '',
  headers: {
    // 'X-Powered-By': 'DAOStreet (www.hashrem.com)',
    "Content-Type": "application/json",
  },
  hooks: {
    after({ error }) {
      if (error) timestampLogError(error)
    }
  }
})
export type ResponseErrorType = {
  code: number
  errors: string[]
}
export type RequestOptions = {
  path: string,
  options?: GretchOptions
};

export type HttpResponse<T, A> = GretchResponse<T, A> & {
  parsedBody?: T
};

// TODO: remove temptoken
// const tempToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDksImVtYWlsX2lkIjoic3RhbGxvbmVAaGFzaHJlbS5jb20iLCJleHBpcnkiOiIxNjY5NDYyODYyIn0.bJU-EQHie54rVXPMrPdkZgh15ltpJwv9DDgN0TMCE3I";
// const tempToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbF9pZCI6IndlaXJkaW5jMTAxQGdtYWlsLmNvbSIsImV4cGlyeSI6IjE2NzEzNDU4NDYifQ.AH0wvQ467N0Qs9FDAEVuax8FQPn4jeEXsDNhfmEo058"
export async function http<T, A>(
  request: RequestOptions
): Promise<HttpResponse<T, A>> {
  if (request.options) {
    request.options.headers = {
      "ACCESS-TOKEN": localStorage.refresh_token,
      "Authorization": "Bearer " + (localStorage.refresh_token),
      "Content-Type": "application/json"
    }
  }
  const response: HttpResponse<T, A> = await gretch<T, A>(
    request.path, request.options
  ).json();
  return response;
}


export async function http_asp<T, A>(
  request: RequestOptions
): Promise<HttpResponse<T, A>> {
  if (request.options) {
    request.options.headers = {
      "ACCESS-TOKEN": localStorage.refresh_token,
      "Authorization": "Bearer " + (localStorage.refresh_token),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT, PATCH",
      "Access-Control-Max-Age": "1000",
      "Access-Control-Allow-Headers": "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
    }
  }
  const response: HttpResponse<T, A> = await gretch<T, A>(
    request.path, request.options
  ).json();
  return await response;
}


export async function get<T, A>(
  path: string,
  opts: RequestOptions = {
    path: path, options: {
      method: "get"
    }
  }
): Promise<HttpResponse<T, A>> {
  return await http<T, A>(opts);
}

export async function post<T, A>(
  path: string,
  body: any,
  opts: RequestOptions = { path: path, options: { method: "post", body: JSON.stringify(body) } }
): Promise<HttpResponse<T, A>> {
  return await http<T, A>(opts);
}


export async function DELETE<T, A>(
  path: string,
  body: any,
  opts: RequestOptions = { path: path, options: { method: "DELETE", body: JSON.stringify(body) } }
): Promise<HttpResponse<T, A>> {
  return await http<T, A>(opts);
}

export async function put<T, A>(
  path: string,
  body: any,
  opts: RequestOptions = { path: path, options: { method: "put", body: JSON.stringify(body) } }
): Promise<HttpResponse<T, A>> {
  return await http<T, A>(opts);
}

export async function patch<T, A>(
  path: string,
  body: any,
  opts: RequestOptions = { path: path, options: { method: "patch", body: JSON.stringify(body) } }
): Promise<HttpResponse<T, A>> {
  return await http<T, A>(opts);
}

export async function UploadFileHttp(path: string, payload: any) {
  timestampLog(payload)
  timestampLog("Payload Check", payload?.body);

  const body = payload?.body;

  return await axios.post(path, body, { headers: payload?.headers });
}
