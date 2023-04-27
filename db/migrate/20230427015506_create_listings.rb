class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :address, null: false 
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
      t.string :market_status, null: false
      t.integer :bedrooms, null: false
      t.integer :bathrooms, null: false
      t.integer :listing_size, null: false
      t.decimal :home_price, null: false
      t.decimal :rent_estimate, null: false
      t.text :home_overview, null: false

      t.timestamps
    end
    add_index :listings, :address
    add_index :listings, :street
    add_index :listings, :city 
    add_index :listings, :state
    add_index :listings, :zip_code
    add_index :listings, :market_status
    add_index :listings, :home_price
    add_index :listings, :rent_estimate
    add_reference :listings, :author, null: false, foreign_key: {to_table: :users}

  end
end
