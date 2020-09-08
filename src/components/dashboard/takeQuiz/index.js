import React, { Component } from 'react';
import { Pagination, message, Popconfirm, Button, Result, Modal } from 'antd';
import { connect } from 'react-redux';
import TextBox from '../../textbox';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { handleSubmitQuiz } from '../../../actions/quiz';

class TakeQuiz extends Component {
  state = {
    levelQuiz: this.props.levelQuiz,
    answers: [],
    count: 0,
    singleChoiceAnswer: '',
    multipleChoiceAnswer: '',
    errors: {
      singleChoiceAnswer: '',
    },
    loading: false,
    modal2Visible: false,
    finalResponse: false,
  };

  handleChangeAnswer = (e) =>
    this.setState({ multipleChoiceAnswer: e.target.value });

  handleSingleChoiceAnswer = (e) =>
    this.setState({ singleChoiceAnswer: e.target.value });

  handlePagination = (page) => this.setState({ count: page - 1 });

  handleSubmit = (qType, QId) => {
    const {
      count,
      singleChoiceAnswer,
      multipleChoiceAnswer,
      answers,
    } = this.state;
    const { num } = this.props;
    const response =
      qType === 'singleChoice' ? singleChoiceAnswer : multipleChoiceAnswer;

    if (count < num) {
      this.setState({
        answers: _.unionBy([{ QId, answer: response }], answers, 'QId'),
        singleChoiceAnswer: '',
        multipleChoiceAnswer: '',
      });
      if (count + 1 < num) {
        this.setState({
          count: count + 1,
        });
      } else message.success('Proceed to Submitting please');
    }
  };

  handleFinalSubmit = () => {
    const { num, stdId } = this.props;
    const { answers } = this.state;
    if (num === answers.length) {
      this.setState({ loading: true });
      this.props
        .dispatch(
          handleSubmitQuiz({
            stdId,
            answers,
          })
        )
        .then((res) => {
          this.setState({ loading: false });
          this.setState({
            modal2Visible: true,
            finalResponse: res
              ? {
                  status: 'success',
                  title: 'Succeeded',
                  subTitle: 'Congratulations, you Succeeded.',
                }
              : {
                  status: 'error',
                  title: 'Failed',
                  subTitle: 'Unfortunately you failed the test.',
                },
          });
        });
    } else message.warning('Answer all question first please');
  };

  render() {
    const {
      levelQuiz,
      count,
      errors,
      multipleChoiceAnswer,
      singleChoiceAnswer,
      answers,
      loading,
      modal2Visible,
      finalResponse,
    } = this.state;
    const { num } = this.props;

    return (
      <div className="container pt-5">
        <Modal
          centered
          visible={modal2Visible}
          footer={null}
          onCancel={() => (window.location.href = '/dashboard')}
        >
          {finalResponse && (
            <Result
              status={finalResponse.status}
              title={finalResponse.title}
              subTitle={finalResponse.subTitle}
            />
          )}
        </Modal>
        <div className="dashboard-card p-3">
          {levelQuiz ? (
            <>
              <div className="row mb-3 px-3 d-flex justify-content-between border-bottom pb-3">
                <div>
                  <span className="modal-title">Take Quiz</span>
                </div>
                <div className="d-flex flex-column">
                  <div>
                    <span className="font-weight-bold">Level Name: </span>
                    <span>{levelQuiz.levelName}</span>
                  </div>
                  <div>
                    <span className="font-weight-bold">
                      Level Description:{' '}
                    </span>
                    <span>{levelQuiz.levelDescription}</span>
                  </div>
                  <div>
                    <span className="font-weight-bold">Passing Rate: </span>
                    <span>{levelQuiz.passingRate}</span>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 mx-auto my-auto">
                  <div className="card-box">
                    <div className="card-heading">
                      <h5 className="font-weight-bold pl-3">
                        Question {count + 1}
                      </h5>
                    </div>
                    <div className="poll-body justify-content-center">
                      <div className="new-login-form">
                        <div
                          //   onSubmit={this.handleSubmit}
                          className="d-flex flex-column align-items-center"
                        >
                          <div className="poll-question d-flex flex-column align-items-center">
                            <h5 className="font-weight-bold text-center">
                              {levelQuiz.quizes[count].question}
                            </h5>
                            {levelQuiz.quizes[count].type === 'multiChoice' ? (
                              <div
                                className="multipleChoice"
                                id="multipleChoice"
                              >
                                {levelQuiz.quizes[count].answer
                                  .slice(1, -1)
                                  .split(',')
                                  .map((answer, index) => (
                                    <div className="form-check" key={answer}>
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        value={answer}
                                        onChange={this.handleChangeAnswer}
                                      />
                                      <label className="form-check-label">
                                        {answer}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <TextBox
                                name="singleChoiceAnswer"
                                error={errors.singleChoiceAnswer}
                                onChange={(e) =>
                                  this.handleSingleChoiceAnswer(e)
                                }
                              />
                            )}
                          </div>
                          {levelQuiz.quizes[count].type === 'multiChoice' ? (
                            <button
                              className="btn btn-primary btn-block custom-btn"
                              type="button"
                              disabled={multipleChoiceAnswer === ''}
                              onClick={() =>
                                this.handleSubmit(
                                  levelQuiz.quizes[count].type,
                                  levelQuiz.quizes[count].QId
                                )
                              }
                            >
                              Next
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary btn-block custom-btn"
                              type="button"
                              disabled={singleChoiceAnswer === ''}
                              onClick={() =>
                                this.handleSubmit(
                                  levelQuiz.quizes[count].type,
                                  levelQuiz.quizes[count].QId
                                )
                              }
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-center">
                <Pagination
                  current={count + 1}
                  total={num}
                  defaultPageSize={1}
                  onChange={this.handlePagination}
                />
                {/* <button
                  className="btn btn-primary btn-block custom-btn ml-3"
                  type="button"
                  disabled={num !== answers.length + 1}
                  onClick={() => this.handleFinalSubmit}
                >
                  Submit
                </button> */}
                <Popconfirm
                  placement="top"
                  title="Are you sure to submit the response?"
                  onConfirm={() => this.handleFinalSubmit()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary custom-btn" className="ml-3">
                    {loading ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="sm"
                        color="#fff"
                        className="ml-2"
                      />
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Popconfirm>
              </div>
            </>
          ) : (
            <div className="row py-5 d-flex justify-content-center">
              <span className="font-weight-bold h3">No Quiz Found</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ levelQuizes, authedUser }) => {
  return {
    levelQuiz: levelQuizes.length !== 0 && levelQuizes[0],
    num:
      levelQuizes.length !== 0 &&
      levelQuizes[0] &&
      levelQuizes[0].quizes &&
      levelQuizes[0].quizes.length,
    stdId: authedUser.stdId,
  };
};

export default connect(mapStateToProps)(TakeQuiz);
