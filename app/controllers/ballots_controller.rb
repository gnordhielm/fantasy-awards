class BallotsController < ApplicationController
  
  def new
    if current_user
      @league = League.find_by(league_path: params[:league_path])
      @ballot = Ballot.new
    else
      @league = League.find_by(league_path: params[:league_path])
      @player = Player.new
      @player.build_ballot
    end
    @title = "New Ballot"
  end  

  def create
    @league = League.find_by(league_path: params[:league_path])
    if current_user
      @ballot = Ballot.new(ballot_params)

      @ballot.league_id = @league.id
      @ballot.player_id = current_user.id

      if @ballot.save
        redirect_to league_dashboard_path(@league.league_path)
      else
        flash[:alert] = "This form has not been filled out correctly..."
        redirect_to request.referrer
      end
    else
      @league = League.find_by(league_path: params[:league_path])
      @player = Player.new

      @player.first_name = player_ballot_params[:first_name]
      @player.last_name = player_ballot_params[:last_name]
      @player.screen_name = player_ballot_params[:screen_name]
      @player.email = player_ballot_params[:email]
      @player.email.downcase!

      if @player.save

        @ballot = Ballot.new
        @ballot.best_picture = player_ballot_params[:ballot_attributes][:best_picture]
        @ballot.best_actress = player_ballot_params[:ballot_attributes][:best_actress]
        @ballot.best_actor = player_ballot_params[:ballot_attributes][:best_actor]
        @ballot.league_id = @league.id
        @ballot.player_id = @player.id

        if @ballot.save
          redirect_to league_path(@league.league_path)
        else
          flash[:alert] = "Please check the validity of your email, and the length of your names."
          redirect_to request.referrer
        end
      else
        # If user fails model validation - probably a bad password or duplicate email:
        flash[:alert] = "Please check the validity of your email, and the length of your names."
        redirect_to request.referrer
      end
    end
  end

  def destroy
    @league = League.find_by(league_path: params[:league_path])
    @player = Ballot.find(params[:ballot_id]).player
    @player.destroy
    redirect_to league_dashboard_path(@league.league_path)
  end

  def show
    @league = League.find_by(league_path: params[:league_path])
    @ballot = Ballot.find(params[:ballot_id])
    @title = "View Ballot"
  end

private

  def ballot_params
     params.require(:ballot).permit(:best_picture, :best_actress, :best_actor)
  end

  def player_ballot_params
     params.require(:player).permit(:screen_name, :first_name, :last_name, :email,
        ballot_attributes: [:best_picture, :best_actress, :best_actor])
  end
end
