import React, { Component } from 'react';
import {
  Pagination,
  message,
  Popconfirm,
  Button,
  Result,
  Modal,
  Tag,
  Badge,
} from 'antd';
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
    modal1Visible: false,
    finalResponse: false,
    quizResult: null,
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
            quizResult: res.meta,
            finalResponse: res.passed
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
      modal1Visible,
      finalResponse,
      quizResult,
    } = this.state;
    const { num, newLevelDetails } = this.props;

    return (
      <div className="container pt-5">
        <Modal
          centered
          visible={modal2Visible}
          footer={null}
          onCancel={() => (window.location.href = '/dashboard')}
        >
          {finalResponse && (
            <>
              <Result
                status={finalResponse.status}
                title={finalResponse.title}
                subTitle={finalResponse.subTitle}
              />
              <div className="row justify-content-center align-items-center">
                <button
                  className="btn btn-primary btn-block custom-btn new-custom-btn"
                  type="button"
                  onClick={() =>
                    this.setState({ modal2Visible: false, modal1Visible: true })
                  }
                >
                  View Details
                </button>
              </div>
            </>
          )}
        </Modal>
        <Modal
          centered
          visible={modal1Visible}
          footer={null}
          onCancel={() => (window.location.href = '/dashboard')}
        >
          {quizResult && (
            <div className="container">
              <div className="row">
                <div className="h4">Quiz Details</div>
              </div>
              <div className="row">
                <span>Quiz Total Points: </span>
                <span>{quizResult['Quiz Total Points']}</span>
              </div>
              <div className="row">
                <span>Student Points: </span>
                <span>{quizResult['Student Points']}</span>
              </div>
              <div className="row mb-5">
                <span>Average: </span>
                <span>{quizResult['Average']}</span>
              </div>
              <div className="row">
                <span>Number of Questions: </span>
                <span>{quizResult['Answers'].length}</span>
              </div>
              <div className="row">
                <span>Number of Correct Answers: </span>
                <span>
                  {
                    quizResult['Answers'].filter(
                      (result) => result.passed === true
                    ).length
                  }
                </span>
              </div>
              <div className="row mb-5">
                <span>Number of False Answers: </span>
                <span>
                  {
                    quizResult['Answers'].filter(
                      (result) => result.passed === false
                    ).length
                  }
                </span>
              </div>
              <div className="row mb-3">
                <span className="h5">Question Details </span>
              </div>
              {quizResult['Answers'].map((result, index) => (
                <div className="container mb-3" key={index}>
                  <div className="row">
                    <span>
                      Question{' '}
                      <Badge
                        count={index + 1}
                        style={
                          result.passed
                            ? { backgroundColor: '#52c51a' }
                            : { backgroundColor: '#ff4d4e' }
                        }
                      />
                    </span>
                  </div>
                  <div className="row">
                    <span>Question Type: </span>
                    <span>{result.type}</span>
                  </div>
                  <div className="row">
                    <span>Marks: </span>
                    <span>{result.marks}</span>
                  </div>
                  <div className="row">
                    <span>Question: </span>
                    <span>{result.question}</span>
                  </div>
                  <div className="row">
                    <span>Response: </span>
                    <span>{result.answered}</span>
                  </div>
                  {result.type === 'multiChoice' ? (
                    <div className="row">
                      <span>Correct Answer: </span>

                      {result.answer
                        .substring(2, result.answer.length - 2)
                        .split(',')
                        .map((answer, index) => (
                          <Tag color="geekblue" key={index}>
                            {answer}
                          </Tag>
                        ))}
                    </div>
                  ) : (
                    <div className="row">
                      <span>Correct Answer: </span>
                      <span>{result.answer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal>
        <div className="dashboard-card p-3">
          {levelQuiz.length !== 0 && newLevelDetails ? (
            <>
              <div className="row mb-3 px-3 d-flex justify-content-between border-bottom pb-3">
                <div>
                  <span className="modal-title">Take Quiz</span>
                </div>
                <div className="d-flex flex-column">
                  <div>
                    <span className="font-weight-bold">Course Name: </span>
                    <span>{newLevelDetails.levelName}</span>
                  </div>
                  <div>
                    <span className="font-weight-bold">
                      Course Description:{' '}
                    </span>
                    <span>{newLevelDetails.levelDescription}</span>
                  </div>
                  <div>
                    <span className="font-weight-bold">Passing Rate: </span>
                    <span>{newLevelDetails.passingRate}</span>
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
                              {levelQuiz[count] && levelQuiz[count].question}
                            </h5>
                            {levelQuiz[count] &&
                            levelQuiz[count].type === 'multiChoice' ? (
                              <div
                                className="multipleChoice"
                                id="multipleChoice"
                              >
                                {levelQuiz[count] &&
                                  levelQuiz[count].answer
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
                                value={singleChoiceAnswer}
                                error={errors.singleChoiceAnswer}
                                onChange={(e) =>
                                  this.handleSingleChoiceAnswer(e)
                                }
                              />
                            )}
                          </div>
                          {levelQuiz[count] &&
                          levelQuiz[count].type === 'multiChoice' ? (
                            <button
                              className="btn btn-primary btn-block custom-btn"
                              type="button"
                              disabled={multipleChoiceAnswer === ''}
                              onClick={() =>
                                this.handleSubmit(
                                  levelQuiz[count].type,
                                  levelQuiz[count].QId
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
                                  levelQuiz[count].type,
                                  levelQuiz[count].QId
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

const mapStateToProps = ({ authedUser, newLevelDetails, newLevelQuizes }) => {
  return {
    levelQuiz: newLevelQuizes.length !== 0 && newLevelQuizes,
    num: newLevelQuizes.length,
    stdId: authedUser.stdId,
    newLevelDetails,
  };
};

export default connect(mapStateToProps)(TakeQuiz);
