import { API } from "../interfaces"

/**
 * @category Error
 */
export class APIError extends Error {
  name = "APIError"

  constructor(error: API.ErrorResponse) {
    super()
    Object.setPrototypeOf(this, APIError.prototype)
    this.message = `Server says "${error.name}: ${error.message}`
    if (error.status) {
      this.message += ` Status: ${error.status}`
    }
    this.message += '"'
  }
}
