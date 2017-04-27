class SessionsController < ApplicationController
  API_PATH = "/api/login".freeze

  skip_before_action :require_login, only: :login

  def login
    if request.method == "POST"
      respond_to do |format|
        save_session
        format.json do
          # render json: { hey: HTTParty.post(endpoint(session[:api][:signature])).body.to_s }
          render json: session[:api]
        end
      end
    else
      @data = data_with_redirect_url
      respond_to :html
    end
  end

  def logout
    session.delete(:api)
    redirect_to :login
  end

  private

  def api_params(opts = {})
    {
      api_key: ENV.fetch("API_KEY"),
      email: params[:email],
      password: params[:password],
    }.merge(opts).sort_by { |k, _| k }.map { |k, v| "#{k}=#{v}" }.join("&")
  end

  def create_signature
    Digest::SHA2.new(512).hexdigest("#{ENV.fetch("API_PRIVATE_KEY")}.#{API_PATH}?#{api_params}")
  end

  def data_with_redirect_url
    if params.key?(:redirect_params) &&
       params[:redirect_params].key?(:action) &&
       params[:redirect_params].key?(:controller)

      {
        redirect_url: url_for(
          action: params[:redirect_params][:action],
          controller: params[:redirect_params][:controller],
        ),
      }
    else
      {}
    end
  end

  def endpoint(signature)
    "#{ENV.fetch("API_BASE_PATH")}#{api_params(signature: signature)}"
  end

  def mock_data
    {
      logininfo: {
        session: {
          session_name: 12345,
          session_id: 54321,
        },
        AccountUser: {
          email: "vader@empire.com",
          employee_id: 321,
          first_name: "Vader",
          id: 123,
          last_name: "Cloud",
        },
      },
    }
  end

  def save_session
    session[:api] = {
      session: mock_data[:logininfo][:session],
      signature: create_signature,
      user: mock_data[:logininfo][:AccountUser],
    }
  end
end
