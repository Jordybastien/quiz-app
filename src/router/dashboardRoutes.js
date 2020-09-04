import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/protectedRoute/dashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import ChurchServices from '../components/dashboard/churchServices';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <DashboardRoute
        path="/dashboard/services"
        component={ChurchServices}
        allowedRole={AllRoles.admin}
      />
    </>
  );
};

export default DashboardRouting;
