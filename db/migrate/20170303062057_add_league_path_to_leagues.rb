class AddLeaguePathToLeagues < ActiveRecord::Migration[5.0]
  def change
    add_column :leagues, :league_path, :string
    League.all.each do |league|
      league.update_attributes! :league_path => league.league_name.parameterize
    end
  end
end
