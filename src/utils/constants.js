import { faCog, faUsers, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faQuestionCircle,
} from '@fortawesome/free-regular-svg-icons';

export const AllRoles = Object.freeze({
  admin: 'Admin',
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
