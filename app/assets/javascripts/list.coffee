$ ->
  getEventById = (eventId) ->
    gon.events.find (el) ->
      el.id is eventId

  $('a.link-latest').click ->
    if $('.col-latest').hasClass 'hidden'
      $('.col-latest').removeClass 'hidden'
      $('.latest-entries').show()
      $('.latest').slideDown 'slow'
      $('.directory-entries').slideDown 'slow'
    else
      $('.latest').slideUp 'slow', ->
        $('.col-latest').addClass 'hidden'
      $('.directory-entries').slideUp 'slow'
      if !$('.col-country').hasClass 'hidden'
        $('.country').slideUp 'slow', ->
          $('.col-country').addClass 'hidden'
      if !$('.col-details').hasClass 'hidden'
        $('.details').slideUp 'slow', ->
          $('.col-details').addClass 'hidden'
      $('.selected').each ->
        $(this).removeClass 'selected'
    false

  createEventEntry = (event) ->
    trHtml = '<tr class="city-entry">'
    trHtml += '<td class="city-entry-name"><a href="#" class="link-entry-details" data-event-id="' + event.id + '">' + event.name + '</a></td>'
    trHtml += '<td class="city-entry-venue"><a href="#" class="link-entry-details" data-event-id="' + event.id + '">' + event.presenter + '</a></td>'
    trHtml += '<td class="city-entry-start-date"><a href="#" class="link-entry-details" data-event-id="' + event.id + '">' + event.start_date + '</a></td>'
    trHtml += '</tr>'
    trHtml

  createEventsTableForCity = (city) ->
    tableHtml = '<tr class="tablesorter-childRow secondary-table-row"><td><div class="secondary-table-wrapper"><table class="secondary-table tablesorter"><thead><tr><th>Name</th><th>Venue</th><th>Date</th><tbody>'
    eventsForCity = gon.events.filter (event) ->
      return event.city == city
    eventsForCity.forEach (event) ->
      tableHtml += createEventEntry(event)
    tableHtml += '</tbody></table></div></td></tr>'
    tableHtml

  # renders table of cities for a given country
  updateCountryTable = (country) ->
    $('#country-table thead th').text country

    tbody = $('#country-table tbody')
    tbody.empty()
    gon.citiesByCountry[country].forEach (city) ->
      tbody.append '<tr class="country-city"><td><a href="#" class="toggle" data-city="' + city + '">' + city + '</a></td></tr>'
      tbody.append createEventsTableForCity(city)
      return
    $('#country-table').trigger 'update'
    $('.tablesorter-childRow td .secondary-table-wrapper').hide()
    $('.tablesorter-childRow > td').hide()

  # show country column after clicking on country from directory
  $('a.link-country').click ->
    selected_cell = $(this).children '.directory-entry'
    country = $(this).attr('data-country')
    if $('.col-country').hasClass 'hidden'
      updateCountryTable country

      selected_cell.addClass 'selected'
      $('.col-country').removeClass 'hidden'
      $('.country').slideDown 'slow'
    else if $('#country-table thead th').text isnt country
      updateCountryTable country

      $('.directory-entry.selected').removeClass 'selected'
      selected_cell.addClass 'selected'
    else
      $('.country').slideUp 'slow', ->
        $('.col-country').addClass 'hidden'
        selected_cell.removeClass 'selected'
    false

  $('a.link-entry-details .latest-entry').click ->
    event_id = $(this).data 'event-id'
    event = getEventById event_id
    selected_cell = $(this)

    if $('.col-details').hasClass 'hidden'
      $('.details').attr 'data-event-id', event_id
      $('.details-title').text event.name
      $('.details-entry').text event.description

      selected_cell.addClass 'selected'
      $('.col-details').removeClass 'hidden'
      $('.details').slideDown 'slow'

      col_latest_height = $('.col-latest').height()
      $('.latest').animate {
        height: col_latest_height,
      }, 'slow'

      #$('.latest-entries').hide 'slow'
    else if +$('.details').attr('data-event-id') isnt event_id
      $('.latest-entry.selected').removeClass 'selected'

      $('.details').attr 'data-event-id', event_id
      $('.details-title').text event.name
      $('.details-entry').text event.description
      selected_cell.addClass 'selected'
    else
      selected_cell.removeClass 'selected'
      $('.details').slideUp 'slow', ->
        $('.col-details').addClass 'hidden'
    false

  $('#country-table').tablesorter
    cssChildRow: 'tablesorter-childRow'
  $('.tablesorter').delegate '.toggle', 'click', ->
    $(this).parent().toggleClass 'selected'
    $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').each ->
      if $(this).children('td').css('display') is 'none'
        $(this).children('td').show()
        $(this).find('td .secondary-table-wrapper').slideDown 'slow'
        $(this).find('table').tablesorter()
      else
        $(this).find('td .secondary-table-wrapper').slideUp 'slow', ->
          $(this).parent().hide()
    false