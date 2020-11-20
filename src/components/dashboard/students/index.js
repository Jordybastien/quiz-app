import React, { Component } from 'react';
import { Table, Tooltip, Button, Modal, Tag, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import TextBox from '../../textbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SelectOption from '../../select';
import { handleNewUser } from '../../../actions/student';
import { handleStudentStatus } from '../../../actions/student';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];
const userOptions = [
  { value: 'students', label: 'Students' },
  { value: 'admin', label: 'Admin' },
];

class StudentsComponent extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    students: this.props.students,
    selectedOption: null,
    selectedLevel: null,
    selectedType: null,
    modal1Visible: false,
    loading: false,
    stdFname: '',
    stdLname: '',
    age: '',
    MSISDN: '',
    errors: {
      stdFname: '',
      stdLname: '',
      age: '',
      MSISDN: '',
    },
    selStudentId: '',
    selStatus: '',
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    const title = 'All Users';
    if (selectedOption.value === 'pdf') {
      const headers = [
        ['#', 'First Name', 'Last Name', 'Phone Number', 'Age', 'User Type'],
      ];

      const data = this.state.students.map((elt) => [
        elt.rowNum,
        elt.stdFname,
        elt.stdLname,
        elt.MSISDN,
        elt.age,
        elt.type,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push([
        '\r\n',
        '#',
        'First Name',
        'Last Name',
        'Phone Number',
        'Age',
        'User Type',
      ]);

      this.state.students.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.stdFname,
          elt.stdLname,
          elt.MSISDN,
          elt.age,
          elt.type,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleLevel = (selectedLevel) => this.setState({ selectedLevel });

  handleType = (selectedType) => this.setState({ selectedType });

  handleFname = (e) => {
    const { errors } = this.state;
    errors.stdFname = '';
    this.setState({ errors, stdFname: e.target.value });
  };

  handleLname = (e) => {
    const { errors } = this.state;
    errors.stdLname = '';
    this.setState({ errors, stdLname: e.target.value });
  };

  handleAge = (e) => {
    const { errors } = this.state;
    errors.age = '';
    this.setState({ errors, age: e.target.value });
  };

  handlePhone = (e) => {
    const { errors } = this.state;
    errors.MSISDN = '';
    this.setState({ errors, MSISDN: e.target.value });
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { students } = this.state;
      this.setState({
        students: students.filter(
          (el) =>
            el.stdFname.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.stdLname.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ students: this.props.students });
    }
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      data.MSISDN = '+25' + data.MSISDN;
      this.setState({ loading: true });
      this.props.dispatch(handleNewUser(data)).then((res) => {
        this.setState({ loading: false });
        if (res) {
          this.setState({
            modal1Visible: false,
            students: this.props.students,
          });
        }
      });
    }
  };

  checkValidation = () => {
    const {
      MSISDN,
      stdFname,
      stdLname,
      age,
      selectedLevel,
      selectedType,
      errors,
    } = this.state;
    let response = true;
    let data = {};

    data.MSISDN = MSISDN;
    data.stdFname = stdFname;
    data.stdLname = stdLname;
    data.age = age;
    data.levelId = selectedLevel && selectedLevel.value;
    data.type = selectedType && selectedType.value;

    if (!MSISDN) {
      errors.MSISDN = 'Phone Number is Required';
      response = false;
    } else if (isNaN(MSISDN)) {
      errors.MSISDN = 'Phone Number must be numeric';
      response = false;
    } else if (MSISDN.length < 10 || MSISDN.length > 10) {
      errors.MSISDN = 'Invalid Phone Number';
      response = false;
    }

    if (!stdFname) {
      errors.stdFname = 'First Name is required';
      response = false;
    }
    if (!stdLname) {
      errors.stdLname = 'First Name is required';
      response = false;
    }
    if (!age) {
      errors.age = 'First Name is required';
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

  handleStudent = (student, status) => {
    this.setState({ selStudentId: student.stdId, loading: true });
    this.props
      .dispatch(handleStudentStatus(student, status))
      .then((res) => {
        this.setState({ loading: false });
        if (res) this.setState({ students: this.props.students });
      });
  };

  render() {
    const {
      selectedOption,
      loading,
      selectedLevel,
      selectedType,
      errors,
      students,
      selStudentId,
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
        title: 'First Name',
        dataIndex: 'stdFname',
        key: 'stdFname',
        sorter: (a, b) => a.stdFname.length - b.stdFname.length,
        sortOrder: sortedInfo.columnKey === 'stdFname' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Last Name',
        dataIndex: 'stdLname',
        key: 'stdLname',
      },
      {
        title: 'Phone Number',
        dataIndex: 'MSISDN',
        key: 'MSISDN',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
      },
      {
        title: 'User Type',
        dataIndex: 'type',
        key: 'type',
        width: 100,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          switch (status) {
            case 0:
              return (
                <Tag color="volcano" key={status}>
                  Deactivated
                </Tag>
              );
            case 1:
              return (
                <Tag color="green" key={status}>
                  Activated
                </Tag>
              );

            default:
              break;
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          switch (record.status) {
            case 0:
              return (
                <Popconfirm
                  placement="top"
                  title="Are you sure to Activate Student"
                  onConfirm={() => this.handleStudent(record, 'activate')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">
                    Activate{' '}
                    {loading && record.stdId === selStudentId && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="sm"
                        color="#fff"
                        className="ml-2"
                      />
                    )}
                  </Button>
                </Popconfirm>
              );
            case 1:
              return (
                <Popconfirm
                  placement="top"
                  title="Are you sure to Deactivate Student"
                  onConfirm={() => this.handleStudent(record, 'deactivate')}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="ghost">
                    Deactivate{' '}
                    {loading && record.stdId === selStudentId && (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="sm"
                        color="#fff"
                        className="ml-2 to-pink"
                      />
                    )}
                  </Button>
                </Popconfirm>
              );

            default:
              break;
          }
        },
      },
    ];

    return (
      <div className="container">
        <div className="row mb-5">{/* Content Here */}</div>
        <div className="row mb-3">
          <div className="col-md-4">
            <Tooltip placement="right" title={<span>Add Student</span>}>
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
              title="Add Student"
              centered
              visible={this.state.modal1Visible}
              footer={null}
              onCancel={() => this.setState({ modal1Visible: false })}
            >
              <div className="container">
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">First Name</span>
                  </div>
                  <div>
                    <TextBox
                      name="stdFname"
                      error={errors.stdFname}
                      onChange={(e) => this.handleFname(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Last Name</span>
                  </div>
                  <div>
                    <TextBox
                      name="stdLname"
                      error={errors.stdLname}
                      onChange={(e) => this.handleLname(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Age</span>
                  </div>
                  <div>
                    <TextBox
                      name="age"
                      error={errors.age}
                      onChange={(e) => this.handleAge(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Phone Number</span>
                  </div>
                  <div>
                    <TextBox
                      name="MSISDN"
                      error={errors.MSISDN}
                      onChange={(e) => this.handlePhone(e)}
                    />
                  </div>
                </div>
                <div className="row txt-box-container">
                  <div>
                    <span className="input-label">Course</span>
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
                <div className="row txt-box-container mb-5">
                  <div>
                    <span className="input-label">User Type</span>
                  </div>
                  <div>
                    <Select
                      value={selectedType}
                      onChange={this.handleType}
                      options={userOptions}
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
            <span className="modal-title">Students </span>
            <span>({num})</span>
          </div>
          <div className="row">
            <Table
              columns={columns}
              dataSource={students}
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

const mapStateToProps = ({ students, levels: levelQuizes }) => ({
  students: Object.values(students).map((obj, index) => ({
    ...obj,
    key: index,
    rowNum: index + 1,
    recordIndex: index,
  })),
  num: Object.values(students).length,
  levelQuizes: Object.values(levelQuizes).map(({ level }) => ({
    value: level,
    label: level,
  })),
});

export default connect(mapStateToProps)(StudentsComponent);
