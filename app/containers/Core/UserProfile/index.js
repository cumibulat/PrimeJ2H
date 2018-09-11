/**
 *
 * UserProfile
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

import { InputText } from 'primereact/components/inputtext/InputText';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

import makeSelectUserProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
      dropdownDepartment: null,
      departments: [
        { label: 'Select Department', value: null },
        { label: 'Sales', value: 'Sales' },
        { label: 'IT', value: 'IT' },
        { label: 'Operation', value: 'Operation' },
      ],
    };
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>UserProfile</title>
          <meta name="description" content="Description of UserProfile" />
        </Helmet>
        <div className="ui-g">
          <div className="ui-g-12">
            <div className="card card-w-title">
              <h1>
                <FormattedMessage {...messages.header} />
              </h1>
              <div className="ui-g form-group">
                <div className="ui-g-12 ui-md-2">
                  <label htmlFor="input">Name</label>
                </div>
                <div className="ui-g-12 ui-md-4">
                  <InputText id="input" />
                </div>
                <div className="ui-g-12 ui-md-6" />
                <div className="ui-g-12 ui-md-2">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="ui-g-12 ui-md-4">
                  <InputText id="email" placeholder="name@company.com" />
                </div>
                <div className="ui-g-12 ui-md-6" />
                <div className="ui-g-12 ui-md-2">
                  <label htmlFor="email">Department</label>
                </div>
                <div className="ui-g-12 ui-md-4">
                  <Dropdown
                    options={this.state.departments}
                    value={this.state.dropdownDepartment}
                    onChange={event =>
                      this.setState({ dropdownDepartment: event.value })
                    }
                    autoWidth={false}
                  />
                </div>
                <div className="ui-g-12 ui-md-6" />
                <div className="ui-g-12 ui-md-2">
                  <label htmlFor="email">Role</label>
                </div>
                <div className="ui-g-12 ui-md-4">
                  <InputText id="email" placeholder="name@company.com" />
                </div>
                <div className="ui-g-12 ui-md-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userprofile: makeSelectUserProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfile', reducer });
const withSaga = injectSaga({ key: 'userProfile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserProfile);
