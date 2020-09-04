import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { Button, Progress, Modal, Result, Skeleton } from 'antd';
import { connect } from 'react-redux';
import BookService from '../components/bookService';
import { monthNames } from '../utils/churches';
import { languages } from '../utils/languages';

const churchKey = 'ChurchService:Key';

const options = [
  { value: 'kn', label: 'Kinyarwanda' },
  { value: 'en', label: 'English' },
];

class Church extends Component {
  state = {
    selectedOption: null,
    modal1Visible: false,
    modal2Visible: false,
    loading: false,
    serviceId: null,
    service: null,
    errorMessage: '',
    language: 'en',
  };

  handleSelect = ({ value }) => {
    localStorage.setItem(churchKey, value);
    window.location.href = window.location.href;
  };

  componentDidMount() {
    const language = localStorage.getItem(churchKey);
    language && this.setState({ language });
  }

  handleSubmit = (data) => {
    this.setState({ loading: true, errorMessage: '' });
    const { serviceId } = this.state;
    data.serviceID = serviceId;
    data.MSISDN = '+25' + data.MSISDN;

  };

  handleRequest = (serviceId, service) =>
    this.setState({
      modal1Visible: true,
      serviceId,
      service,
      errorMessage: '',
    });

  render() {
    const {
      selectedOption,
      modal1Visible,
      loading,
      service,
      errorMessage,
      modal2Visible,
      language,
    } = this.state;
    const { services, name, location, day, month, imageLocation } = this.props;

    if (name) {
      document.title = `${name} church services`;
    }

    return (
      <Fragment>
        {service && (
          <Modal
            centered
            visible={modal1Visible}
            footer={null}
            onCancel={() => this.setState({ modal1Visible: false })}
          >
            <BookService
              loading={loading}
              service={service}
              handleSubmit={this.handleSubmit}
              errorMessage={errorMessage}
              language={language}
            />
          </Modal>
        )}
        <Modal
          centered
          visible={modal2Visible}
          footer={null}
          onCancel={() => this.setState({ modal2Visible: false })}
        >
          <Result
            status="success"
            title={languages[language].bookedTitle}
            subTitle={languages[language].success}
          />
        </Modal>
        <div className="wrapper">
          <div className="main-container">
            <div className="container">
              <div className="row mb-3">
                <div className="col-md-6 d-flex justify-content-center">
                  <div>
                    <img src={imageLocation} alt={name} className="logo" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end pt-4">
                    {services && (
                      <Select
                        value={selectedOption}
                        onChange={this.handleSelect}
                        options={options}
                        placeholder="Language"
                        className="language-select"
                        isSearchable={false}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 custom-padding-top">
                  <div className="custom-padding-top">
                    {services ? (
                      <>
                        <div>
                          <span className="header-text">
                            {languages[language].welcome} {name}
                          </span>
                        </div>
                        <div>
                          <span className="register-text">
                            {language === 'english'
                              ? `${languages[language].description} ${name} ${location} ${languages[language].descriptionTwo}`
                              : `${languages[language].description} ${name} ${location}`}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div>
                        <span className="header-text"> Page not found</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="services-card">
                    <div className="date-box mb-5">
                      <span className="date-box-label">
                        {month && month.acc}
                      </span>
                      <span className="date-box-label">{day}</span>
                    </div>
                    <div className="services-container">
                      {services ? (
                        services.map((service, index) => (
                          <div
                            className={`${
                              index + 1 !== services.length
                                ? 'border-bottom'
                                : 'mb-5'
                            } single-service`}
                            key={index}
                          >
                            <div className="service">
                              <div className="service-info">
                                <div>
                                  <span className="service-title">
                                    {service.title}
                                  </span>
                                </div>
                                <div>
                                  <span className="service-time">
                                    {service.startAt.substr(0, 5)} -{' '}
                                    {service.endAt.substr(0, 5)}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <Button
                                  type="primary"
                                  className="custom-btn"
                                  onClick={() =>
                                    this.handleRequest(
                                      service.serviceID,
                                      service
                                    )
                                  }
                                  disabled={
                                    service.numberOfSeats -
                                      service.takenSeats ===
                                    0
                                  }
                                >
                                  {languages[language].button}
                                </Button>
                              </div>
                            </div>
                            <div className="stats">
                              <div className="stat-graph">
                                <Progress
                                  percent={
                                    (service.takenSeats * 100) /
                                    service.numberOfSeats
                                  }
                                  showInfo={false}
                                />
                              </div>
                              <div className="stat-text">
                                {service.numberOfSeats - service.takenSeats}{' '}
                                {languages[language].seatsLeft}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-3">
                          <Skeleton active />
                          <Skeleton active />
                          <Skeleton active />
                        </div>
                      )}
                    </div>
                    <div className="services-footer">
                      <div className="footer-element">
                        <div>
                          <span className="booked"></span>
                        </div>
                        <span>{languages[language].booked}</span>
                      </div>
                      <div className="footer-element">
                        <div>
                          <span className="available"></span>
                        </div>
                        <span>{languages[language].available}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ churches }, props) => {
  const { slug } = props.match.params;

  const selectedChurch = Object.values(churches).filter(
    (church) => church.slug === slug
  );

  const serviceDate =
    selectedChurch[0] &&
    selectedChurch[0].services &&
    selectedChurch[0].services[0].serviceDate;

  return {
    services: selectedChurch[0] && selectedChurch[0].services,
    name: selectedChurch[0] && selectedChurch[0].name,
    location: selectedChurch[0] && selectedChurch[0].location,
    day: serviceDate && serviceDate.substr(8, 2),
    month: serviceDate && monthNames[serviceDate.substr(5, 2)],
    imageLocation: selectedChurch[0] && selectedChurch[0].imageLocation,
  };
};

export default connect(mapStateToProps)(Church);
