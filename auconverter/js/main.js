$(function() {

  var conversion = {
    'kilometer': 1000,
    'mile': 1609.34,
    'astronomical unit': 149597870700,
    'meter': 1,
    'light year': 9460528400000000,
    'light second': 299792458,
    'parsec': 30856775800000000
  }

  var units = [
    'kilometer',
    'mile',
    'astronomical unit',
    'meter',
    'light year',
    'light second',
    'parsec'
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