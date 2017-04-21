module AssetManagerHelper
  # For individual files
  def add_css_file(filename, options = {})
    content_for :stylesheets do
      stylesheet_link_tag filename, options
    end
  end

  # For a set of files
  def add_css_package(package, options = {})
    content_for :stylesheet do
      stylesheet_link_tag "packages/#{package.to_s}", options
    end
  end

  # For a set of files
  def add_js_app(filename)
    content_for :javascripts do
      javascript_include_tag "apps/#{filename}"
    end
  end
end
