import { PropTypes } from 'prop-types';
import cx from 'classnames';
import React from 'react';

export default function LoginForm({
  email,
  password,
  loading,
  onInputChange,
  onSubmit,
}) {
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form
      action="#"
      method="POST"
      onSubmit={submit}
    >
      <label htmlFor="email">
        Email
      </label>
      <input
        autoComplete="on"
        className="space-1"
        id="email"
        onChange={(e) => onInputChange('email', e.target.value)}
        placeholder="Email"
        type="text"
        value={email}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        autoComplete="off"
        className="space-2"
        id="password"
        onChange={(e) => onInputChange('password', e.target.value)}
        placeholder="Password"
        type="password"
        value={password}
      />

      <button
        className={cx('btn', { loading })}
        disabled={loading}
        onClick={submit}
      >
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};
