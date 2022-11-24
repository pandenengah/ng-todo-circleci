import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchResult } from './fetch-result';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(
    private http: HttpClient,
  ) { }

  async post(url: string, body: string | FormData, withBearer: boolean = true): Promise<FetchResult> {
    const promise = new Promise<FetchResult>((resolve) => {
      let headers: HttpHeaders = new HttpHeaders()

      if (withBearer) {
        const token = ''
        headers = headers.set('Authorization', `Bearer ${token}`)
      }

      if (!(body instanceof FormData)) {
        headers = headers.set('Content-Type', 'application/json')
      }

      const options = {
        headers,
      }
         
      this.http.post<any>(url, body, options)
        .subscribe({
          next: (res: HttpResponse<any>) => {
            resolve({
              hasError: false,
              rawData: res
            })
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = this.handleErrorMessage(error)
            resolve({
              hasError: true,
              errorMessage,
              rawData: error.error
            })

            console.error(errorMessage);
          }
        })
    })

    return promise
  }

  async get(url: string, withBearer: boolean = true): Promise<FetchResult> {
    const promise = await new Promise<FetchResult>((resolve) => {
      let headers: HttpHeaders = new HttpHeaders()

      if (withBearer) {
        const token = ''
        headers = headers.set('Authorization', `Bearer ${token}`)
      }

      const options = {
        headers,
      }

      this.http.get<any>(url, options).subscribe({
        next: (res: HttpResponse<any>) => {
          resolve({
            hasError: false,
            rawData: res
          })
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage = this.handleErrorMessage(error)
          resolve({
            hasError: true,
            errorMessage,
            rawData: error.error
          })

          console.error(errorMessage);
        }
      })
    })
    return promise
  }

  async put(url: string, body: string | FormData, withBearer: boolean = true): Promise<FetchResult> {
    const promise = new Promise<FetchResult>((resolve) => {
      let headers: HttpHeaders = new HttpHeaders()

      if (withBearer) {
        const token = ''
        headers = headers.set('Authorization', `Bearer ${token}`)
      }

      if (!(body instanceof FormData)) {
        headers = headers.set('Content-Type', 'application/json')
      }

      const options = {
        headers,
      }
         
      this.http.put<any>(url, body, options)
        .subscribe({
          next: (res: HttpResponse<any>) => {
            resolve({
              hasError: false,
              rawData: res
            })
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = this.handleErrorMessage(error)
            resolve({
              hasError: true,
              errorMessage,
              rawData: error.error
            })

            console.error(errorMessage);
          }
        })
    })

    return promise
  }

  async del(url: string, withBearer: boolean = true): Promise<FetchResult> {
    const promise = new Promise<FetchResult>((resolve) => {
      let headers: HttpHeaders = new HttpHeaders()

      if (withBearer) {
        const token = ''
        headers = headers.set('Authorization', `Bearer ${token}`)
      }

      const options = {
        headers,
      }
         
      this.http.delete<any>(url, options)
        .subscribe({
          next: (res: HttpResponse<any>) => {
            resolve({
              hasError: false,
              rawData: res
            })
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = this.handleErrorMessage(error)
            resolve({
              hasError: true,
              errorMessage,
              rawData: error.error
            })

            console.error(errorMessage);
          }
        })
    })

    return promise
  }

  handleErrorMessage(error: HttpErrorResponse) {
    let errorMessage = '';
    if (!!error.error.error.message) {
      errorMessage = error.error.error.message
    }
    return errorMessage
  }
}
