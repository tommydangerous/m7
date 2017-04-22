import React, { PropTypes } from 'react';

const defaultProps = {
  date: '',
  dateFormat: 'dd-mm-yy',
  inputOnChange: null,
  inputRef: 'input',
  max_date: null,
  min_date: new Date(),
  name: 'date',
};

const propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func,
  inputRef: PropTypes.string.isRequired,
  max_date: PropTypes.instanceOf(Date),
  min_date: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
};

export default class DatepickerInput extends React.Component {
  constructor(props) {
    super(props);
    let defaultDate = props.date || '';
    this.state = {
      date: defaultDate,
      formattedDate: this._formatDate(defaultDate),
    };
  }

  componentDidMount() {
    var _this = this;
    $(this.refs[this.props.inputRef]).datepicker({
      dateFormat: _this.props.dateFormat,
      maxDate: _this.props.max_date,
      minDate: _this.props.min_date,
      onSelect: function(date, datepicker) {
        _this._dateSelected(date);
        $(this).val(_this.state.formattedDate);
      }
    });
  }

  render() {
    return (
      <div key={this.props.inputRef + "1"}>
        <input
          autoComplete="off"
          className="datepicker-input"
          defaultValue={this.state.formattedDate}
          key={this.props.inputRef + "2"}
          placeholder={this.props.placeholder}
          ref={this.props.inputRef}
        />
        <input
          name={this.props.name}
          key={this.props.inputRef + "3"}
          readOnly
          type="hidden"
          value={this.state.date}
        />
      </div>
    );
  }

  _dateSelected(date) {
    this.setState({
      date: date,
      formattedDate: this._formatDate(date)
    });

    if (this.props.inputOnChange) {
      this.props.inputOnChange(date);
    }
  }

  _formatDate(date) {
    var values = date.split('-');
    if (values.length == 3) {
      return [values[1], values[0], values[2]].join('-');
    } else {
      return '';
    }
  }
};

DatepickerInput.defaultProps = defaultProps;
DatepickerInput.propTypes = propTypes;
