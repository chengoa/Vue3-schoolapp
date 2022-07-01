import axios from 'axios';

import { ElLoading, ElMessage } from 'element-plus';

const nCOVinstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

export const nCOVaxios = (api,params) => {
  // return new Promise((resolve,reject) => {
  return nCOVinstance.get(api)
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   })
// })
}

const guide = axios.create({
  timeout: 5000,
  headers:{
    // 这是报文的格式
    "Content-Type":"application/json",
  }
})

export const guideAxios = (api,params) => {
  // return new Promise((resolve,reject) => {
  return guide.get(api)
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   })
// })
}

const wa = axios.create({
  timeout: 5000,
  headers:{
    // 这是报文的格式
    "Content-Type": "application/x-www-form-urlencoded",
    
  }
})

export const waAxios = (api,params) => {
  // return new Promise((resolve,reject) => {
  return guide.get(api)
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   })
// })
}
const area = axios.create({
  timeout: 5000,
  headers:{
    // 这是报文的格式
    // "Content-Type":"application/json",
    "Content-Type":"application/x-www-form-urlencoded",
  }
})
export const areaAxios = (api,params) => {
  // return new Promise((resolve,reject) => {
  return area.get(api)
//   .then(res => {
//     console.log(res);
//   }).catch(err => {
//     console.log(err);
//   })
// })
}
const ip = "127.0.0.1";
const port = 3002;
export const baseURL = `http://${ip}:${port}`;
export const imgURL = baseURL + "/assets/upload/" 
const instance = axios.create({
  baseURL,
  timeout: 12000,
  headers:{
    // 这是报文的格式
    "Content-Type":"application/json",
    // "Content-Type":"application/x-www-form-urlencoded",
}
});

let loading = null;

instance.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  return response;
}, err => {
  return Promise.reject(err);
})

export const Http = (api,param) => {
  return new Promise((resolve,reject) => {
      instance.post("/api"+api,param)
          .then(res => {
              resolve(res.data)
          })
          .catch(e => {
              reject(e)
          })
  })
}

export const Gql = (param) => {
  return new Promise((resolve,reject) => {
      instance.post("/gql",param)
          .then(res => {
              resolve(res.data)
          })
          .catch(e => reject(e))
  })
}


