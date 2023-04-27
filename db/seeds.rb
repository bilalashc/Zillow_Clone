require "open-uri"

ApplicationRecord.transaction do 
# More users
  10.times do 
    User.create!({
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  20.times do
    Listing.create!(
      address: Faker::Address.street_address,
      street: Faker::Address.street_name,
      city: 'San Francisco',
      state: 'California',
      zip_code: Faker::Address.zip_code,
      market_status: ['For Sale', 'Off-Market'].sample,
      home_price: Faker::Number.between(from: 500000, to: 2000000),
      rent_estimate: Faker::Number.between(from: 1000, to: 5000),
      home_overview: Faker::Lorem.paragraphs.join('\n'),
      author: User.all.sample
    )
  end

  puts "Done!"
end

