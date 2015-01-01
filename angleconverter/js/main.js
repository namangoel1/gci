$(function() {

  var conversion = {
    'degree': 1,
    'arcminute': 1/60,
    'arcsecond': 1/3600,
    'radian': 180/Math.PI,
    'full circle': 1/360
  }

  var units = [
    'degree',
    'arcminute',
    'arcsecond',
    'radian',
    'full circle'
  ]

  var units = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $.map(units, function(unit) { return { value: unit }; })
  });
   
  // kicks off the loading/processing of `local` and `prefetch`
  units.initialize();
   
  $('.from, .to').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'units',
    displayKey: 'value',
    source: units.ttAdapter(),
    templates: {
      empty: [
        '<div class="empty"> Hmm, unfortunately it seems like we don\'t have this unit in our database.</div>'
      ]
    }
  });

  $('.from, .to, .value').on('change blur keydown keyup', function() {
    var value = parseFloat($('.value').val());
    var fromVal = $('.from.tt-input').val();
    var toVal = $('.to.tt-input').val();

    console.log(value, $('.from'), fromVal, toVal)

    if ( conversion.hasOwnProperty(fromVal) && conversion.hasOwnProperty(toVal) ) {
      var from = conversion[fromVal];
      var to = 1/conversion[toVal];
      var result = value * from * to;
      console.log(result);
      $('.ans').text(result);
    }
  });


});