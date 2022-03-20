import httpBase from "./httpBaseUtil"
import httpBaseUtilNested from "./httpBaseUtilNested";

export const fetch = (url, params) => {
  return httpBase().get(`/${url}`, params);
}

export const store = (url, params) => {
  return httpBase().post(`/${url}`, params);
}

export const update = (url, params) =>{
  return httpBase().put(`/${url}`, data);
}

export const destroy = (url,id = '') => {
  return httpBase().delete(`/${url}/${id}`);
}

// for nested
export const storeNested = (url, params) => {
  return httpBaseUtilNested().post(`/${url}`, params);
}