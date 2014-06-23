Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });
           
  this.route('dashboard');
});

var mustBeSignedIn = function(pause) {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('home');
        pause();
    }
};

var goToDashboard = function(pause) {
    if (Meteor.user()) {
        Router.go('dashboard');
        pause();
    }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['home']});
Router.onBeforeAction(goToDashboard, {only: ['home']});