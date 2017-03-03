class League < ApplicationRecord
  after_save :create_path

  has_many :ballots, dependent: :destroy
  has_many :league_commissioners, dependent: :destroy
  has_many :commissioners, through: :league_commissioners

  validates :league_name, presence: true, length: { maximum: 60 },
                    uniqueness: { case_sensitive: false }
  validate  :league_name_unique_after_parameterize
  validates :award_name, presence: true, length: { maximum: 610 }

  # makes sure the paramaterized league name does not match any existig league paths.
  def league_name_unique_after_parameterize
    @this_path = self.league_name.parameterize
    if League.exists?(:league_path => @this_path)
      errors.add( :league_name, 'Another league already has that name.')
    end
  end

  # saves the parameterized league name into the model
  def create_path
    self.update_attributes :league_path => self.league_name.parameterize
    # self.league_path = self.league_name.parameterize
  end

end