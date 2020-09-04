import React, { Component } from 'react';
import { connect } from 'react-redux';

class Homepage extends Component {
  state = {};
  render() {
    const { churches, isAuth } = this.props;
    if (window.screen.width > 600) {
    }
    return (
      <div className="homepage-wrapper">
        <div className="homepage-container">
          <section id="nav" className="custom-nav">
            <div className="container">
              <div className="row d-flex justify-content-between pt-4">
                <div>
                  <img
                    src={require('../assets/main-logo.png')}
                    alt="ZTCC"
                    className="logo"
                  />
                </div>
                <div className="menu-container">
                  <div>
                    <span className="nav-label mr-3">About us</span>
                  </div>
                  {!isAuth ? (
                    <div onClick={() => this.props.history.push('/login')}>
                      <span className="nav-label">Login</span>
                    </div>
                  ) : (
                    <div onClick={() => this.props.history.push('/dashboard')}>
                      <span className="nav-label">Dashboard</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section id="about-us" className="about-us">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pt-5">
                  <div className="mb-3">
                    <span className="about-us-title">
                      Booking Church Services
                    </span>
                  </div>
                  <div>
                    <span className="about-us-description">
                      During these unprecedented times where the world is
                      fighting against COVID-19, one way to avoid the spread is
                      to reduce crowds. <br />
                      As churches are opening, one way of controlling crowds of
                      congregants is by providing a way that they can book in
                      advance their most preferable service since the number of
                      attendants will be reduced to a smaller number.
                    </span>
                  </div>
                </div>
                <div
                  className={`col-md-4 d-flex ${
                    window.screen.width > 600
                      ? 'justify-content-end'
                      : 'justify-content-center'
                  }`}
                >
                  <img
                    src={require('../assets/icon-2.png')}
                    alt="ZTCC"
                    className="another-logo"
                  />
                </div>
              </div>
            </div>
          </section>
          <section id="covid-section" className="covid-section">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={require('../assets/Cov-19.svg')}
                    alt="ZTCC"
                    className="covid-img"
                  />
                </div>
                <div className="col-md-9">
                  <div className="mb-3">
                    <span className="covid-title">Covid-19 Measures</span>
                  </div>
                  <div>
                    <ul className="covid-list">
                      <li>
                        <span className="covid-list-item">
                          Wear your face mask all the time.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          Do not shake hands or give hugs.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          People with colds and/ or fever (38 degrees or higher)
                          stay at home. Upon entering, you will be asked by
                          someone on the welcome team if you have fever or cold.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          Keep 1.5 meters away both inside and outside the
                          building.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          Your hands will be sprayed with disinfectant gel upon
                          entering.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="features-section" className="features-section">
            <div className="container">
              <div className="row features-row">
                <div className="mb-3">
                  <span className="features-title">FEATURES</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 d-flex flex-direction-row single-feature">
                  <img
                    src={require('../assets/Feature.png')}
                    alt="ZTCC"
                    className="feature-img-square"
                  />
                  <div className="d-flex align-items-center pl-3">
                    <span className="feature-label">Create Events</span>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-direction-row single-feature">
                  <img
                    src={require('../assets/Report.png')}
                    alt="ZTCC"
                    className="feature-img"
                  />
                  <div className="d-flex align-items-center pl-3">
                    <span className="feature-label">Report</span>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-direction-row single-feature">
                  <img
                    src={require('../assets/Feature.png')}
                    alt="ZTCC"
                    className="feature-img-square"
                  />
                  <div className="d-flex align-items-center pl-3">
                    <span className="feature-label">Send SMS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="churches-section" className="churches-section">
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <span className="churches-title">CHURCHES</span>
                </div>
                <div className="col-md-10 d-flex flex-direction-row pl-5">
                  {churches.map((church, index) => (
                    <div
                      className="church-card"
                      key={index}
                      onClick={() =>
                        this.props.history.push(`church/${church.slug}`)
                      }
                    >
                      <img
                        src={church.imageLocation}
                        alt={church.name}
                        className="church-icon"
                      />
                      <div>
                        <span className="church-name">{church.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section id="footer" className="footer">
            <div className="container my-3">
              <div className="row">
                <span className="footer-label">
                  © COPYRIGHT {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </section>
          <div className="bottom-line">
            <span className="block-1" />
            <span className="block-2" />
            <span className="block-3" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ churches, authedUser }) => {
  return {
    churches: Object.values(churches),
    isAuth: Object.keys(authedUser).length !== 0,
  };
};

export default connect(mapStateToProps)(Homepage);
