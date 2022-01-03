export default async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  let headers: HeadersInit = init?.headers || {}

  const requestInit: RequestInit = {...init, headers}
  const response = await fetch(input, requestInit)

  // there is no response if the request was a delete
  if (requestInit.method === `DELETE` && response.ok) {
    return {} as T
  }

  if (requestInit.method !== `DELETE`) {
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json()

    // response.ok is true when res.status is 2xx
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    if (response.ok) {
      return data
    }

    let message = data.message

    if (Array.isArray(data)) {
      message = data[0].defaultMessage || data[0].message
    }

    throw new FetchError({
      message: response.status === 404 ? `Not found` : message,
      response,
      data: data || new Error(`No data available`),
    })
  }

  throw new FetchError({
    message: response.status === 404 ? `Not found` : response.statusText,
    response,
    data: new Error(`No data available`),
  })
}

export class FetchError extends Error {
  response: Response
  data: {
    message: string
  }
  constructor({
    message,
    response,
    data,
  }: {
    message: string
    response: Response
    data: {
      message: string
    }
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
    this.data = data ?? {message: message}
  }
}
