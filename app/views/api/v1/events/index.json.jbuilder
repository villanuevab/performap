json.results @events do |event|
  json.id event.id
  json.name event.name
  json.city event.city
  json.state event.state
  json.country event.country
  json.start_date event.start_date.strftime("%-m/%-d")

  if event.end_date && event.end_date != event.start_date
    json.end_date event.end_date.strftime("%-m/%-d")
    json.start_end_daterange event.start_date.strftime("%-m/%-d") + "-" + event.end_date.strftime("%-m/%d")
  else
    json.end_date nil
    json.start_end_daterange event.start_date.strftime("%-m/%-d")
  end

  json.description event.description

  json.links do
    json.website event.website
    json.facebook event.facebook
    json.instagram event.instagram
    json.twitter event.twitter
    json.youtube event.youtube

  end
  json.created_at event.created_at.strftime("%m/%d/%Y %H:%M")
  json.updated_at event.updated_at.strftime("%m/%d/%Y %H:%M")
end