module RenderHelper
  def render_app(opts = {})
    data = opts.each_with_object({}) { |(k, v), obj| obj["data-#{k}"] = v }
    content_tag :div, nil, data.merge(id: opts[:id] || "app")
  end
end
