$(function() {
  $('button').on('click', function() {
    $(this).text('Translating...')
    $.post('/', {
      text: $('textarea').val(),
      lang1: $('.lang-1').val(),
      lang2: $('.lang-2').val(),
      lang3: $('.lang-3').val()
    }, function(data, textStatus, xhr) {

      $('button').slideUp();
      $('.text-1').text(data.text1);
      $('.text-2').text(data.text2);
      $('.text-3').text(data.text3);
      $('.eng').text(data.eng);

      $('.text-1').slideDown('300', function() {
        $('.text-2').slideDown('300', function() {
          $('.text-3').slideDown('300', function() {
            $('.eng').slideDown('300');
          });
        });
      });

      console.log(data);
    });
  });
});