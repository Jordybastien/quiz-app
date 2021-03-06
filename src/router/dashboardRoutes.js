import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoute from '../components/protectedRoute/dashboardRoute';
import MainBoard from '../components/dashboard/mainBoard';
import StudentsComponent from '../components/dashboard/students';
import AllQuizesComponent from '../components/dashboard/quizes';
import Levels from '../components/dashboard/levels';
import TakeQuizComponent from '../components/dashboard/takeQuiz';
import HistoryComponent from '../components/dashboard/history';
import { AllRoles } from '../utils/constants';

const DashboardRouting = () => {
  return (
    <>
      <Route path="/dashboard" exact component={MainBoard} />
      {/* Admin Routes */}
      <DashboardRoute
        path="/dashboard/users"
        component={StudentsComponent}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/quizes"
        component={AllQuizesComponent}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/courses"
        component={Levels}
        allowedRole={AllRoles.admin}
      />
      <DashboardRoute
        path="/dashboard/take-quiz"
        component={TakeQuizComponent}
        allowedRole={AllRoles.students}
      />
      <DashboardRoute
        path="/dashboard/history"
        component={HistoryComponent}
        allowedRole={AllRoles.students}
      />
    </>
  );
};

export default DashboardRouting;
