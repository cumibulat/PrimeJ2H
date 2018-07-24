/**
 *
 * LatihanPage
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


import {
  makeSelectLatihanPage,
  makeSelectCarsList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  actGetCarsList,
} from './actions';

export class LatihanPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    console.log('check dl ya brow componentDidMount :: ');
    super();
    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
    console.log('check dl ya brow componentDidMount :: ');
    this.props.doGetCarsList();
  }

  render() {

    console.log('check dl ya brow :: ', this.props.carsList);
    // let paginatorLeft = <Button icon="fa-refresh"/>;
    // let paginatorRight = <Button icon="fa-cloud-upload"/>;
    return (
      <div>
        <Helmet>
          <title>LatihanPage</title>
          <meta name="description" content="Description of LatihanPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div className="content-section implementation">
          <DataTable
            value={this.props.carsList} paginator={true}
          // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
            rows={10} rowsPerPageOptions={[5, 10, 20]}
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

LatihanPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  latihanpage: makeSelectLatihanPage(),
  carsList: makeSelectCarsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    doGetCarsList: (e) => dispatch(actGetCarsList(e)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'latihanPage', reducer });
const withSaga = injectSaga({ key: 'latihanPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LatihanPage);
