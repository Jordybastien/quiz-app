import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

class AllQuizesComponent extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    bookings: this.props.bookings,
    selectedOption: null,
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
      const { service } = this.props;
      const title = `Bookings of the ${service.title} on ${moment(
        service.serviceDate
      )
        .format('LLLL')
        .substr(0, moment(service.serviceDate).format('LLLL').length - 9)}`;
      const headers = [['#', 'Name', 'Address', 'Phone Number', 'Age']];

      const data = this.state.bookings.map((elt) => [
        elt.rowNum,
        elt.fullNames,
        elt.address,
        elt.MSISDN,
        elt.age,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push(['\r\n', '#', 'Name', 'Address', 'Phone Number', 'Age']);

      this.state.bookings.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.fullNames,
          elt.address,
          elt.MSISDN,
          elt.age,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { bookings } = this.state;
      this.setState({
        bookings: bookings.filter(
          (el) =>
            el.fullNames.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.MSISDN.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ bookings: this.props.bookings });
    }
  };

  render() {
    const { bookings, selectedOption } = this.state;

    const { students, num } = this.props;

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
    ];

    return (
      <div className="container">
        <div className="row mb-5">{/* Content Here */}</div>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Search by name or phone number"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-md-6 select-container">
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

const mapStateToProps = ({ students }) => ({
  students,
  bookings: students
    .map((obj, index) => ({
      ...obj,
      key: index,
      rowNum: index + 1,
    }))
    .reverse(),
  num: students.length,
});

export default connect(mapStateToProps)(AllQuizesComponent);
