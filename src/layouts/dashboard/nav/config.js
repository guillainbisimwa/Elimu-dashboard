// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'doctor',
    path: '/dashboard/doctor',
    icon: icon('ic_analytics'),
  },
  {
    title: 'patient',
    path: '/dashboard/patient',
    icon: icon('ic_analytics'),
  },
  
];

export default navConfig;
