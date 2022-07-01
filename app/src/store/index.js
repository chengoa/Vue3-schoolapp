import { createStore } from "vuex";
import load from "./modules/load";
import user from "./modules/user";
import ncov from "./modules/ncov"

export const store = createStore({
  modules:{
    load,
    user,
    ncov
  }
})