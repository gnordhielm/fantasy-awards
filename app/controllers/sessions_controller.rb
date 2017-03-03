class SessionsController < ApplicationController
  
  def new
    # simply renders the login page
  end

  def create
    # use given email to grab player from the database.
    # keep it case insensitive.
    player = Player.find_by(email: params[:login][:email].downcase)
    # the player must be in the db, and must pass has_secure_password's
    # authenticate method to make sure the password was right.
    if player && player.commissioner.authenticate(params[:login][:password])
      # password correct, start session
      session[:player_id] = player.id
      @player = Player.find(session[:player_id])
      redirect_to league_dashboard_path(@player.commissioner.leagues.first.league_path), notice: 'Logged in.'
    else
      # password incorrect, re-render page
      redirect_to request.referrer, notice: 'Incorrect email or password.'
    end
  end

  def destroy
    # end a session, remove player id from cookie
    session.delete(:player_id)
    @current_user = nil
    redirect_to root_path, notice: 'Logged out.'
  end

end
