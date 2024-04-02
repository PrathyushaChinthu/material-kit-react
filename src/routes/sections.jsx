import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const PostPage = lazy(() => import('src/pages/post'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const PhotosPage = lazy(() => import('src/pages/photos'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserProfile = lazy(() => import('src/pages/userProfile'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {
          path: 'user',
          element: [
            <Suspense>
              <Outlet />
            </Suspense>,
          ],
          children: [
            {
              index: true,
              element: <UserPage />,
            },
            {
              path: ':userId',
              element: <UserProfile />,
              exact: true,
            },
          ],
        },
        { path: 'photos', element: <PhotosPage /> },
        { path: 'post', element: <PostPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
