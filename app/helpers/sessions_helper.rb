module SessionsHelper

  def current_user
    @current_user ||= Player.find(session[:player_id]) if session[:player_id]
  end

end
