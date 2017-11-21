require 'csv'
require 'geocoder'

max_requests_per_minute = 4
requests_per_minute = 0

csv_text = File.read(Rails.root.join('lib', 'seeds', 'usa2.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  event = Event.find_or_initialize_by(name: row['Name']) do |e|
    e.presenter = row['Presenter']

    startDateStr = row['StartDay'] + ' ' + row['StartMonth'] + ' ' + row['StartYear']
    unless startDateStr.blank?
      e.start_date = Date.parse(startDateStr)
    end

    endDateStr = row['EndDay'] + ' ' + row['EndMonth'] + ' ' + row['EndYear']
    unless endDateStr.blank?
      e.end_date = Date.parse(endDateStr)
    end

    e.description = row['Description']
    e.website = row['Website']
    e.facebook = row['Facebook']
    e.instagram = row['Instagram']
    e.twitter = row['Twitter']
    e.youtube = row['Youtube']
    e.save!
  end

  venue = Venue.find_or_initialize_by(name: row['Venue'], state: row['State']) do |v|
    v.given_address = [row['Address'], row['City'], row['State'], row['Country']].compact.join(', ')
  end

  requests_per_minute += 1
  # if geo = Geocoder.search(v.given_address).first
  #   puts geo.coordinates
  #   puts geo.formatted_address
  # end
  if (requests_per_minute > max_requests_per_minute)
    sleep(2)
    requests_per_minute = 0
  end

  venue.events << event
  venue.save!
  puts "#{event.name}, #{venue.name}, #{venue.formatted_address} read"
end

puts "There are now #{Event.count} rows in the Events table."
puts "There are now #{Venue.count} rows in the Venues table."