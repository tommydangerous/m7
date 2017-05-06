import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
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

import SimpleResponsiveTable from '../../../../components/SimpleResponsiveTable';
import SimpleTable from '../../../../components/SimpleTable';

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

    const renderColumnsForRow = obj => {
      const customerName = (customersById[obj.customer_id] || {}).name;

      let name;
      if (obj.type === 'Employee') {
        name = (employeesById[obj.employee_id] || {}).name;
      } else {
        name = (vendorsById[obj.employee_id] || {}).name;
      }

      return [
        `${name} (${obj.type})`,
        customerName,
        obj.duration,
        obj.date,
        <div>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              timesheetActions.selfSelected(obj);
              onEdit();
            }}
          >
            Edit
          </a>
          {" / "}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              timesheetActions.deleteObject(obj.id);
            }}
          >
            Delete
          </a>
        </div>,
      ];
    };

    const renderTableRow = obj => {
      const customerName = (customersById[obj.customer_id] || {}).name;

      let name;
      if (obj.type === 'Employee') {
        name = (employeesById[obj.employee_id] || {}).name;
      } else {
        name = (vendorsById[obj.employee_id] || {}).name;
      }

      return (
        <tr key={obj.id}>
          <td>{`${name} (${obj.type})`}</td>
          <td>{customerName}</td>
          <td>{obj.duration}</td>
          <td>{obj.date}</td>
          <td>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                timesheetActions.selfSelected(obj);
                onEdit();
              }}
            >
              Edit
            </a>
            {" / "}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                timesheetActions.deleteObject(obj.id);
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
        <div className="clearfix">
          <h1 className="hide-sm">
            Timesheets
          </h1>
          {errors.index && errors.index.message && (
            <div className="background-red panel-body-small space-1 text-center text-contrast">
              {errors.index.message}
            </div>
          )}
        </div>
        <div className={cx({ loading: loading.delete || loading.index })}>
          <SimpleResponsiveTable
            headers={TABLE_HEADERS}
            objects={timesheets}
            renderColumnsForRow={renderColumnsForRow}
            widths={[4, 2, 2, 2, 2]}
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
