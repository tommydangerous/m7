import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as employeeActionCreators from '../../../../action_creators/employeeActionCreators';
import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as employeeSelectors from '../../../../selectors/employeeSelectors';
import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import TimesheetShape from '../../../../shapes/TimesheetShape';

const mapStateToProps = state => ({
  errors: timesheetSelectors.rootSelector(state).errors,
  loading: timesheetSelectors.rootSelector(state).loading,
  customersById: customerSelectors.rootSelector(state).customersById,
  employeesById: employeeSelectors.rootSelector(state).employeesById,
  timesheets: timesheetSelectors.sortedObjects(state),
  vendorsById: vendorSelectors.rootSelector(state).vendorsById,
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  employeeActions: bindActionCreators(employeeActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class TimesheetTable extends React.Component {
  componentDidMount() {
    const {
      customerActions,
      employeeActions,
      timesheetActions,
      vendorActions,
    } = this.props;

    customerActions.index();
    employeeActions.index();
    timesheetActions.index({
      employee_id: 'All',
    });
    vendorActions.index();
  }

  render() {
    const {
      customersById,
      employeesById,
      errors,
      loading,
      onEdit,
      timesheet,
      timesheetActions,
      timesheets,
      timesheetsById,
      vendorsById,
    } = this.props;

    const renderRow = obj => {
      let name;
      if (obj.type === 'Employee') {
        name = (employeesById[obj.employee_id] || {}).name;
      } else {
        name = (vendorsById[obj.employee_id] || {}).name;
      }
      const customerName = (customersById[obj.customer_id] || {}).name;
      const date = moment(obj.date);
      const hours = Math.floor(obj.duration);
      const minutes = Math.floor((obj.duration - hours) * 60);
      const durationStrings = [];

      if (hours >= 1) {
        durationStrings.push(`${hours} HR`);
      }
      if (hours === 0 || minutes >= 1) {
        durationStrings.push(`${minutes} MIN`);
      }

      return (
        <div className="row space-1" key={obj.id}>
          <div className="col-sm-12">
            <div
              className="panel panel-body link-hover"
              onClick={() => {
                onEdit();
                timesheetActions.selfSelected(obj);
              }}
            >
              <div className="row">
                <div className="col-sm-8">
                  <b className="text-muted text-tiny text-uppercase">
                    {obj.type}
                  </b>
                  <h5>
                    {name}
                  </h5>
                </div>

                <div className="col-sm-4">
                  <div className="pull-right text-muted text-center">
                    <b className="text-tiny text-uppercase">
                      {date.format('MMMM')}
                    </b>
                    <p>
                      {date.format('D')}
                    </p>
                  </div>
                </div>
              </div>


              <div className="row space-top-2">
                <div className="col-md-8 col-sm-12">
                  {obj.description && obj.description}
                  {!obj.description && (
                    <i className="text-muted">
                      No description
                    </i>
                  )}
                </div>
                <div className="col-md-4 col-sm-12 text-muted text-right-md text-tiny">
                  {durationStrings.join(' ')}, {customerName}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="clearfix">
          <h2 className="hide-sm">
            Timesheets
          </h2>
          <h3 className="show-sm">
            Timesheets
          </h3>
          {errors.index && errors.index.message && (
            <div className="background-red panel-body-small space-1 text-center text-contrast">
              {errors.index.message}
            </div>
          )}
        </div>
        <div className={cx({ loading: loading.delete || loading.index })}>
          {timesheets.map(obj => renderRow(obj))}
        </div>
      </div>
    );
  }
}

TimesheetTable.propTypes = {
  errors: PropTypes.shape({
    delete: PropTypes.object,
    index: PropTypes.object,
  }).isRequired,
  loading: PropTypes.shape({
    delete: PropTypes.bool,
    index: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func,
  timesheets: PropTypes.arrayOf(TimesheetShape),
};

TimesheetTable.defaultProps = {
  onEdit() {},
  timesheets: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetTable);
