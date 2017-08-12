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

  updateCountryTable = (country) ->
    $('#country-table thead th').text country

    tbody = $('#country-table tbody')
    tbody.empty()
    gon.citiesByCountry[country].forEach (city) ->
      tbody.append '<tr class="country-city"><td><a href="#" class="toggle" data-city="' + city + '">' + city + '</a></td></tr>'
      return
    $('#country-table').trigger 'update'

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

  # $('a.link-entry-details').click ->
  #   selected_cell = $(this).parent()
  #   if $('.col-details').hasClass 'hidden'
  #     selected_cell.addClass 'selected'
  #     $('.details').slideDown 'slow'

  #     col_latest_height = $('.col-latest').height()
  #     $('.latest').animate {
  #       height: col_latest_height,
  #     }, 'slow'

  #     $('.latest-entries').hide 'slow'
  #   else
  #     $('.details').slideUp 'slow', ->
  #       selected_cell.removeClass 'selected'
  #       $('.col-details').addClass 'hidden'
  #   false

  $('a.link-entry-details .latest-entry').click ->
    entry_id = $(this).data 'entry-id'
    event = getEventById entry_id
    selected_cell = $(this)

    if $('.col-details').hasClass 'hidden'
      $('.details').attr 'data-entry-id', entry_id
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
    else if +$('.details').attr('data-entry-id') isnt entry_id
      $('.latest-entry.selected').removeClass 'selected'

      $('.details').attr 'data-entry-id', entry_id
      $('.details-title').text event.name
      $('.details-entry').text event.description
      selected_cell.addClass 'selected'
    else
      selected_cell.removeClass 'selected'
      $('.details').slideUp 'slow', ->
        $('.col-details').addClass 'hidden'
    false

  $('#country-table').tablesorter()
  # $('#country-table').tablesorter
  #   cssChildRow: 'tablesorter-childRow'
  # $('.tablesorter').delegate '.toggle', 'click', ->
  #   $(this).parent().toggleClass 'selected'
  #   $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').each ->
  #     if $(this).children('td').css('display') isnt 'none'
  #       $(this).children('td').show()
  #       $(this).find('td .secondary-table-wrapper').slideDown 'slow'
  #       $(this).find('table').tablesorter()
  #     else
  #       $(this).find('td .secondary-table-wrapper').slideUp 'slow', ->
  #         $(this).parent().hide()
  #   false
  # $('.tablesorter-childRow td .secondary-table-wrapper').hide()
  # $('.tablesorter-childRow > td').hide()