class DesignersController < ApplicationController
  before_action :designer?

def dashboard
  @leagues = League.all
  @players = Player.all
  @new_player = Player.new

  @title = "Designer Dashboard"
end

def update
  @player = Player.find(params[:player_id])
  @player.update_attributes(params.require(:player).permit!)
  redirect_to designer_path
end

def destroy
  @player = Player.find(params[:player_id])
  @player.destroy
  redirect_to designer_path
end

def create
  @new_player = Player.new(params.require(:player).permit!)
  if @new_player.save
    redirect_to designer_path
  else
    redirect_to designer_path, notice: 'New player was not valid'
  end
end



private

def designer?
    redirect_to root_path, alert: 'You must be a designer to see that page.' unless current_user && @current_user.commissioner.designer
end

end
