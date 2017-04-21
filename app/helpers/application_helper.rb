module ApplicationHelper
  def body_class
    "#{params[:controller]} #{params[:controller]}-#{params[:action]}"
  end

  def mobile_meta_content
    "initial-scale=1.0, maximum-scale=1.0, user-scalable=0, width=320"
  end

  def user_background_image(user)
    "background-image: url(#{image_path "user-default.png"});"
  end
end
