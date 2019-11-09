import {
  DefaultDispatchProps,
  MapDispatch,
  MapState,
  reduxConnect,
} from '@auraxy/redux-usage'
import { RouteProps } from 'react-router'
import { Action } from 'redux'
import { RouteInfo } from 'router-guard'

export interface CRouteProps extends RouteProps {
  path: string | string[]
  meta?: {
    requireAuth?: boolean
    [key: string]: any
  }
  redirect?: string
}

export interface DefaultStateProps extends RouteInfo {}

export interface SagaAction extends Action {
  payload: {
    done(): void
  }
}

export interface DefaultProps extends DefaultStateProps, DefaultDispatchProps {}

export function defaultStateToProps<T = {}>(
  mapStateToProps?: null | MapState<T>,
): MapState<DefaultStateProps & T> {
  return (state: any, ownProps?: any) => ({
    userInfo: state.user.userInfo,
    ...state.router,
    ...(mapStateToProps && mapStateToProps(state, ownProps)),
  })
}

export default function customConnect<StateProps = {}, DispatchProps = {}>(
  mapStateToProps?: null | MapState<StateProps>,
  mapDispatchToProps?: null | MapDispatch<DispatchProps>,
  mergeProps?: any,
  options?: any,
) {
  return reduxConnect(
    defaultStateToProps(mapStateToProps),
    mapDispatchToProps,
    mergeProps,
    options,
  )
}
