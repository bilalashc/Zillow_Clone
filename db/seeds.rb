# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

RequestTour.destroy_all
Favorite.destroy_all
Listing.destroy_all
User.destroy_all   

ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('listings')

user = User.create!( 
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

  12.times do
    listing = Listing.create!(
      address: Faker::Address.street_address,
      street: Faker::Address.street_name,
      city: 'San Francisco',
      state: 'California',
      zip_code: Faker::Address.zip_code,
      home_type: ['For Sale', 'Off-Market'].sample,
      home_price: Faker::Number.between(from: 1000000, to: 5000000),
      rent_estimate: Faker::Number.between(from: 10000, to: 50000),
      home_overview: Faker::Lorem.paragraphs.join('\n'),
      bedrooms: Faker::Number.between(from: 1, to: 6),
      bathrooms: Faker::Number.between(from: 1, to: 6),
      listing_size: Faker::Number.between(from: 1000, to: 10000),
      user_id: user.id
    )
    Favorite.create(user_id: user.id, listing_id: listing.id)
  end



  Listing.all.each_with_index do |listing, index|

    listing.images.attach(
      io: URI.open("https://zillion-clone-prod.s3.us-west-1.amazonaws.com/listing%23#{index+1}.jpg"),
      filename: "listing##{index + 1}.jpg"
    )

    (1..3).each do |idx|
      listing.images.attach(
        io: URI.open("https://zillion-clone-prod.s3.us-west-1.amazonaws.com/listing%23#{index + 1}-img%23#{idx}.jpg"),
        filename: "listing##{index + 1}-img##{idx}.jpg"
      )
    end
  end 

  puts "Seeding Completed!"  



