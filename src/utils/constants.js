import {
  faCog,
  faUsers,
  faLayerGroup,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

export const AllRoles = Object.freeze({
  admin: 'admin',
  students: 'students',
});

export const AdminRoutes = [
  {
    activeRoute: 'dashboard',
    icon: faCog,
    label: 'Dashboard',
    goTo: '/dashboard',
  },
  {
    activeRoute: 'users',
    icon: faUsers,
    label: 'Users',
    goTo: '/dashboard/users',
  },
  {
    activeRoute: 'quizes',
    icon: faQuestionCircle,
    label: 'Quiz',
    goTo: '/dashboard/quizes',
  },
  {
    activeRoute: 'levels',
    icon: faLayerGroup,
    label: 'Levels',
    goTo: '/dashboard/levels',
  },
];
export const StudentRoutes = [
  {
    activeRoute: 'dashboard',
    icon: faCog,
    label: 'Dashboard',
    goTo: '/dashboard',
  },
  {
    activeRoute: 'take-quiz',
    icon: faQuestionCircle,
    label: 'Take Quiz',
    goTo: '/dashboard/take-quiz',
  },
  {
    activeRoute: 'history',
    icon: faHistory,
    label: 'My History',
    goTo: '/dashboard/history',
  },
];
