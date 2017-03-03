class CommissionersController < ApplicationController

  def show
    @commissioner = Commissioner.find(params[:commissioner_id])

    @title = @commissioner.player.screen_name
  end
  
  def new
    @player = Player.new
    @player.build_commissioner

    @title = "Sign Up"
  end

  def create
    @player = Player.new

    @player.first_name = player_params[:first_name]
    @player.last_name = player_params[:last_name]
    @player.screen_name = player_params[:screen_name]
    @player.email = player_params[:email]
    @player.email.downcase!

    if @player.save

      @commissioner = Commissioner.new
      @commissioner.password = player_params[:commissioner_attributes][:password]
      @commissioner.password_confirmation = player_params[:commissioner_attributes][:password_confirmation]
      @commissioner.player_id = @player.id

      session[:player_id] = @player.id

      if @commissioner.save
        redirect_to new_league_path
      else
        flash[:alert] = "Have another go at that email and password for me."
        redirect_to request.referrer
      end
    else
      # If user fails model validation - probably a bad password or duplicate email:
      flash[:alert] = "Have another go at that email and password for me."
      redirect_to request.referrer
    end
  end

private

  # Never trust parameters from the scary internet, only allow the white list through.
  def player_params
     params.require(:player).permit(:screen_name, :first_name, :last_name, :email, 
      commissioner_attributes: [:password, :password_confirmation])
  end

end
