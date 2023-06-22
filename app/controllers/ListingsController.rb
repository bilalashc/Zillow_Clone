# frozen_string_literal: true

class ListingsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :search]
  before_action :set_listing, only: [:show, :update, :destroy]

  def index
    @listings = Listing.with_attached_images.all
    @listings = @listings.map do |listing|
      images = listing.images.map { |image| url_for(image) }
      favorite = current_user&.favorites&.exists?(listing_id: listing.id)
      listing.as_json.merge(images: images, favorite: favorite)
    end
    render json: {listings: @listings, google_api_key: "AIzaSyBc5HVEqSJnOYU2bNY8CxUIAaaGDIp51Jk"}
  end

  def show
    render json: @listing
  end

  def create
    if(current_user)
      @listing = current_user.listings.new(listing_params)

      if @listing.save
        if params[:listing][:images].present? 
          params[:listing][:images].each do |image|
            @listing.images.attach(image)
          end
        end
        render json: @listing, status: :created
      else
        render json: @listing.errors, status: :unprocessable_entity
      end
    else
      render json: {message: "User Not Found"}, status: :unprocessable_entity
    end
  end

  def update
    @listing = Listing.find(params[:id])

    if @listing.update(listing_params)
      render json: @listing, status: :ok
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    @listing.favorites.destroy_all
    if @listing.destroy
      render json: @listing, status: :ok
    end

    head :no_content
  end

  def search
    @listings = Listing.where("address ILIKE ? OR city ILIKE ? OR zip_code ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")
    @listings = @listings.map do |listing|
      images = listing.images.map { |image| url_for(image) }
      listing.as_json.merge(images: images)
    end
    render json: @listings, status: :ok
    
  end

  def user_listings
    @listings = current_user.listings
    @listings = @listings.map do |listing|
      images = listing.images.map { |image| url_for(image) }
      listing.as_json.merge(images: images)
    end
    render json: @listings, status: :ok
  end

  private

  def set_listing
    @listing = Listing.find(params[:id])
  end

  def listing_params
    params.require(:listing).permit(:home_type, :address, :street, :city, :state, :zip_code, :bedrooms, :bathrooms, :listing_size, :home_price, :rent_estimate, :home_overview)
  end
end