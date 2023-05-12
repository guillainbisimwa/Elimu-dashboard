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
    icon: icon('school'),
  },
  {
    title: 'Annee Scolaire',
    path: '/dashboard/anneeScolaire',
    icon: icon('calendar-year'),
  },
  {
    title: 'Classe',
    path: '/dashboard/classe',
    icon: icon('i-training-class-outline'),
  },
  {
    title: 'parent',
    path: '/dashboard/parent',
    icon: icon('parent-line'),
  },

  {
    title: 'eleve',
    path: '/dashboard/eleve',
    icon: icon('student'),
  },
  {
    title: 'Finance',
    path: '/dashboard/payment',
    icon: icon('attach-money-rounded'),
  },

  {
    title: 'communication',
    path: '/dashboard/communication',
    icon: icon('communication'),
  },
  
];

export default navConfig;
