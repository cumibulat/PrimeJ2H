/**
 *
 * Users
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  makeSelectCarsList,
} from './selectors';
import {
  actGetCarsList,
  actClearCarsListStatus,
} from './actions';

export class Users extends React.Component { // eslint-disable-line react/prefer-stateless-function


  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      loading: false,
    };

    this.onPage = this.onPage.bind(this);
  }

  componentDidMount() {
    const param = {
      page: 1,
      pageSize: 10,
      first: 0,
    };

    this.setState({
      loading: true,
      first: 0,
    });
    this.props.doGetCarsList(param);
  }

  componentDidUpdate() {
    if (this.props.carsList && this.props.carsList.status) {
      if (this.props.carsList.status >= 200 && this.props.carsList.status < 300 && this.state.loading) {
        this.setState({
          loading: false,
        });

        // harus clear status di dalam carslist
        this.props.doClearCarsListStatus();
        
      }
    }
  }

  onPage(event) {
    console.log('kepanggil ga si ??', event);


    const param = {
      page: event.page + 1,
      pageSize: 10,
    };

    this.setState({
      loading: true,
      first: event.first,
    });
    this.props.doGetCarsList(param);
  }

  render() {

    console.log('cek :: ', this.state.loading);

    let tableData = [];
    if (this.props.carsList && this.props.carsList.data) {
      tableData = this.props.carsList.data;
    }
    return (
      <div>
        <Helmet>
          <title>Users</title>
          <meta name="description" content="Description of Users" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div className="content-section implementation">
          <DataTable
            value={tableData}
            paginator
            first={this.state.first}
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            lazy
            totalRecords={35}
            onPage={this.onPage}
            loading={this.state.loading}
          >
            <Column field="vin" header="Vin" sortable filter/>
            <Column field="year" header="Year" sortable filter/>
            <Column field="brand" header="Brand" sortable filter/>
            <Column field="color" header="Color" sortable filter/>
          </DataTable>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  carsList: makeSelectCarsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetCarsList: (e) => dispatch(actGetCarsList(e)),
    doClearCarsListStatus: (e) => dispatch(actClearCarsListStatus(e)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Users);
