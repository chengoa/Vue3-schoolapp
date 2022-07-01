import instance from "@/utils/http.js";

export const Http = (api) => {
  return new Promise((resolve, reject) => {
    instance.get(api)
      .then(res => {
        resolve(res)
      })
      .catch(err => reject(err))
  },
  err => {
    reject(err);
  })
}