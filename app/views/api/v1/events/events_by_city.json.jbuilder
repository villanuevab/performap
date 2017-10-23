json.city @city
json.results @events do |event|
  json.partial! 'event_full', event: event
end
json.total_results @events.count