class StaticPagesController < ApplicationController
  def welcome
    @title = "Welcome"
  end

  def about
    @title = "About"
  end

  def help
    @title = "Help"
  end
end
