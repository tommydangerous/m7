class ApplicationController < ActionController::Base
  include BootstrapDataHelper

  protect_from_forgery with: :exception

  before_action :bootstrap_api_data

  private

  def bootstrap_api_data
    bootstrap_data("api", { key: ENV["API_KEY"], signature: ENV["API_SIGNATURE"] })
  end
end
