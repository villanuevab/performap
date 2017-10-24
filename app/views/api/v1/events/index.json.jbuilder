json.results(@events) do |event|
  json.partial! 'api/v1/events/event_full', :event => event
end