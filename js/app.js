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
    
    lectureData = {}
    var parseVideo = function(data) {
      lectureData = data[0];
      lectureData['id'] = lectureData.link.split('v=')[1];
    }  
    
    this.get('#/:lecture', function(ctx) {
      showLoading();
      var queryType, options;
      if (ctx.params['lecture'] == "random") {
        queryType = 'random';
        options = {
          startkey: Math.random(),
          limit: 1
        }
      } else {
        queryType = 'video';
        options = {
          key: ctx.params['lecture']
        }
      }
      ctx.load($('#templates .lecture-index'))
        .replace('#main')
        .send(Lecture.viewDocs, queryType, options)
        .then(parseVideo)
        .then(hideLoading)
        .then(function(){
          $('#main .lecture').html(Mustache.to_html($('#lecture-template').text(), lectureData));        
        })
    })

    this.get('#/', function(ctx) {
      ctx.redirect('#', 'random');
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
