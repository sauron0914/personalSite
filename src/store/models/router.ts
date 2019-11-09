import { RouteInfo } from 'router-guard'

export const ROUTER = {
  UPDATE_ROUTER_INFO: 'UPDATE_ROUTER_INFO',
}

export default {
  namespace: 'router',
  state: {
    history: null,
    location: null,
    match: null,
    staticContext: undefined,
    meta: null,
  },
  reducers: {
    [ROUTER.UPDATE_ROUTER_INFO](state: any, payload: RouteInfo) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
