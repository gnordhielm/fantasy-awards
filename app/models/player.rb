class Player < ApplicationRecord

  has_one :ballot, dependent: :destroy
  has_one :commissioner, dependent: :destroy
  accepts_nested_attributes_for :commissioner, allow_destroy: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :screen_name, presence: true, length: { maximum: 11 },
                    uniqueness: { case_sensitive: false }
  validates :last_name, presence: true
  validates :first_name, presence: true
end
