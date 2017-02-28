class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :screen_name
      t.string :first_name
      t.string :last_name
      t.string :email

      t.timestamps
    end
  end
end
