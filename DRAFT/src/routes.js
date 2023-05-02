import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'; // import the useSelector hook
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// //
import LoginPage from './pages/LoginPage';
import DoctorPage from './pages/DoctorPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import DoctorProfile from './pages/DoctorProfile';

import PatientPage from './pages/PatientPage';
import PatientProfile from './pages/PatientProfile';

export default function Router() {
  const { user } = useSelector((state) => state.auth);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'doctor', element: <DoctorPage /> },
        { path: 'doctor-profile', element: <DoctorProfile /> },
        { path: 'patient', element: <PatientPage /> },
        { path: 'patient-profile', element: <PatientProfile /> },
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
