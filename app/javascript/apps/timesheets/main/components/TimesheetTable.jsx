import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as employeeActionCreators from '../../../../action_creators/employeeActionCreators';
import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as employeeSelectors from '../../../../selectors/employeeSelectors';
import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';

import SimpleTable from '../../../../components/SimpleTable';

import TimesheetShape from '../../../../shapes/TimesheetShape';

const mapStateToProps = state => ({
  errors: timesheetSelectors.rootSelector(state).errors,
  loading: timesheetSelectors.rootSelector(state).loading,
  customersById: customerSelectors.rootSelector(state).customersById,
  employeesById: employeeSelectors.rootSelector(state).employeesById,
  timesheets: timesheetSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  employeeActions: bindActionCreators(employeeActionCreators, dispatch),
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

class TimesheetTable extends React.Component {
  componentDidMount() {
    const {
      customerActions,
      employeeActions,
      timesheetActions,
    } = this.props;
    customerActions.index();
    employeeActions.index();
    timesheetActions.index();
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
      timesheetsById
    } = this.props;

    const renderTableRow = timesheet => {
      const customerName = (customersById[timesheet.customer_id] || {}).name;
      const employeeName = (employeesById[timesheet.employee_id] || {}).name;

      return (
        <tr key={timesheet.id}>
          <td>{employeeName}</td>
          <td>{customerName}</td>
          <td>{timesheet.start_time}</td>
          <td>{timesheet.end_time}</td>
          <td>{timesheet.hours_off_duty}</td>
          <td>{timesheet.duration}</td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                timesheetActions.selfSelected(timesheet);
                onEdit();
              }}
            >
              Edit
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                timesheetActions.deleteObject(timesheet.id);
              }}
            >
              Delete
            </a>
          </td>
        </tr>
      );
    };

    return (
      <div>
        <h1>
          Timesheets
        </h1>
        {errors.index && errors.index.message && (
          <div className="background-red panel-body-small space-1 text-center text-contrast">
            {errors.index.message}
          </div>
        )}
        <div className={cx({ loading: loading.delete || loading.index })}>
          <SimpleTable
            objects={timesheets}
            renderTableRow={renderTableRow}
            tableHeaders={TABLE_HEADERS}
          />
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
