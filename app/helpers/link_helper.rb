module LinkHelper
  def google_maps_url
    "https://maps.googleapis.com/maps/api/js?key=#{Rails.application.secrets.google_maps_api_key}&callback=initMapModus"
  end

  def instagram_link(username)
    "https://www.instagram.com/" + username
  end

  def twitter_link(username)
    "https://www.twitter.com/" + username
  end
end