class Player < ApplicationRecord
  has_one :ballot
  has_one :commissioner
end
