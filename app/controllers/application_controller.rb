class ApplicationController < ActionController::Base
  include BootstrapDataHelper

  protect_from_forgery with: :null_session

  before_action :bootstrap_api_data

  private

  def bootstrap_api_data
    bootstrap_data("api", { key: ENV["API_KEY"], private_key: ENV['API_PRIVATE_KEY'] })
  end
end
