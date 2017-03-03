module ApplicationHelper
  
  # Provides a correctly formatted page title depending on what view was loaded.
  def title
    @title ? "#{@title} | Fantasy Oscars" : "Fantasy Oscars"
  end

  # Provides the right class for the body tag depending on what view was loaded.
  def body_class
    @title ? @title.parameterize : "generic"
  end

  # Returns true if the view gets a home button
  def gets_home?
    !@title.downcase.include? "welcome"
  end

end
