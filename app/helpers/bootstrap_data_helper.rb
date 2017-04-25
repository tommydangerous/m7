module BootstrapDataHelper
  DEFAULT_PLACEMENT = :default

  def bootstrap_data(key, data, options = {})
    existing_data = bootstrap_data_for_placement(options[:placement])
    if existing_data[key].respond_to?(:merge!)
      existing_data[key].merge!(data)
    else
      existing_data[key] = data
    end
  end

  def bootstrap_data_for_placement(placement)
    placement ||= DEFAULT_PLACEMENT
    @_bootstrap_data ||= {}
    @_bootstrap_data[placement] ||= {}
    @_bootstrap_data[placement]
  end

  def embed_bootstrap_data(options = {})
    bootstrap_data_for_placement(options[:placement]).map do |key, data|
      serialized_data = html_escape(data.to_json)
      tag :meta, content: serialized_data, id: "_bootstrap-#{key.parameterize}"
    end.join("\n").html_safe
  end
end
