(function($) {

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
          .renderEach($('#lecture-template'))
          .appendTo('#main .lecture')
          .then(hideLoading)
          .then(function(){
            $('#player').youTubeEmbed($('.youtube-link').attr('href'));
          })
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
