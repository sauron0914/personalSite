/// <reference types="react-scripts" />
declare module 'classnames' {
  export default function classNames(...args: any[]): string
}

declare module '@loadable/component' {
  export default function Loadable(importFn: () => any): any
}

declare type Fn = (...args: any[]) => any

declare type Remove<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never
