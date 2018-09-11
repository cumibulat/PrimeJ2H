/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { InputText } from 'primereact/components/inputtext/InputText';
import { Password } from 'primereact/components/password/Password';
import { Button } from 'primereact/components/button/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class FreeTrial extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Free Trial</title>
          <meta name="description" content="Description of Free Trial" />
        </Helmet>
        <div className="ui-g ui-fluid">
          <div className="ui-g-12 ui-md-3 ui-lg-4" />
          <div className="ui-g-12 ui-md-6 ui-lg-4">
            {/* Left Side */}
            <div className="card card-w-title">
              <h1>Start your free trial</h1>
              <h5>
                Please use your work email address so we can connect you with
                your team
              </h5>
              <div className="ui-g form-group">
                <div className="ui-g-12">
                  <InputText placeholder="name@company.com" />
                </div>
                <div className="ui-g-12  ui-g-nopad">
                  <div className="ui-g-8" />
                  <div className="ui-g-4">
                    <Button label="Start Free Trial" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui-g-12 ui-md-3 ui-lg-4" />
        </div>
      </div>
    );
  }
}

FreeTrial.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FreeTrial);
