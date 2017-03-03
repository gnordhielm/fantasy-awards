class LeaguesController < ApplicationController
  before_action :logged_in?

  def new
    @league = League.new

    @title = "Start a League"
  end

  def create
    @commissioner = Player.find(session[:player_id]).commissioner
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
    @ballots = Ballot.where(league_id: params[:league_id])

    @title = @league.league_name
  end

  def dashboard
    if current_user
      @league = League.find(params[:league_id])
      @commissioner = Player.find(session[:player_id]).commissioner
    else
      flash[:alert] = "You must be logged in to see that page."
      redirect_to root_path
    end
    @title = "Dashboard"
  end


private
  # Never trust parameters from the scary internet, only allow the white list through.
  def league_params
     params.require(:league).permit(:league_name, :award_name)
  end

  def logged_in?
    redirect_to root_path, alert: 'You must be logged in to see that page.' unless current_user
  end

end
