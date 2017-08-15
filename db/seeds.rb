require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'usa.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  e = Event.new
  e.name = row['Name']
  e.presenter = row['Presenter']
  e.city = row['City']
  e.state = row['State']
  e.country = row['Country']

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
  e.save
  puts "#{e.name}, #{e.city} saved"
end

puts "There are now #{Event.count} rows in the Events table."