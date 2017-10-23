json.results @events do |event|
  json.partial! 'event_full', event: event
end