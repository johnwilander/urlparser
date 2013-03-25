require.config({
  shim: {
      jquery : { exports : "$"},
      Underscore : {
          deps : ["jquery"],
          exports : "Underscore"
      },
      Backbone : {
          deps : ["jquery", "Underscore"],
          exports : "Backbone"
      }
  },

  paths: {
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app'], function(app) {
  // use app here
  console.log(app);
});