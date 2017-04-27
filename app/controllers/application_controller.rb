class ApplicationController < ActionController::Base
  include Sessionable

  include BootstrapDataHelper
  include RenderHelper
  include SessionsHelper

  protect_from_forgery with: :null_session

  before_action :bootstrap_api_data
  before_action :require_login

  private

  def bootstrap_api_data
    data = { key: ENV["API_KEY"] }
    if logged_in?
      data = data.merge(session: current_session, signature: current_signature, user: current_user)
    end
    bootstrap_data("api", data)
  end
end
