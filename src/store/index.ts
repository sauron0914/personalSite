import router from '@/store/models/router'
import { createReduxStore } from '@auraxy/redux-usage'

declare const window: any

export function createStore() {
  const initialState = {}
  const models = [router]

  return createReduxStore(models, {
    initialState,
    sagaOptions: {
      onError(err, info) {
        console.warn(err, info)
      },
    },
  })
}

export const store = createStore()
