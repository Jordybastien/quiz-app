import React, { Component } from 'react';
import { Table, Tooltip, Button, Modal, Tag, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import TextBox from '../../textbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { handleNewLevel } from '../../../actions/level';
import { handleUserHistory } from '../../../actions/history';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

const questionTypes = [
  { value: 'singleChoice', label: 'Single Choice' },
  { value: 'multiChoice', label: 'Multiple Choice' },
];

class HistoryComponent extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    history: this.props.history,
    selectedOption: null,
    modal1Visible: false,
    loading: false,
    selectedRecord: null,
    selHistoryId: '',
    userHistory: this.props.userHistory,
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
      const title = 'My History';
      const headers = [
        ['#', 'Date Taken(yyyy/mm/dd)', 'Average', 'Points', 'Level'],
      ];

      const data = this.state.history.map((elt) => [
        elt.rowNum,
        elt.dateTaken,
        elt.average,
        elt.points,
        elt.level,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push([
        '\r\n',
        '#',
        'Date Taken(yyyy/mm/dd)',
        'Average',
        'Points',
        'Level',
      ]);

      this.state.history.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.dateTaken,
          elt.average,
          elt.points,
          elt.level,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleViewMore = (record) => {
    this.setState({
      selectedRecord: record.data,
      loading: true,
      selHistoryId: record.historyId,
    });
    this.props.dispatch(handleUserHistory(record.historyId)).then((res) => {
      this.setState({
        loading: false,
        modal1Visible: res,
        userHistory: this.props.userHistory,
      });
    });
  };

  render() {
    const {
      selectedOption,
      history,
      errors,
      loading,
      selectedLevel,
      selectedType,
      selectedRecord,
      selHistoryId,
      modal1Visible,
      userHistory,
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
        title: 'Date Taken(yyyy/mm/dd)',
        dataIndex: 'dateTaken',
        key: 'dateTaken',
      },
      {
        title: 'Average',
        dataIndex: 'average',
        key: 'average',
      },
      {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
      },
      {
        title: 'Course',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Button type="primary" onClick={() => this.handleViewMore(record)}>
              View more{' '}
              {loading && record.historyId === selHistoryId && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="sm"
                  color="#fff"
                  className="ml-2"
                />
              )}
            </Button>
          );
        },
      },
    ];

    return (
      <div className="container">
        <div className="row mb-5">{/* Content Here */}</div>
        <div className="row mb-3 flex-row-reverse pr-4">
          <div className="col-md-4 select-container">
            <Select
              value={selectedOption}
              onChange={this.handleSelect}
              options={options}
              placeholder="Export"
              className="customized-select mb-3"
              isSearchable={false}
            />
            {
              <Modal
                visible={modal1Visible}
                footer={null}
                onCancel={() => this.setState({ modal1Visible: false })}
              >
                <div className="container">
                  <div className="row">
                    <span>Number of Questions: </span>
                    <span>{userHistory && userHistory.length}</span>
                  </div>
                  <div className="row">
                    <span>Number of Correct Answers: </span>
                    <span>
                      {userHistory &&
                        userHistory.length !== 0 &&
                        userHistory.filter((result) => result.passed === true)
                          .length}
                    </span>
                  </div>
                  <div className="row mb-5">
                    <span>Number of False Answers: </span>
                    <span>
                      {userHistory &&
                        userHistory.length !== 0 &&
                        userHistory.filter((result) => result.passed === false)
                          .length}
                    </span>
                  </div>
                  <div className="row mb-3">
                    <span className="h5">Question Details </span>
                  </div>
                  {userHistory &&
                    userHistory.length !== 0 &&
                    userHistory.map((result, index) => (
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
              </Modal>
            }
          </div>
        </div>
        <div className="dashboard-card">
          <div className="row mb-3">
            <span className="modal-title">My History</span>
            <span>({num})</span>
          </div>
          <div className="row">
            <Table
              columns={columns}
              dataSource={history}
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

const mapStateToProps = ({ history, userHistory }) => ({
  history: Object.values(history)
    .map((obj, index) => ({
      ...obj,
      key: index,
      rowNum: index + 1,
      dateTaken: obj.dateCreated.split('T')[0],
    }))
    .reverse(),
  num: Object.values(history).length,
  userHistory: userHistory && Object.values(userHistory),
});

export default connect(mapStateToProps)(HistoryComponent);
