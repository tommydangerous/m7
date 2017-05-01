import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';
import * as vendorActionCreators from '../../../../action_creators/vendorActionCreators';

import SimpleActionGenerator from '../../../../actions/SimpleActionGenerator';

import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as modalSelectors from '../../../../selectors/modalSelectors';
import * as vendorSelectors from '../../../../selectors/vendorSelectors';

import { OFFLINE_MODE } from '../../../../utils/constants';

import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import Modal from '../../../../components/Modal';


import ExpenseShape from '../../../../shapes/ExpenseShape';

const mapStateToProps = state => ({
  errors: expenseSelectors.rootSelector(state).errors,
  expenses: expenseSelectors.sortedObjects(state),
  loading: expenseSelectors.rootSelector(state).loading,
  modalVisible: modalSelectors.rootSelector(state).visible,
  vendors: vendorSelectors.sortedObjects(state),
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
  vendorActions:bindActionCreators(vendorActionCreators, dispatch),
});

class ExpensesMainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    if (!OFFLINE_MODE) {
      const { expenseActions } = this.props;
      expenseActions.index({
        search_start_date: '2017-04-01',
        search_end_date: '2017-05-01',
      });
    }
  }

  render() {
    const {
      errors,
      expenseActions,
      expenses,
      loading,
      modalActions,
      modalVisible,
      vendorActions,
      vendors,
    } = this.props;

    return (
      <div className="page-container">
        <div className="row space-bottom-lg space-top-lg">
          <div className="col-sm-12">
            <a
              className="btn btn-primary pull-right"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                vendorActions.index(),
                modalActions.show();
              }}
            >
              Add expense
            </a>
            <h1>
              Expenses
            </h1>
            {errors.index && (
              <div className="background-red panel-body-small space-1 text-center text-contrast">
                {errors.index.message}
              </div>
            )}
            <ExpensesTable expenses={expenses} loading={loading.index} />
          </div>
        </div>

        <Modal onClose={modalActions.hide} visible={modalVisible}>
          <ExpenseForm
            error={errors.create ? errors.create.message : null}
            loading={loading.create}
            onClickCancel={modalActions.hide}
            onSubmitForm={(payload) => {
              return expenseActions.create({ 'TimeEntry': payload })
                .then(response => {
                  if (!error) {
                    modalActions.hide();
                  }
                });
            }}
            vendors={vendors}
          />
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {
  error: PropTypes.object,
  expenses: PropTypes.arrayOf(ExpenseShape),
  loading: PropTypes.object,
};

ExpensesMainApp.defaultProps = {
  error: null,
  expenses: [],
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
