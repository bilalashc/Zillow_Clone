class Listing < ApplicationRecord
    validates :address, presence: true
    validates :street, presence: true
    validates :city, presence: true
    validates :state, presence: true
    validates :zip_code, presence: true
    validates :market_status, presence: true
    validates :home_price, presence: true
    validates :rent_estimate, presence: true
    validates :home_overview, presence: true
    validates :bedrooms, presence: true
    validates :bathrooms, presence: true
    validates :listing_size, presence: true 

    belongs_to :author, class_name: 'User'

    has_many_attached :photos
end
