import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

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
    activeRoute: 'services',
    icon: faCalendarAlt,
    label: 'Services',
    goTo: '/dashboard/services',
  },
];
