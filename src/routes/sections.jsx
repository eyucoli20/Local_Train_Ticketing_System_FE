import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-imports
import HomePage from 'src/pages/home';
// eslint-disable-next-line perfectionist/sort-imports
import { useAuth } from 'src/context/AuthContext';
// eslint-disable-next-line perfectionist/sort-imports
import DashboardLayout from 'src/layouts/dashboard';

import { BookedView, BookingView } from 'src/sections/booking';


export const NAV = lazy(() => import('src/components/nav/Nav'));
export const IndexPage = lazy(() => import('src/pages/app'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const RoutinePage = lazy(() => import('src/pages/routine'));
export const LocationPage = lazy(() => import('src/pages/location'));
export const TrainPage = lazy(() => import('src/pages/train'));
export const BookPage = lazy(() => import('src/pages/booking'));
// export const BookingView = lazy(()=> import('src/sections/booking/index'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const TicketPage = lazy(() => import('src/pages/ticket'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const userRole = localStorage.getItem('role');

  const allRoutes = [
    {
      path: '/',
      element: (
        <>
          <NAV />
          <HomePage />
        </>
      ),
      index: true,
    },
    {
      path: '/routine',
      element: (
        <>
          <NAV /> <RoutinePage />
        </>
      ),
      index: true,
    },
    {
      path: '/login',
      element: (
        <>
          <NAV /> <LoginPage />
        </>
      ),
      index: true,
    },
    {
      path: '/booking',
      element: (
        <>
          <NAV />
          <BookPage />
        </>
      ),
      index: true,
    },

    {
      element:
        isAuthenticated &&
        (userRole === 'ADMIN' || userRole === 'USER') ? (
          <DashboardLayout>
            <Suspense fallback={<CircularProgress />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ) : (
          <LoginPage />
        ),
      children: [
        { path: '/dashboard', element: <IndexPage /> },
        { path: '/dashboard/location', element: <LocationPage /> },
        { path: '/dashboard/train', element: <TrainPage /> },
        { path: '/dashboard/schedule', element: <SchedulePage /> },
        { path: '/dashboard/booking', element: <BookingView /> },
        { path: '/dashboard/booked-to-confirm', element: <BookedView /> },
        { path: '/dashboard/ticket', element: <TicketPage /> },
        { path: '/dashboard/user', element: <UserPage /> },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ];

  const routes = useRoutes(allRoutes);

  return routes;
}
