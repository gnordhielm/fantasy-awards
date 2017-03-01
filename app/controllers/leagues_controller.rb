class LeaguesController < ApplicationController

  def new
    @league = League.new

    @title = "Start your League"
  end

  def create
    @commissioner = Commissioner.find(params[:commissioner_id])
    @league = League.new(league_params)

    if @league.save
      # connect the commissioner to the league they've just created
      LeagueCommissioner.create({league_id: @league.id, commissioner_id: @commissioner.id})
      redirect_to league_dashboard_path(@league)
    else
      flash[:alert] = "Make sure your names aren't too long."
      redirect_to request.referrer
    end
  end

  def show
    @league = League.find(params[:league_id])
  end

  def dashboard
    @league = League.find(params[:league_id])
    @commissioner = Player.find(session[:player_id]).commissioner
  end


private
  # Never trust parameters from the scary internet, only allow the white list through.
  def league_params
     params.require(:league).permit(:league_name, :award_name)
  end

end
