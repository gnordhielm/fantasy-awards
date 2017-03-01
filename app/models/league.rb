class League < ApplicationRecord
  has_many :ballots
  has_many :league_commissioners, dependent: :destroy
  has_many :commissioners, through: :league_commissioners

  validates :league_name, presence: true, length: { maximum: 60 }
  validates :award_name, presence: true, length: { maximum: 610 }
end
