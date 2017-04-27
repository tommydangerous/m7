module Sessionable
  extend ActiveSupport::Concern

  include SessionsHelper

  def redirect_back_or(default = root_path)
    if params[:redirect_params].present?
      redirect_to(params[:redirect_params].to_hash)
    else
      redirect_to(default)
    end
  end

  def require_login
    if !logged_in?
      redirect_params =
        params.except(%i(button redirect_params)).each_with_object({}) do |(k, v), obj|
          obj["redirect_params[#{k}]"] = v
        end
      redirect_to({
        action: :login,
        controller: :sessions,
      }.merge(redirect_params))
    end
  end

  def require_logout
    redirect_to("/expenses") if logged_in?
  end
end
