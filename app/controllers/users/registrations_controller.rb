# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, options={})
    if resource.persisted?
      render json: {
        status: { code: 200, message: "Sign_Up successfully" ,
          data: resource}
      }, status: :ok
    else
      render json: {
        status: { message: "User not saved successfully", error: resource.errors.full_messages}
      }, status: unprocessable_entity
    end
  end
end
