class LeagueCommissioner < ApplicationRecord
  belongs_to :commissioner
  belongs_to :league
end
