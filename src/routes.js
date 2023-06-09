import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'; // import the useSelector hook
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// //
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

import ParentPage from './pages/ParentPage';
import EcolePage from './pages/EcolePage';
import AnneeScolairePage from './pages/AnneeScolairePage';
import ClassePage from './pages/ClassePage';
import ElevePage from './pages/ElevePage';
import PaymentPage from './pages/PaymentPage';
import CommunicationPage from './pages/CommunicationPage';

export default function Router() {
  const { user } = useSelector((state) => state.auth);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'ecole', element: <EcolePage /> },
        { path: 'parent', element: <ParentPage /> },
        { path: 'anneeScolaire', element: <AnneeScolairePage /> },
        { path: 'classe', element: <ClassePage /> },
        { path: 'eleve', element: <ElevePage /> },
        { path: 'payment', element: <PaymentPage /> },
        { path: 'communication', element: <CommunicationPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
