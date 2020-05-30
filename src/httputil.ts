/** Import libraries. */
//import { makeHTTPRequest, makeHTTPSRequest } from "@dnpr/make-request"
import fetch from 'node-fetch';
/** Import other sripts. */
import { log } from "./log"
import { RequestError } from "./error/RequestError"

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

/**
 * @category Library Internal
 */
function post(url: string) {
  const myURL = new URL(url)

  if (myURL.protocol !== "http:" && myURL.protocol !== "https:") {
    throw new RequestError(`Unsupported protocol: ${myURL.protocol}`)
  }

  const port = myURL.port ? myURL.port : myURL.protocol === "http:" ? 80 : 443

  const agentOptions = {
    hostname: myURL.hostname,
    authority: myURL.hostname,
    port: port,
    path: myURL.pathname + myURL.search,
    method: "POST",
    headers: {},
  }

  return {
    setHeader: function (key: string, value: string) {
      agentOptions.headers[key] = value
      return this
    },
    sendAsJson: async function (body?: any) {
      log.debug(
        `http-util.ts: ${agentOptions.method} ${agentOptions.hostname} \
${agentOptions.port} ${agentOptions.path}`
      )

      /** @dnpr/make-request only support these two. */
      this.setHeader("accept-encoding", "gzip, deflate")
      this.setHeader("content-type", "application/json")

      let payload = ""

      try {
        if (body) payload = JSON.stringify(body)
      } catch (error) {
        throw error
      }

      let response:Await<ReturnType<typeof fetch>>
      try {
        response = await fetch(myURL.toString(),{
          method:'post',
          headers:agentOptions.headers,
          body: payload as any,
        });
        /*if (response.status < 200 || response.status > 299){
          throw response.statusText
        }*/
      } catch (error) {
        throw error
      }

      try {
        return await response.json()
      } catch (error) {
        throw error
      }
    }, // send
  } // return
} // post

export { post }
