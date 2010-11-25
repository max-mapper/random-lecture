(function($) {
  
  if (navigator.userAgent.match(/iPad/i) != null) {
    $('#header').append("<h3>iPads don't play many YouTube videos when they're embedded in a page. Try clicking the title to play the lecture in the native YouTube app</h3>");
  }

  var app = $.sammy('#container', function() {
    this.use('JSON')
        .use('Mustache')
        .use('Storage')
        .use('NestedParams')
        .use('Couch', "lectures");

    var showLoading = function() {
      $('#loading').show();
    };

    var hideLoading = function() {
      $('#loading').hide();
    };

    this.get('#/', function(ctx) {
      showLoading();
      this.load($('#templates .lecture-index'))
          .replace('#main')
          .send(Lecture.viewDocs, 'random', {
            startkey: Math.random(),
            limit: 1
          })
          .then(function(data) {
            data = data[0];
            data['id'] = data.link.split('v=')[1];
            $('#main .lecture').html(Mustache.to_html($('#lecture-template').text(), data));
          })
          .then(hideLoading)
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
