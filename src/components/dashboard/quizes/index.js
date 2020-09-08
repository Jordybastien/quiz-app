import React, { Component } from 'react';
import { Table, Tooltip, Button, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import TextBox from '../../textbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { handleNewQuiz } from '../../../actions/quiz';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

const questionTypes = [
  { value: 'singleChoice', label: 'Single Choice' },
  { value: 'multiChoice', label: 'Multiple Choice' },
];

class AllQuizesComponent extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    allQuizes: this.props.allQuizes,
    selectedOption: null,
    modal1Visible: false,
    question: '',
    response: '',
    answers: '',
    marks: '',
    errors: {
      question: '',
      response: '',
      answers: '',
      marks: '',
    },
    loading: false,
    selectedLevel: null,
    selectedType: null,
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });

    if (selectedOption.value === 'pdf') {
      const title = 'All Quizes';
      const headers = [
        ['#', 'Type', 'Question', 'Answer', 'Response', 'Marks', 'Level'],
      ];

      const data = this.state.allQuizes.map((elt) => [
        elt.rowNum,
        elt.type,
        elt.question,
        elt.answer,
        elt.response,
        elt.marks,
        elt.levelId,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push([
        '\r\n',
        '#',
        'Type',
        'Question',
        'Answer',
        'Response',
        'Marks',
        'Level',
      ]);

      this.state.allQuizes.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.type,
          elt.question,
          elt.answer,
          elt.response,
          elt.marks,
          elt.levelId,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { allQuizes } = this.state;
      this.setState({
        allQuizes: allQuizes.filter(
          (el) =>
            el.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.marks.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.levelId.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.response.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ allQuizes: this.props.allQuizes });
    }
  };

  handleQuestionType = (selectedType) => this.setState({ selectedType });

  handleLevel = (selectedLevel) => this.setState({ selectedLevel });

  handleQuestion = (e) => {
    const { errors } = this.state;
    errors.question = '';
    this.setState({ errors, question: e.target.value });
  };

  handleResponse = (e) => {
    const { errors } = this.state;
    errors.response = '';
    this.setState({ errors, response: e.target.value });
  };

  handleAnswers = (e) => {
    const { errors } = this.state;
    errors.answers = '';
    this.setState({ errors, answers: e.target.value });
  };

  handleMarks = (e) => {
    const { errors } = this.state;
    errors.marks = '';
    this.setState({ errors, marks: e.target.value });
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.setState({ loading: true });
      this.props.dispatch(handleNewQuiz(data)).then((res) => {
        this.setState({ loading: false });
        if (res) {
          this.setState({
            modal1Visible: false,
            allQuizes: this.props.allQuizes,
          });
        }
      });
    }
  };

  checkValidation = () => {
    const {
      question,
      response: questionResponse,
      answers,
      marks,
      selectedLevel,
      selectedType,
      errors,
    } = this.state;
    let response = true;
    let data = {};

    data.question = question;
    data.response = questionResponse;
    data.marks = marks;
    data.answer =
      selectedType === 'singleChoice'
        ? `["${answers}"]`
        : `[${answers.split(',')}]`;
    data.levelId = selectedLevel && selectedLevel.value;
    data.type = selectedType && selectedType.value;

    if (!question) {
      errors.question = 'Question is Required';
      response = false;
    }

    if (!questionResponse) {
      errors.response = 'Response is required';
      response = false;
    }
    if (!answers) {
      errors.answers = 'Answers are required';
      response = false;
    }
    if (!marks) {
      errors.marks = 'Marks are required';
      response = false;
    }
    if (!selectedLevel) {
      errors.selectedLevel = 'Level is required';
      response = false;
    }
    if (!selectedType) {
      errors.selectedType = 'Level is required';
      response = false;
    }

    this.setState({ errors });
    return { data, response };
  };

  render() {
    const {
      selectedOption,
      allQuizes,
      errors,
      loading,
      selectedLevel,
      selectedType,
    } = this.state;

    const { num, levelQuizes } = this.props;

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: '#',
        dataIndex: 'rowNum',
        key: 'rowNum',
        sorter: (a, b) => a.rowNum - b.rowNum,
        sortOrder: sortedInfo.columnKey === 'rowNum' && sortedInfo.order,
        ellipsis: true,
        width: 50,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.type.length - b.type.length,
        sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Question',
        dataIndex: 'question',
        key: 'question',
      },
      {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer',
        render: (answer) => {
          return (
            <Tag color="geekblue" key={answer}>
              {answer}
            </Tag>
          );
        },
      },
      {
        title: 'Response',
        dataIndex: 'response',
        key: 'response',
      },
      {
        title: 'Marks',
        dataIndex: 'marks',
        key: 'marks',
        width: 100,
      },
      {
        title: 'Level',
        dataIndex: 'levelId',
        key: 'levelId',
        width: 100,
      },
    ];

    return (
      <div className="container">
        <div className="row mb-5">{/* Content Here */}</div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Tooltip placement="right" title={<span>Add Quiz</span>}>
              <Button
                icon={<PlusOutlined className="add-dashboard-btn-icon" />}
                type="primary"
                shape="circle"
                size={'large'}
                className="main-bg-color override-btn add-dashboard-btn mb-3"
                onClick={() => this.setState({ modal1Visible: true })}
              />
            </Tooltip>
            <Modal
              title="Add Quiz"
              centered
              visible={this.state.modal1Visible}
              footer={null}
              onCancel={() => this.setState({ modal1Visible: false })}
            >
              <div className="container">
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Question Type</span>
                  </div>
                  <div>
                    <Select
                      value={selectedType}
                      onChange={this.handleQuestionType}
                      options={questionTypes}
                      className="another-select"
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Question</span>
                  </div>
                  <div>
                    <TextBox
                      name="question"
                      error={errors.question}
                      onChange={(e) => this.handleQuestion(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Response</span>
                  </div>
                  <div>
                    <TextBox
                      name="response"
                      error={errors.response}
                      onChange={(e) => this.handleResponse(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Answers</span>
                  </div>
                  <div>
                    <TextBox
                      name="answers"
                      error={errors.answers}
                      onChange={(e) => this.handleAnswers(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Marks</span>
                  </div>
                  <div>
                    <TextBox
                      name="marks"
                      error={errors.marks}
                      onChange={(e) => this.handleMarks(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container mb-5">
                  <div>
                    <span className="input-label">Level</span>
                  </div>
                  <div>
                    <Select
                      value={selectedLevel}
                      onChange={this.handleLevel}
                      options={levelQuizes}
                      className="another-select"
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className="row submit-btn-container justify-content-center">
                  <div>
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
                        'Add'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Search by name or phone number"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-md-4 select-container">
            <Select
              value={selectedOption}
              onChange={this.handleSelect}
              options={options}
              placeholder="Export"
              className="customized-select mb-3"
              isSearchable={false}
            />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="row mb-3">
            <span className="modal-title">All Quizes </span>
            <span>({num})</span>
          </div>
          <div className="row">
            <Table
              columns={columns}
              dataSource={allQuizes}
              onChange={this.handleChange}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50', '100'],
                position: ['bottomCenter'],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ allQuizes, levels: levelQuizes }) => ({
  allQuizes: Object.values(allQuizes).map((obj, index) => ({
    ...obj,
    key: index,
    rowNum: index + 1,
  })),
  num: Object.values(allQuizes).length,
  levelQuizes: Object.values(levelQuizes).map(({ levelName, level }) => ({
    value: level,
    label: levelName,
  })),
});

export default connect(mapStateToProps)(AllQuizesComponent);
