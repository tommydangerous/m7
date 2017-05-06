import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as customerActionCreators from '../../../../action_creators/customerActionCreators';
import * as employeeActionCreators from '../../../../action_creators/employeeActionCreators';
import * as inventoryitemActionCreators
  from '../../../../action_creators/inventoryitemActionCreators';
import * as timesheetActionCreators from '../../../../action_creators/timesheetActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import * as customerSelectors from '../../../../selectors/customerSelectors';
import * as employeeSelectors from '../../../../selectors/employeeSelectors';
import * as inventoryitemSelectors from '../../../../selectors/inventoryitemSelectors';
import * as timesheetSelectors from '../../../../selectors/timesheetSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import SimpleForm from '../../../../components/SimpleForm';
import SimpleFormWithStore from '../../../../components/SimpleFormWithStore';

import { CREATE_FORM_FIELDS } from '../utils/constants';

const FormWithStore = SimpleFormWithStore({
  actionCreators: timesheetActionCreators,
  selector: state => timesheetSelectors.rootSelector(state).timesheet,
});

const selectOptions = array => {
  const arr = array.map(obj => {
    return {
      text: obj.name,
      value: obj.id,
    };
  });
  return [{
    disabled: true,
    text: '',
    value: '',
  }].concat(arr);
};

const mapStateToProps = state => ({
  customers: customerSelectors.sortedObjects(state),
  employees: employeeSelectors.sortedObjects(state),
  errors: timesheetSelectors.rootSelector(state).errors,
  inventoryitems: inventoryitemSelectors.sortedObjects(state),
  timesheet: timesheetSelectors.rootSelector(state).timesheet,
  loading: timesheetSelectors.rootSelector(state).loading,
  vendors: vendorSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  customerActions: bindActionCreators(customerActionCreators, dispatch),
  employeeActions:bindActionCreators(employeeActionCreators, dispatch),
  inventoryitemActions: bindActionCreators(inventoryitemActionCreators, dispatch),
  timesheeetActions: bindActionCreators(timesheetActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class TimesheetForm extends React.Component {
  componentDidMount() {
    const {
      customerActions,
      customers,
      employeeActions,
      employees,
      inventoryitemActions,
      inventoryitems,
      vendorActions,
      vendors,
    } = this.props;

    [
      [customers, customerActions],
      [employees, employeeActions],
      [inventoryitems, inventoryitemActions],
      [vendors, vendorActions],
    ].forEach(arr => {
      if (arr[0].length === 0) {
        arr[1].index();
      }
    });
  }

  render() {
    const {
      customers,
      employees,
      errors,
      initialState,
      inventoryitems,
      loading,
      onClickCancel,
      timesheet,
      timesheeetActions,
      vendors,
    } = this.props;

    const fields = { ...CREATE_FORM_FIELDS };
    fields.customer_id.options = selectOptions(customers);
    fields.employee_id.options = selectOptions(employees);
    fields.inventory_item_id.options = selectOptions(inventoryitems);
    fields.vendor_id.options = selectOptions(vendors);

    if (timesheet) {
      return (
        <FormWithStore
          error={errors.update ? errors.update.message : null}
          fields={fields}
          header="Edit time"
          loading={loading.update}
          onClickCancel={onClickCancel}
          onSubmitForm={payload => {
            return timesheeetActions.update(timesheet.id, {
              ...timesheet,
              ...payload,
            });
          }}
          submitFormButtonText="Update"
        >
          <a
            className="link-reset"
            href="#"
            onClick={e => {
              e.preventDefault();
              timesheeetActions.deleteObject(timesheet.id);
              onClickCancel();
            }}
            title="Delete"
          >
            <i className="fa fa-trash-o color-red" aria-hidden="true" />
          </a>
        </FormWithStore>
      );
    }

    return (
      <SimpleForm
        error={errors.create ? errors.create.message : null}
        fields={fields}
        header="Add a new time"
        initialState={initialState}
        loading={loading.create}
        onClickCancel={onClickCancel}
        onSubmitForm={timesheeetActions.create}
      />
    );
  }
}

TimesheetForm.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.object),
  employees: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.shape({
    create: PropTypes.object,
    update: PropTypes.object,
  }).isRequired,
  inventoryitems: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.shape({
    create: PropTypes.bool,
    update: PropTypes.bool,
  }).isRequired,
  onClickCancel: PropTypes.func,
};

TimesheetForm.defaultProps = {
  customers: [],
  employees: [],
  inventoryitems: [],
  onClickCancel() {},
};

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetForm);
