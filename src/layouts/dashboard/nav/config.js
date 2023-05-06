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
    title: 'ecole',
    path: '/dashboard/ecole',
    icon: icon('ic_analytics'),
  },
  {
    title: 'parent',
    path: '/dashboard/parent',
    icon: icon('ic_analytics'),
  },

  {
    title: 'eleves',
    path: '/dashboard/eleves',
    icon: icon('ic_analytics'),
  },
  {
    title: 'payment',
    path: '/dashboard/payment',
    icon: icon('ic_analytics'),
  },

  {
    title: 'communication',
    path: '/dashboard/communication',
    icon: icon('ic_analytics'),
  },
  
];

export default navConfig;
