class Commissioner < ApplicationRecord
  belongs_to :player
  has_many :league_commissioners
  has_many :leagues, through: :league_commissioners
end
