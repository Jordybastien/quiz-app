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
import { handleNewLevel } from '../../../actions/level';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

const questionTypes = [
  { value: 'singleChoice', label: 'Single Choice' },
  { value: 'multiChoice', label: 'Multiple Choice' },
];

class LevelsComponent extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    levelQuizes: this.props.levelQuizes,
    selectedOption: null,
    modal1Visible: false,
    modal2Visible: false,
    levelName: '',
    levelDescription: '',
    level: '',
    passingRate: '',
    errors: {
      levelName: '',
      levelDescription: '',
      level: '',
      passingRate: '',
    },
    loading: false,
    selectedLevel: null,
    selectedType: null,
    selectedRecord: null,
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
      const title = 'All Levels';
      const headers = [
        ['#', 'Level Name', 'Level Description', 'Level', 'Passing Rate'],
      ];

      const data = this.state.levelQuizes.map((elt) => [
        elt.rowNum,
        elt.levelName,
        elt.levelDescription,
        elt.level,
        elt.passingRate,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push([
        '\r\n',
        '#',
        'Level Name',
        'Level Description',
        'Level',
        'Passing Rate',
      ]);

      this.state.levelQuizes.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.levelName,
          elt.levelDescription,
          elt.level,
          elt.passingRate,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { levelQuizes } = this.state;
      this.setState({
        levelQuizes: levelQuizes.filter(
          (el) =>
            el.levelName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.level.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ levelQuizes: this.props.levelQuizes });
    }
  };

  handlelevelName = (e) => {
    const { errors } = this.state;
    errors.levelName = '';
    this.setState({ errors, levelName: e.target.value });
  };

  handleLevelDescription = (e) => {
    const { errors } = this.state;
    errors.levelDescription = '';
    this.setState({ errors, levelDescription: e.target.value });
  };

  handleLevel = (e) => {
    const { errors } = this.state;
    errors.level = '';
    this.setState({ errors, level: e.target.value });
  };

  handlePassingRate = (e) => {
    const { errors } = this.state;
    errors.passingRate = '';
    this.setState({ errors, passingRate: e.target.value });
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      this.setState({ loading: true });
      this.props.dispatch(handleNewLevel(data)).then((res) => {
        this.setState({ loading: false });
        if (res) {
          this.setState({
            modal1Visible: false,
            levelQuizes: this.props.levelQuizes,
          });
        }
      });
    }
  };

  checkValidation = () => {
    const {
      levelName,
      levelDescription,
      level,
      passingRate,
      errors,
    } = this.state;
    let response = true;
    let data = {};

    data.levelName = levelName;
    data.levelDescription = levelDescription;
    data.level = level;
    data.passingRate = passingRate;

    if (!levelName) {
      errors.levelName = 'Level Name is Required';
      response = false;
    }

    if (!levelDescription) {
      errors.levelDescription = 'Level Description is required';
      response = false;
    }
    if (!level) {
      errors.level = 'Level is required';
      response = false;
    } else if (isNaN(level)) {
      errors.level = 'Level should be a numeric value';
      response = false;
    }
    if (!passingRate) {
      errors.passingRate = 'Passing Rate is required';
      response = false;
    } else if (isNaN(passingRate)) {
      errors.passingRate = 'Passing Rate should be a numeric value';
      response = false;
    }

    this.setState({ errors });
    return { data, response };
  };

  handleViewMore = (record) => {
    this.setState({ selectedRecord: record, modal2Visible: true });
  };

  render() {
    const {
      selectedOption,
      levelQuizes,
      errors,
      loading,
      selectedLevel,
      selectedType,
      selectedRecord,
    } = this.state;

    const { num } = this.props;

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
        title: 'Level Name',
        dataIndex: 'levelName',
        key: 'levelName',
        sorter: (a, b) => a.levelName.length - b.levelName.length,
        sortOrder: sortedInfo.columnKey === 'levelName' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Level Description',
        dataIndex: 'levelDescription',
        key: 'levelDescription',
      },
      {
        title: 'Passing Rate',
        dataIndex: 'passingRate',
        key: 'passingRate',
      },
      // {
      //   title: 'Number of quizes',
      //   dataIndex: 'quizes',
      //   key: 'quizes',
      //   width: 100,
      //   render: (quizes) => {
      //     return quizes ? quizes.length : 0;
      //   },
      // },
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <Button type="primary" onClick={() => this.handleViewMore(record)}>
      //       View Quizes
      //     </Button>
      //   ),
      // },
    ];

    return (
      <div className="container">
        <div className="row mb-5">{/* Content Here */}</div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Tooltip placement="right" title={<span>Add Level</span>}>
              <Button
                icon={<PlusOutlined className="add-dashboard-btn-icon" />}
                type="primary"
                shape="circle"
                size={'large'}
                className="main-bg-color override-btn add-dashboard-btn mb-3"
                onClick={() => this.setState({ modal1Visible: true })}
              />
            </Tooltip>
            {selectedRecord && (
              <Modal
                title={`${selectedRecord.levelName} quizes`}
                centered
                visible={this.state.modal2Visible}
                footer={null}
                onCancel={() => this.setState({ modal2Visible: false })}
              >
                <div className="container">
                  {selectedRecord.quizes.map((quiz, index) => (
                    <div
                      className="row txt-box-container border-bottom mb-5 pb-3"
                      key={index}
                    >
                      <div className="row txt-box-container">
                        <div>
                          <span className="input-label font-weight-bold">
                            Question Type
                          </span>
                        </div>
                        <div>
                          <span className="input-label">{quiz.type}</span>
                        </div>
                      </div>
                      <div className="row txt-box-container">
                        <div>
                          <span className="input-label font-weight-bold">
                            Question
                          </span>
                        </div>
                        <div>
                          <span className="input-label">{quiz.question}</span>
                        </div>
                      </div>
                      <div className="row txt-box-container">
                        <div>
                          <span className="input-label font-weight-bold">
                            Answers
                          </span>
                        </div>
                        <div>
                          <span className="input-label">{quiz.answer}</span>
                        </div>
                      </div>
                      <div className="row txt-box-container">
                        <div>
                          <span className="input-label font-weight-bold">
                            Response
                          </span>
                        </div>
                        <div>
                          <span className="input-label">{quiz.response}</span>
                        </div>
                      </div>
                      <div className="row txt-box-container">
                        <div>
                          <span className="input-label font-weight-bold">
                            Marks
                          </span>
                        </div>
                        <div>
                          <span className="input-label">{quiz.marks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
            )}
            <Modal
              title="Add Student"
              centered
              visible={this.state.modal1Visible}
              footer={null}
              onCancel={() => this.setState({ modal1Visible: false })}
            >
              <div className="container">
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Level Name</span>
                  </div>
                  <div>
                    <TextBox
                      name="levelName"
                      error={errors.levelName}
                      onChange={(e) => this.handlelevelName(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Level Description</span>
                  </div>
                  <div>
                    <TextBox
                      name="levelDescription"
                      error={errors.levelDescription}
                      onChange={(e) => this.handleLevelDescription(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Level(Numeric value)</span>
                  </div>
                  <div>
                    <TextBox
                      name="level"
                      error={errors.level}
                      onChange={(e) => this.handleLevel(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Passing Rate</span>
                  </div>
                  <div>
                    <TextBox
                      name="passingRate"
                      error={errors.passingRate}
                      onChange={(e) => this.handlePassingRate(e)}
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
            <span className="modal-title">Levels </span>
            <span>({num})</span>
          </div>
          <div className="row">
            <Table
              columns={columns}
              dataSource={levelQuizes}
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

const mapStateToProps = ({ levels: levelQuizes }) => ({
  levelQuizes: Object.values(levelQuizes).map((obj, index) => ({
    ...obj,
    key: index,
    rowNum: index + 1,
  })),
  num: Object.values(levelQuizes).length,
});

export default connect(mapStateToProps)(LevelsComponent);
