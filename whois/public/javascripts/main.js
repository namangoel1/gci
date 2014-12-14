$(function() {
  $('button').on('click', function() {
    $(this).text('Wait for it...')
    $.post('/', { address: $('.address').val() }, function(data, textStatus, xhr) {
      $('.msg').slideDown().val( data.lookupData )
      $('button').text('Zing!');
    });
  });
});