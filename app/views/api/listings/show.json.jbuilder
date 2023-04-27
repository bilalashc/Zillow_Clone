json.listings do |listing|
    json.extract! @listing, :address, :street, :city, :state, :zip_code, :market_status, :bedrooms,
        :bathrooms, :listing_size, :home_price, :rent_estimate, :home_overview
    end
end 