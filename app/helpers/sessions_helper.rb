module SessionsHelper
  def current_session
    session_api[:session]
  end

  def current_signature
    session_api[:signature]
  end

  def current_user
    session_api[:user]
  end

  def logged_in?
    [current_user, current_signature, current_user].all? { |i| i.present? }
  end

  private

  def session_api
    # return session[:api] || {}
    # return {}
    session[:api] || {
      session: {
        session_name: 12345,
        session_id: 54321,
      },
      signature: "blah",
      user: {
        email: "vader@empire.com",
        employee_id: 321,
        first_name: "Vader",
        id: 123,
        last_name: "Cloud",
      },
    }
  end
end
