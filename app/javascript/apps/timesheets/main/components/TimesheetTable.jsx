import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

import { TABLE_HEADERS } from '../utils/constants';

import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';

import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';

import SimpleTable from '../../../../components/SimpleTable';

import TimesheetShape from '../../../../shapes/TimesheetShape';

const mapStateToProps = state => ({
  loading: timesheetSelectors.rootSelector(state).loading,
  timesheets: timesheetSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  timesheetActions: bindActionCreators(timesheetActionCreators, dispatch),
});

class TimesheetTable extends React.Component {
  componentDidMount() {
    const { timesheetActions } = this.props;
    timesheetActions.index();
  }

  render() {
    const {
      loading,
      onEdit,
      timesheet,
      timesheetActions,
      timesheets,
      timesheetsById
    } = this.props;

    const renderTableRow = timesheet => {
      return (
        <tr key={timesheet.id}>
          <td>{timesheet.employee_id}</td>
          <td>{timesheet.customer_id}</td>
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
      <div className={cx({ loading: loading.index })}>
        <SimpleTable
          objects={timesheets}
          renderTableRow={renderTableRow}
          tableHeaders={TABLE_HEADERS}
        />
      </div>
    );
  }
}

TimesheetTable.propTypes = {
  loading: PropTypes.shape({
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
