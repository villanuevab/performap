$ ->
  $('a.link-latest').click ->
    if $('.col-latest').hasClass 'hidden'
      $('.col-latest').removeClass 'hidden'
      $('.latest').slideDown 'slow'
      $('.directory-entries').slideDown 'slow'
    else
      $('.latest').slideUp 'slow', ->
        $('.col-latest').addClass 'hidden'
      $('.directory-entries').slideUp 'slow'
      if !$('.col-country').hasClass 'hidden'
        $('.country').slideUp 'slow', ->
          $('.col-country').addClass 'hidden'
    false

  $('a.link-country').click ->
    if $('.col-country').hasClass 'hidden'
      $('.col-country').removeClass 'hidden'
      $('.country').slideDown 'slow'
    else
      $('.country').slideUp 'slow', ->
        $('.col-country').addClass 'hidden'
    false