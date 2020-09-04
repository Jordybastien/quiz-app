import React, { useState, Fragment } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Switch, Slider, message, Modal, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleFetchingBookings } from '../../../actions/booking';
import BookingsTable from '../bookingsTable';

const dateFormat = 'YYYY/MM/DD';

const MainBoard = (props) => {
  const [showHideCal, setShowHideCal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const { services } = props;

  const handleServiceByDate = (selDate) =>
    selDate && setSelectedDate(moment(selDate._d).format('YYYY-MM-DD'));

  const handleBookings = (serviceID) => {
    if (!selectedDate) {
      return message.warning('Select Date Please');
    }
    setLoading(true);
    setService(
      services.filter((service) => service.serviceID === serviceID)[0]
    );

    props
      .dispatch(handleFetchingBookings(serviceID, selectedDate))
      .then(() => setLoading(false));
    setModalVisible(true);
  };

  
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
        {!loading ? (
          <BookingsTable service={service} />
        ) : (
          <div className="spinner-cont">
            <Spin size="large" />
          </div>
        )}
      </Modal>

      <div className="container m-5">
        <div className="row">
          {services.length !== 0 && (
            <div className="mt-3">
              <h4 className="church-service-datetime">
                {moment(services[0].serviceDate)
                  .format('LLLL')
                  .substr(
                    0,
                    moment(services[0].serviceDate).format('LLLL').length - 9
                  )}
              </h4>
            </div>
          )}
        </div>
        <div className="row">
          <div
            className="calendar-container"
            onClick={() => setShowHideCal(!showHideCal)}
          >
            <div>
              <FontAwesomeIcon icon={faSearch} size="sm" color="#3e5561" />
            </div>
            <div className="search-text-container">
              <DatePicker
                format={dateFormat}
                placeholder="Search by date"
                onChange={handleServiceByDate}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-services-main-container">
            {services &&
              services.map((service, index) => (
                <div
                  className="dashboard-services-container"
                  key={index}
                  onClick={() => handleBookings(service.serviceID)}
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
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ churchServices }) => {
  return {
    services: Object.values(churchServices),
  };
};

export default connect(mapStateToProps)(MainBoard);
