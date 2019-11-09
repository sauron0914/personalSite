import { CRouteProps } from '@/store/custom-connect'
import { ROUTER } from '@/store/models/router'
import Loading from '@components/Loading/Loading'
import Loadable from '@loadable/component'
import {
  createBrowserHistory,
  LocationDescriptorObject,
  LocationState,
} from 'history'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Store } from 'redux'
import { GlobalConfig, Guard, RouterGuard } from 'router-guard'

/* eslint-disable */
const Dashboard = Loadable(() => import('@/views/Dashbord/Dashbord' /* webpackChunkName: "Dashbord"*/))
const NotFound = Loadable(() => import('@/views/NotFound/NotFound' /* webpackChunkName: "NotFound" */))

const Routes = {
  Index: { path: '/dashbord', exact: true, component: Dashboard },
}
/* eslint-enable */

type LocationType = LocationDescriptorObject<LocationState>

type AppUrlsType = {
  [key in keyof typeof Routes]: (options?: LocationType) => LocationType
}

export const AppUrls: AppUrlsType = [...Object.entries(Routes)].reduce(
  (pre: any, [key, route]: [string, CRouteProps]) => {
    const pathname = typeof route.path === 'string' ? route.path : route.path[0]
    pre[key] = (options?: LocationType) => ({ pathname, ...options })
    return pre
  },
  {},
)

export default Routes

GlobalConfig.pendingPlaceholder = () => <Loading />

export function generate(routes: CRouteProps[], guard?: Guard | null) {
  return (
    <Switch>
      {routes.map((route, i: number) => {
        const { meta, redirect, component: Component, ...rest } = route
        return redirect ? (
          <Route {...rest} render={() => <Redirect to={redirect} />} key={i} />
        ) : (
          <Route
            {...rest}
            component={RouterGuard(Component, meta, guard)}
            key={i}
          />
        )
      })}
      <Route path="*" component={RouterGuard(NotFound, null, guard)} />
    </Switch>
  )
}

export function generateRoutes(store: Store) {
  const guard: Guard = (to, next) => {
    if (to.location.pathname === '/') {
      next({ path: '/dashbord', replace: true })
    }
    const routeBranches = () => {
      next()
      store.dispatch({ type: ROUTER.UPDATE_ROUTER_INFO, payload: to })
    }
    routeBranches()
  }

  return generate(Object.values(Routes), guard)
}

export const browserHistory = createBrowserHistory()
