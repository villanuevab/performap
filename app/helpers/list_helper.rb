module ListHelper
  # output comma-separated list of cities for a group of venues
  def comma_separated_list(array)
    array.join(", ")
  end
end