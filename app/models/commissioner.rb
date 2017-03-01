class Commissioner < ApplicationRecord
    after_initialize :init

  belongs_to :player

  has_many :league_commissioners, dependent: :destroy
  has_many :leagues, through: :league_commissioners

  has_secure_password
  # validates :password, presence: true, length: { minimum: 6 }


  def init
    self.designer  ||= false
  end

end
