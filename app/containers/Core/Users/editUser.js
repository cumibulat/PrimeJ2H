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
import { Button } from 'primereact/components/button/Button';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { InputText } from 'primereact/components/inputtext/InputText';

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

export class EditUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      loading: false,
      filters: {},
      multiSortMeta: [],
    };

    this.onPage = this.onPage.bind(this);
    this.onCarSelect = this.onCarSelect.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onFilter = this.onFilter.bind(this);
    // this.save = this.save.bind(this);
    // this.delete = this.delete.bind(this);
    // this.addNew = this.addNew.bind(this);
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
    this.setState({
      loading: true,
      first: event.first,
    });

    console.log('cek event :: ', event);
    const param = {
      page: event.page + 1,
      pageSize: 10,
    };

    this.props.doGetCarsList(param);
  }

  onSort(event){
    console.log('cek onSort dl ganss : ', event);

    let multiSortMeta = this.state.multiSortMeta;
    multiSortMeta.push({
      field: event.sortField,
      order: event.sortOrder,
    });
    this.setState({multiSortMeta: multiSortMeta});

    console.log('cek final hasil : ', this.state.multiSortMeta);
  }

  onFilter(event){
    console.log('cek onFilter dl ganss : ', event);
    this.setState({filters: event.filters});
  }

  onCarSelect(e) {
    this.newCar = false;
    this.setState({
      displayDialog: true,
      car: Object.assign({}, e.data),
    });
  }

  render() {

    let tableData = [];
    if (this.props.carsList && this.props.carsList.data) {
      tableData = this.props.carsList.data;
    }

    const header = <div className="ui-helper-clearfix" style={{ lineHeight: '1.87em' }}>CRUD for Cars </div>;

    const footer = (<div className="ui-helper-clearfix" style={{ width: '100%' }}>
      <Button style={{ float: 'left' }} icon="fa fa-plus" label="Add" onClick={this.addNew} />
    </div>);

    const dialogFooter = (<div className="ui-dialog-buttonpane ui-helper-clearfix">
      <Button icon="fa fa-close" label="Delete" onClick={this.delete} />
      <Button label="Save" icon="fa fa-check" onClick={this.save} />
    </div>);


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
            first={this.state.first}
            rows={10}
            paginator
            lazy
            totalRecords={35}
            header={header}
            footer={footer}
            selectionMode="single"
            selection={this.state.selectedCar}
            onSelectionChange={(e) => { this.setState({ selectedCar: e.data }); }}
            onRowSelect={this.onCarSelect}
            onPage={this.onPage}
            loading={this.state.loading}
            // onFilter={this.onFilter}
            onSort={this.onSort}
            // filters={this.state.filters}
            sortMode="multiple"
            multiSortMeta={this.state.multiSortMeta}
            // onFilter={(e) => this.setState({filters: e.filters})}
          >
            <Column field="vin" header="Vin" sortable/>
            <Column field="year" header="Year" sortable/>
            <Column field="brand" header="Brand" sortable/>
            <Column field="color" header="Color" sortable/>
          </DataTable>

          <Dialog visible={this.state.displayDialog} header="Car Details" modal footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
            {this.state.car && <div className="ui-grid ui-grid-responsive ui-fluid">
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="vin">Vin</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="vin" onChange={(e) => { this.updateProperty('vin', e.target.value); }} value={this.state.car.vin} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="year">Year</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="year" onChange={(e) => { this.updateProperty('year', e.target.value); }} value={this.state.car.year} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="brand">Brand</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="brand" onChange={(e) => { this.updateProperty('brand', e.target.value); }} value={this.state.car.brand} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="color">Color</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="color" onChange={(e) => { this.updateProperty('color', e.target.value); }} value={this.state.car.color} />
                </div>
              </div>
              </div>}
          </Dialog>
        </div>
      </div>
    );
  }
}

EditUsers.propTypes = {
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
)(EditUsers);
