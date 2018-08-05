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
    };
    this.props.doGetCarsList(param);
  }

  onPage(event) {
    this.setState({
        loading: true
    });

    console.log('cek event :: ', event)

    // //imitate delay of a backend call
    // setTimeout(() => {
    //   const startIndex = event.first;
    //   const endIndex = event.first + this.state.rows;


      const param = {
        page: event.page + 1,
        pageSize: 10,
      };

      this.props.doGetCarsList(param);

    //   this.setState({
    //       first: startIndex,
    //       cars: this.datasource.slice(startIndex, endIndex),
    //       loading: false
    //   });
    // }, 250);
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>Users</title>
          <meta name="description" content="Description of Users" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div className="content-section implementation">
          <DataTable
            value={this.props.carsList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            lazy
            totalRecords={35}
            onPage={this.onPage}
            loading={this.state.loading}
          >
            <Column field="vin" header="Vin" sortable />
            <Column field="year" header="Year" sortable />
            <Column field="brand" header="Brand" sortable />
            <Column field="color" header="Color" sortable />
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
