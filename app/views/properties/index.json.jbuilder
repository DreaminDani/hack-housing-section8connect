json.array!(@properties) do |property|
  json.extract! property, :id, :name, :address, :city, :price, :long, :lat, :bedrooms, :housing_authority
end
