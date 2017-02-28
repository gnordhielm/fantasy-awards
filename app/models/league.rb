class League < ApplicationRecord
  has_many :ballots
  has_many :league_commissioners
  has_many :commissioners, through: :league_commissioners
end
