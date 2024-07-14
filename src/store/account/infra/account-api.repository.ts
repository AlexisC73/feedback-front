import { ApiResultType } from "@/store/@shared/models/resultType";
import { AccountRepository, GetMeApiResult, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { Account } from "../models/account";
import { handleApiError } from "@/store/@shared/utiles/badRequestError";
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

      switch (request.status) {
        case 201:
          return {
            type: ApiResultType.SUCCESS,
            data: undefined
          }
        default:
          return handleApiError(request.status, await request.json())
      }
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

      switch (request.status) {
        case 200:
          return {
            type: ApiResultType.SUCCESS,
            data: await request.json() as Account
          }
        default:
          return handleApiError(request.status, await request.json())
      }
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
      return {
        type: ApiResultType.CREDENTIAL_ERROR,
        data: undefined
      }
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }
}