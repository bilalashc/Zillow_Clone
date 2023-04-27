require "open-uri"

ApplicationRecord.transaction do 

User.destroy_all   
Listing.destroy_all

ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')
User.create!( 
    email: 'bilal@gmail.com', 
    password: 'ashfaque'
)

#More Users
  10.times do 
    User.create!({
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  30.times do
    Listing.create!(
      address: Faker::Address.street_address,
      street: Faker::Address.street_name,
      city: 'San Francisco',
      state: 'California',
      zip_code: Faker::Address.zip_code,
      market_status: ['For Sale', 'Off-Market'].sample,
      home_price: Faker::Number.between(from: 1000000, to: 5000000),
      rent_estimate: Faker::Number.between(from: 10000, to: 50000),
      home_overview: Faker::Lorem.paragraphs.join('\n'),
      bedrooms: Faker::Number.between(from: 1, to: 6),
      bathrooms: Faker::Number.between(from: 1, to: 6),
      listing_size: Faker::Number.between(from: 1000, to: 10000),
      author: User.all.sample
    )
  end

  puts "Done!"
end

