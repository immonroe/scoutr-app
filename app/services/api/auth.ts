import { ApiResponse, ApisauceInstance } from "apisauce"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem";
import { Response } from "./api.types";

export class AuthApi {
  private _api: ApisauceInstance;

  constructor(api: ApisauceInstance) {
    this._api = api
  }

  async sendOtp(phoneNumber: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<any> = await this._api.post(
      `auth/otp`,
      {
        phoneNumber
      },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData: Response = response.data
      if (rawData.success) return { kind: "ok" }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}