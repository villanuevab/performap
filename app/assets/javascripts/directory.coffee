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
    false

  # show country column after clicking on country from directory
  $('a.link-country').click ->
    if $('.col-country').hasClass 'hidden'
      $('.col-country').removeClass 'hidden'
      $('.country').slideDown 'slow'
    else
      $('.country').slideUp 'slow', ->
        $('.col-country').addClass 'hidden'
    false

  # show entries for city in country column
  $('a.link-country-city-expand').click ->
    entries = $(this).next('.country-city-entries')
    if entries.css('display') == 'none'
      entries.slideDown 'slow'
    else
      entries.slideUp 'slow'
    false

  $('a.link-country-city-entry-details').click ->
    if $('.col-details').hasClass 'hidden'
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
    false