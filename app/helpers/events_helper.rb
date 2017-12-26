module EventsHelper
  # return username from link (assuming that username is at end of link)
  def username(link)
    link.split('/').last
  end
end