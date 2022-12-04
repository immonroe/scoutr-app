import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authPhone: types.optional(types.string, ""),
    otpCode: types.optional(types.string, ""),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationErrors() {
      return {
        authPhone: (function () {
          if (store.authPhone.length === 0) return "can't be blank"
          if (/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(store.authPhone))
            return "must be a valid phone number"
          return ""
        })(),
        otpCode: (function () {
          if (store.otpCode.length === 0) return "can't be blank"
          if (store.otpCode.length !== 6) return "must be 6 digits"
          return ""
        })(),
      }
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    async setAuthPhone(value: string) {
      store.authPhone = value.replace(/ /g, "")
    },
    async setOtpCode(value: string) {
      store.otpCode = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authPhone = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
