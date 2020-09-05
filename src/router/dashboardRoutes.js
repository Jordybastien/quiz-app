import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/protectedRoute/dashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import StudentsComponent from '../components/dashboard/students';
import AllQuizesComponent from '../components/dashboard/quizes';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <DashboardRoute
        path="/dashboard/students"
        component={StudentsComponent}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/quizes"
        component={AllQuizesComponent}
        allowedRole={AllRoles.admin}
      />
    </>
  );
};

export default DashboardRouting;
