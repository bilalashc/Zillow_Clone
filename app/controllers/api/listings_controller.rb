class Api::ListingsController < ApplicationController
    def index
        @listings = Listing.all
        render :index
    end

    def create
        @listing = Listing.new(listing_params)
        @listing.author_id = current_user.id
        if @listing.save
            render :show
        else
            render json: { errors: @listing.error.full_messages }, status: :unprocessable_entity 
        end
    end

    def edit
        @listing = Listing.find(params[:id])
    end 

    def show 
        @listing = Listing.find(params[:id])
        render :show
    end

    def update
        @listing = current_user.listing.find(params[:id])

        if @listing.update(listing_params)
            render :show
        else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @listing = Listing.find(params[:id])
        if @listing
            @listing.destroy
            render json: { message: 'Success: Listing Deleted' }

        else
            render json: { message: 'Error: This Listing Does Not Exist' }
        end
    end 


    private

    def listing_params
        params.require(:listing).permit(:address,:street,:city,:state,:zip_code, :bedrooms, :bathrooms, listing_size, :market_status,:home_price,:rent_estimate,:home_overview)
    end

end
