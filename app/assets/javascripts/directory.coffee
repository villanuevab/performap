$ ->
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

  # show country column after clicking on country from directory
  $('a.link-country').click ->
    selected_cell = $(this).children '.directory-entry'
    if $('.col-country').hasClass 'hidden'
      selected_cell.addClass 'selected'
      $('.col-country').removeClass 'hidden'
      $('.country').slideDown 'slow'
    else
      $('.country').slideUp 'slow', ->
        $('.col-country').addClass 'hidden'
        selected_cell.removeClass 'selected'
    false

  # show entries for city in country column
  $('a.link-country-city-expand').click ->
    entries = $(this).next '.country-city-entries'
    selected_cell = $(this).children '.country-city'
    if entries.css('display') == 'none'
      entries.slideDown 'slow'
      selected_cell.addClass 'selected'
    else
      entries.slideUp 'slow'
      selected_cell.removeClass 'selected'
    false

  $('a.link-country-city-entry-details').click ->
    selected_cell = $(this).children '.country-entry'
    if $('.col-details').hasClass 'hidden'
      selected_cell.addClass 'selected'
      $('.col-details').removeClass 'hidden'
      $('.details').slideDown 'slow'

      col_latest_height = $('.col-latest').height()
      $('.latest').animate {
        height: col_latest_height,
      }, 'slow'

      $('.latest-entries').hide 'slow'
    else
      $('.details').slideUp 'slow', ->
        $('.col-details').addClass 'hidden'
        selected_cell.removeClass 'selected'
    false