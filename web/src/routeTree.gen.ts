/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as ProtectedRouteRouteImport } from './routes/_protected/route'
import { Route as AuthRouteRouteImport } from './routes/_auth/route'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AuthSignUpRouteImport } from './routes/_auth/sign-up'
import { Route as AuthSignInRouteImport } from './routes/_auth/sign-in'
import { Route as ProtectedMyFilmsIndexRouteImport } from './routes/_protected/my-films/index'
import { Route as ProtectedExploreIndexRouteImport } from './routes/_protected/explore/index'
import { Route as ProtectedMyFilmsNewIndexRouteImport } from './routes/_protected/my-films/new/index'

const ProtectedRouteRoute = ProtectedRouteRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRouteRoute = AuthRouteRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthSignUpRoute = AuthSignUpRouteImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthSignInRoute = AuthSignInRouteImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthRouteRoute,
} as any)
const ProtectedMyFilmsIndexRoute = ProtectedMyFilmsIndexRouteImport.update({
  id: '/my-films/',
  path: '/my-films/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)
const ProtectedExploreIndexRoute = ProtectedExploreIndexRouteImport.update({
  id: '/explore/',
  path: '/explore/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)
const ProtectedMyFilmsNewIndexRoute =
  ProtectedMyFilmsNewIndexRouteImport.update({
    id: '/my-films/new/',
    path: '/my-films/new/',
    getParentRoute: () => ProtectedRouteRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/explore': typeof ProtectedExploreIndexRoute
  '/my-films': typeof ProtectedMyFilmsIndexRoute
  '/my-films/new': typeof ProtectedMyFilmsNewIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/explore': typeof ProtectedExploreIndexRoute
  '/my-films': typeof ProtectedMyFilmsIndexRoute
  '/my-films/new': typeof ProtectedMyFilmsNewIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/_protected': typeof ProtectedRouteRouteWithChildren
  '/_auth/sign-in': typeof AuthSignInRoute
  '/_auth/sign-up': typeof AuthSignUpRoute
  '/_protected/explore/': typeof ProtectedExploreIndexRoute
  '/_protected/my-films/': typeof ProtectedMyFilmsIndexRoute
  '/_protected/my-films/new/': typeof ProtectedMyFilmsNewIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/sign-in'
    | '/sign-up'
    | '/explore'
    | '/my-films'
    | '/my-films/new'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/sign-in' | '/sign-up' | '/explore' | '/my-films' | '/my-films/new'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_protected'
    | '/_auth/sign-in'
    | '/_auth/sign-up'
    | '/_protected/explore/'
    | '/_protected/my-films/'
    | '/_protected/my-films/new/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  ProtectedRouteRoute: typeof ProtectedRouteRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth/sign-up': {
      id: '/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthSignUpRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/sign-in': {
      id: '/_auth/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthSignInRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_protected/my-films/': {
      id: '/_protected/my-films/'
      path: '/my-films'
      fullPath: '/my-films'
      preLoaderRoute: typeof ProtectedMyFilmsIndexRouteImport
      parentRoute: typeof ProtectedRouteRoute
    }
    '/_protected/explore/': {
      id: '/_protected/explore/'
      path: '/explore'
      fullPath: '/explore'
      preLoaderRoute: typeof ProtectedExploreIndexRouteImport
      parentRoute: typeof ProtectedRouteRoute
    }
    '/_protected/my-films/new/': {
      id: '/_protected/my-films/new/'
      path: '/my-films/new'
      fullPath: '/my-films/new'
      preLoaderRoute: typeof ProtectedMyFilmsNewIndexRouteImport
      parentRoute: typeof ProtectedRouteRoute
    }
  }
}

interface AuthRouteRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

interface ProtectedRouteRouteChildren {
  ProtectedExploreIndexRoute: typeof ProtectedExploreIndexRoute
  ProtectedMyFilmsIndexRoute: typeof ProtectedMyFilmsIndexRoute
  ProtectedMyFilmsNewIndexRoute: typeof ProtectedMyFilmsNewIndexRoute
}

const ProtectedRouteRouteChildren: ProtectedRouteRouteChildren = {
  ProtectedExploreIndexRoute: ProtectedExploreIndexRoute,
  ProtectedMyFilmsIndexRoute: ProtectedMyFilmsIndexRoute,
  ProtectedMyFilmsNewIndexRoute: ProtectedMyFilmsNewIndexRoute,
}

const ProtectedRouteRouteWithChildren = ProtectedRouteRoute._addFileChildren(
  ProtectedRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  ProtectedRouteRoute: ProtectedRouteRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
