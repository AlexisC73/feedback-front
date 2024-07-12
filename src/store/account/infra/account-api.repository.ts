import { ApiResultType } from "@/store/@shared/models/resultType";
import { AccountRepository, LoginApiResult, RegisterApiResult } from "../models/account-repository";
import { Account } from "../models/account";
import { FieldError } from "@/store/errors/fields-error";
import { getBadRequestApiError } from "@/store/@shared/utiles/badRequestError";
import { injectable } from "inversify";

@injectable()
export class AccountApiRepository implements AccountRepository {
  async create(params: { email: string; password: string; }): Promise<RegisterApiResult> {
    try {
      const request = await fetch("http://localhost:3333/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password
        }),
        credentials: "include"
      })

      switch (request.status) {
        case 201:
          return {
            type: ApiResultType.SUCCESS,
            data: undefined
          }
        case 400:
          return getBadRequestApiError(await request.json())
        default:
          return {
            type: ApiResultType.UNKNOWN_ERROR,
            data: undefined
          }
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
      const request = await fetch("http://localhost:3333/api/auth/login", {
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

      const result = await request.json()

      if(request.ok) {
        return {
          type: ApiResultType.SUCCESS,
          data: result as Account
        }
      }

      if(result?.message === "Invalid fields") {
        return {
          type: ApiResultType.FIELD_ERROR,
          data: result.errors as FieldError[]
        }
      }

      if(result?.message ==="Invalid credentials") {
        return {
          type: ApiResultType.CREDENTIAL_ERROR,
          data: undefined
        }
      }

      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    } catch(e) {
      return {
        type: ApiResultType.UNKNOWN_ERROR,
        data: undefined
      }
    }
  }

  async getMe() {
    try {
      const request = await fetch("http://localhost:3333/api/auth/me", {
        method: "GET",
        credentials: "include"
      })

      return await request.json()
    } catch(e) {
      throw new Error("Method not implemented.")
    }
  }
}