import httpBase from "./httpBaseUtil"

export const fetch = (url, params) => {
  return httpBase().get(`/${url}`, params)
}