$ ->
  $('a.link-latest').click ->
    if $('.col-latest').hasClass 'hidden'
      $('.col-latest').removeClass 'hidden'
      $('.directory-entries').removeClass 'hidden'
    else
      $('.col-latest').addClass 'hidden'
      $('.directory-entries').addClass 'hidden'
    false