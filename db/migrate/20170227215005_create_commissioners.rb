class CreateCommissioners < ActiveRecord::Migration[5.0]
  def change
    create_table :commissioners do |t|
      t.references :player, foreign_key: true
      t.string :password_digest
      t.boolean :designer

      t.timestamps
    end
  end
end
