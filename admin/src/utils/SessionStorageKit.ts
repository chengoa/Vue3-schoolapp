export const getCacheVal = (key:string) : string => {
  return sessionStorage.getItem(key)
}

export const setCacheVal = (key:string,val:any) => {
  sessionStorage.setItem(key,val)
}