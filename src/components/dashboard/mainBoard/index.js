import React, { useState, Fragment } from 'react';
import {
  faSearch,
  faShieldAlt,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Switch, Slider, message, Modal, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import BookingsTable from '../bookingsTable';

const dateFormat = 'YYYY/MM/DD';

const MainBoard = (props) => {
  const [showHideCal, setShowHideCal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const { authedUser } = props;

  return (
    <Fragment>
      <Modal
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={
          window.screen.width < 520
            ? window.screen.width - 100
            : window.screen.width - 500
        }
      >
        {/* Content here */}
      </Modal>

      <div className="container m-5">
        <div className="row">
          <div className="main-overview">
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  size="3x"
                  color="#5C4DB1"
                  className="mr-2"
                />
              </div>
              <div className="overviewcard__info">
                <div>
                  <span className="stats-heading-title">{authedUser.levelId}</span>
                </div>
                <div>
                  <span className="stats-heading-label">Level</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-services-main-container">
            {/* {services &&
              services.map((service, index) => (
                <div
                  className="dashboard-services-container"
                  key={index}
                  onClick
                >
                  <div className="dashboard-service-header">
                    <div>
                      <span className="dashboard-service-name">
                        {service.title}
                      </span>
                    </div>
                    <div>
                      <Switch
                        checked={service.status === 1}
                        onChange={() => console.log('Switched')}
                      />
                    </div>
                  </div>
                  <div className="dashboard-service-main">
                    <div className="dashboard-stats-container">
                      <div>
                        <span className="dashboard-service-seats">
                          {service.takenSeats}
                        </span>
                      </div>
                      <div>
                        <span className="dashboard-seats-label">
                          Confirmed bookings
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={require('../../../assets/dash-report.png')}
                        className="dash-report"
                        alt="report"
                      />
                    </div>
                  </div>
                  <div className="dashboard-service-footer">
                    <Slider
                      tooltipVisible
                      value={(service.takenSeats * 100) / service.numberOfSeats}
                      tipFormatter={(value) => `${value}%`}
                    />
                  </div>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(MainBoard);
