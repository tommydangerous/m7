import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DocumentTitle from 'react-document-title';
import React from 'react';

import * as expenseActionCreators from '../../../../action_creators/expenseActionCreators';
import * as modalActionCreators from '../../../../action_creators/modalActionCreators';

import * as expenseSelectors from '../../../../selectors/expenseSelectors';
import * as modalSelectors from '../../../../selectors/modalSelectors';

import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import Modal from '../../../../components/Modal';

const mapStateToProps = state => ({
  modalVisible: modalSelectors.rootSelector(state).visible,
  successes: expenseSelectors.rootSelector(state).successes,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators(expenseActionCreators, dispatch),
  modalActions: bindActionCreators(modalActionCreators, dispatch),
});

class ExpensesMainApp extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      successes: {
        create: c1,
        update: u1,
      },
    } = prevProps;
    const {
      successes: {
        create: c2,
        update: u2,
      },
    } = this.props;
    if (c2 > c1 || u2 > u1) {
      this.closeModal();
    }
  }

  closeModal() {
    const {
      expenseActions,
      modalActions,
    } = this.props;
    expenseActions.selfSelected(null);
    modalActions.hide();
  }

  render() {
    const {
      modalActions,
      modalVisible,
    } = this.props;

    return (
      <div className="page-container">
        <DocumentTitle title="Expenses" />

        <div className="space-bottom-lg space-top-lg">
          <a
            className="btn btn-primary pull-right space-bottom-sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              modalActions.show();
            }}
          >
            Add expense
          </a>

          <ExpensesTable onEdit={modalActions.show} />
        </div>

        <Modal onClose={this.closeModal} visible={modalVisible}>
          {modalVisible && (
            <ExpenseForm
              onClickCancel={this.closeModal}
            />
          )}
        </Modal>
      </div>
    );
  }
}

ExpensesMainApp.propTypes = {};

ExpensesMainApp.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesMainApp);
