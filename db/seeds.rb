require 'csv'
require 'geocoder'

max_requests_per_minute = 5
requests_per_minute = 0
csv_files = ['Festivals_UK.csv', 'Festivals_USA.csv']

csv_files.each do |filename|
  csv_text = File.read(Rails.root.join('lib', 'seeds', filename))
  csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
  csv.each do |row|
    # find or initialize event
    event = Event.find_or_initialize_by(name: row['Name']) do |e|
      e.presenter = row['Presenter']

      startDateStr = row['StartDay'].to_s + ' ' + row['StartMonth'].to_s + ' ' + row['StartYear'].to_s
      unless startDateStr.blank?
        e.start_date = Date.parse(startDateStr)
      end

      endDateStr = row['EndDay'].to_s + ' ' + row['EndMonth'].to_s + ' ' + row['EndYear'].to_s
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

    # find or initialize venue
    given_address = [row['Address'], row['City'], row['State'], row['Country']].compact.join(', ')
    venue = Venue.find_or_initialize_by(name: row['Venue'], given_address: given_address, state: row['State']) do |v|
      v.given_address = given_address
      puts v.given_address
    end

    # sleeping to help with geocoder over query limit errors
    if venue.new_record? || venue.given_address_changed?
      requests_per_minute += 1

      if (requests_per_minute > max_requests_per_minute)
        sleep(2)
        requests_per_minute = 0
      end
    end

    # create association between venue and event if it does not yet exist
    unless venue.events.include?(event)
      venue.events << event
    end

    venue.save!
    puts "#{event.name}, #{venue.name}, #{venue.formatted_address} read"
  end
end

puts "There are now #{Event.count} rows in the Events table."
puts "There are now #{Venue.count} rows in the Venues table."