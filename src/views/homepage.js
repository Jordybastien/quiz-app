import React, { Component } from 'react';
import { connect } from 'react-redux';

class Homepage extends Component {
  state = {};
  render() {
    const { isAuth } = this.props;
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
                    <span className="about-us-title">Quiz App</span>
                  </div>
                  <div>
                    <span className="about-us-description">
                      This system enables the student as supplementary
                      mechanisms to assist learning both inside and outside the
                      available institutions of learning. This product aim is to
                      develop a game application to power learning through an
                      interactive game experience for assisted learning of
                      mathematics and science concepts in early primary levels,
                      it is a positive initiative towards the education goals
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
                    src={require('../assets/ill-3.svg')}
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
                    src={require('../assets/ill-4.svg')}
                    alt="ZTCC"
                    className="covid-img"
                  />
                </div>
                <div className="col-md-9">
                  <div className="mb-3">
                    <span className="covid-title">Quiz App</span>
                  </div>
                  <div>
                    <ul className="covid-list">
                      <li>
                        <span className="covid-list-item">
                          Improves problem-solving skills.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          Improves attention and concentration.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          It is different from the usual systematic learning
                          tools.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          This game increases the brain’s speed and enhances
                          multitasking skills.
                        </span>
                      </li>
                      <li>
                        <span className="covid-list-item">
                          Controlled competitiveness.
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
                    <span className="feature-label">Take Quiz</span>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-direction-row single-feature">
                  <img
                    src={require('../assets/Report.png')}
                    alt="ZTCC"
                    className="feature-img"
                  />
                  <div className="d-flex align-items-center pl-3">
                    <span className="feature-label">Receive Marks</span>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-direction-row single-feature">
                  <img
                    src={require('../assets/Feature.png')}
                    alt="ZTCC"
                    className="feature-img-square"
                  />
                  <div className="d-flex align-items-center pl-3">
                    <span className="feature-label">Get Promoted</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section id="churches-section" className="churches-section">
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
          </section> */}
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

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
  };
};

export default connect(mapStateToProps)(Homepage);
