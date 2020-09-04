import React, { Component } from 'react';
import TextBox from '../textbox';
import { Button, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { languages } from '../../utils/languages';

class BookService extends Component {
  state = {
    loading: false,
    fullNames: '',
    phone: '',
    address: '',
    age: '',
    errors: {
      fullNames: '',
      phone: '',
      address: '',
      age: '',
    },
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.props.handleSubmit(data);
    }
  };

  handleFullNames = (e) => {
    const { errors } = this.state;
    errors.fullNames = '';
    this.setState({ errors, fullNames: e.target.value });
  };

  handleAddress = (e) => {
    const { errors } = this.state;
    errors.address = '';
    this.setState({ errors, address: e.target.value });
  };

  handleAge = (e) => {
    const { errors } = this.state;
    if (isNaN(e.target.value)) {
      errors.age = 'age must be numeric';
      this.setState({ errors });
    } else if (e.target.value < 18) {
      errors.age = 'You must be an adult to book this service';
      this.setState({ errors });
    } else {
      errors.age = '';
      this.setState({ errors, age: e.target.value });
    }
  };

  handlePhone = (e) => {
    const { errors } = this.state;
    if (isNaN(e.target.value)) {
      errors.phone = 'Phone Number must be numeric';
      this.setState({ errors });
    } else if (e.target.value.length < 10 || e.target.value.length > 10) {
      errors.phone = 'Invalid Phone Number';
      this.setState({ errors });
    } else {
      errors.phone = '';
      this.setState({ errors, phone: e.target.value });
    }
  };

  checkValidation = () => {
    const { fullNames, phone, address, age, errors } = this.state;
    let response = true;
    let data = {};

    data.fullNames = fullNames;
    data.MSISDN = phone;
    data.address = address;
    data.age = age;
    data.status = 1;

    if (!fullNames) {
      errors.fullNames = 'Required';
      response = false;
    }

    if (!phone) {
      errors.phone = 'Required';
      response = false;
    }

    if (!address) {
      errors.address = 'Required';
      response = false;
    }

    if (!age) {
      errors.age = 'Required';
      response = false;
    }

    this.setState({ errors });
    return { data, response };
  };

  render() {
    const { service, loading, errorMessage, language } = this.props;
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row mb-5">
          <div className="modal-header-info">
            <div>
              <span className="modal-title">{service.title}</span>
            </div>
            <div>
              <span className="modal-time">
                {service.startAt.substr(0, 5)} - {service.endAt.substr(0, 5)}
              </span>
            </div>
          </div>
        </div>
        <div className="row txt-box-container">
          {errorMessage && (
            <div className="error-message-main-container mb-5">
              <div className="error-message-container">
                <Alert
                  message="Error"
                  description={errorMessage}
                  type="error"
                  showIcon
                />
              </div>
            </div>
          )}
        </div>
        <div className="row txt-box-container">
          <div>
            <span className="input-label">{languages[language].name}</span>
          </div>
          <div>
            <TextBox
              name="fullNames"
              error={errors.fullNames}
              onChange={(e) => this.handleFullNames(e)}
            />
          </div>
        </div>
        <div className="row txt-box-container">
          <div>
            <span className="input-label">{languages[language].phone}</span>
          </div>
          <div>
            <TextBox
              name="phone"
              error={errors.phone}
              onChange={(e) => this.handlePhone(e)}
            />
          </div>
        </div>
        <div className="row txt-box-container">
          <div>
            <span className="input-label">{languages[language].address}</span>
          </div>
          <div>
            <TextBox
              name="address"
              error={errors.address}
              onChange={(e) => this.handleAddress(e)}
            />
          </div>
        </div>
        <div className="row txt-box-container">
          <div>
            <span className="input-label">{languages[language].age}</span>
          </div>
          <div>
            <TextBox
              name="age"
              error={errors.age}
              onChange={(e) => this.handleAge(e)}
            />
          </div>
        </div>
        <div className="submit-btn-container">
          <Button
            type="primary"
            className="custom-btn"
            onClick={() => this.handleFormSubmit()}
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                size="sm"
                color="#fff"
                className="ml-2"
              />
            ) : (
              `${languages[language].button}`
            )}
          </Button>
        </div>
      </div>
    );
  }
}

export default BookService;
