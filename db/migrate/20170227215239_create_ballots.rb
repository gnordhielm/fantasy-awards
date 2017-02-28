class CreateBallots < ActiveRecord::Migration[5.0]
  def change
    create_table :ballots do |t|
      t.references :player, foreign_key: true
      t.references :league, foreign_key: true
      t.string :best_picture
      t.string :best_actress
      t.string :best_actor
      t.string :best_picture

      t.timestamps
    end
  end
end
