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

// 20.00 
export class Users extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  componentDidMount() {
    this.props.doGetCarsList();
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
            // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
          >
            <Column field="vin" header="Vin" />
            <Column field="year" header="Year" />
            <Column field="brand" header="Brand" />
            <Column field="color" header="Color" />
          </DataTable>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
