import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

const DashboardRoute = ({
  isAuth,
  path,
  component,
  dispatch,
  // TODO: Uncomment Role
  // role,
  allowedRole,
  history,
  ...rest
}) => {
  // TODO: Delete Role
  const role = 'Admin';
  // TODO: Change back to role and to allowedRole
  return role === allowedRole ? (
    <Route path={path} {...rest} component={component} />
  ) : (
    <Redirect to="/dashboard" />
  );
};

DashboardRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
    // TODO
    // role: authedUser.role.name,
  };
};

export default withRouter(connect(mapStateToProps)(DashboardRoute));
