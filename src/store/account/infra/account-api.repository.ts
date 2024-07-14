import { ApiResultType } from "@/store/@shared/models/resultType";
import { AccountRepository, GetMeApiResult, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { Account } from "../models/account";
import { handleApiError, handleApiFieldError } from "@/store/@shared/utiles/badRequestError";
import { injectable } from "inversify";
import { api } from "@/config/api";

@injectable()
export class AccountApiRepository implements AccountRepository {
  async create(params: { email: string; password: string; displayName: string, username: string }): Promise<RegisterApiResult> {
    try {
      const request = await fetch(`${api.endpoint}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
          displayName: params.displayName,
          username: params.username
        }),
        credentials: "include"
      })

      if(request.status === 201) {
        return {type: ApiResultType.SUCCESS, data: undefined}
      }
      const result = await request.json()
      if(request.status === 400) {
        const hasFieldErrors = handleApiFieldError(result)
        if(hasFieldErrors.type !== ApiResultType.FIELD_ERROR) {
          return hasFieldErrors
        }
      }
      return handleApiError(request.status, result)
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }

  async login(params: { email: string; password: string; }): Promise<LoginApiResult> {
    try {
      const request = await fetch(`${api.endpoint}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
        }),
        credentials: "include"
      })

      if(request.ok) {
        return {
            type: ApiResultType.SUCCESS,
            data: await request.json() as Account
          }
      }
      const result = await request.json()
      if(request.status === 400) {
        const hasFieldErrors = handleApiFieldError(result)
        if(hasFieldErrors.type !== ApiResultType.FIELD_ERROR) {
          return handleApiError(request.status, hasFieldErrors)
        }
      }
      return handleApiError(request.status, result)
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }

  async getMe(): Promise<GetMeApiResult> {
    try {
      const request = await fetch(`${api.endpoint}/auth/me`, {
        method: "GET",
        credentials: "include"
      })

      if(request.ok) {
        return {
          type: ApiResultType.SUCCESS,
          data: await request.json() as Account
        }
      }
      return handleApiError(request.status, await request.json())
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
}