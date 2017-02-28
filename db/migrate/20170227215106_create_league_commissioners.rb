class CreateLeagueCommissioners < ActiveRecord::Migration[5.0]
  def change
    create_table :league_commissioners do |t|
      t.references :commissioner, foreign_key: true
      t.references :league, foreign_key: true

      t.timestamps
    end
  end
end
