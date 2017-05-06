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

const selectOptionsForEmployeesAndVendors = opts => {
  const {
    employees,
    vendors,
  } = opts;
  const arr1 = employees.map(obj => {
    return {
      text: obj.name,
      type: 'Employee',
      value: obj.id,
    };
  });
  const arr2 = vendors.map(obj => {
    return {
      text: obj.name,
      type: 'Vendor',
      value: obj.id,
    };
  });
  return [{
    disabled: true,
    text: '',
    value: '',
  }].concat(arr1).concat(arr2);
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
  constructor(props) {
    super(props);

    this.state = {
      employeeOrVendorType: null,
    };
  }

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
    const {
      employeeOrVendorType,
    } = this.state;

    const fields = { ...CREATE_FORM_FIELDS };
    fields.customer_id.options = selectOptions(customers);
    fields.inventory_item_id.options = selectOptions(inventoryitems);

    if (timesheet) {
      const label = timesheet.type;
      const options = label === 'Employee' ? selectOptions(employees) : selectOptions(vendors);
      return (
        <FormWithStore
          error={errors.update ? errors.update.message : null}
          fields={{
            ...fields,
            employee_id: {
              ...fields.employee_id,
              label,
              options,
            },
          }}
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
        fields={{
          ...fields,
          employee_id: {
            ...fields.employee_id,
            onChangeParser: e => {
              const type = e.target.options[e.target.selectedIndex].attributes.type.value;
              this.setState({ employeeOrVendorType: type });
              return e;
            },
            options: selectOptionsForEmployeesAndVendors({
              employees,
              vendors,
            }),
          },
        }}
        header="Add a new time"
        initialState={{ ...initialState, type: employeeOrVendorType }}
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
