Router.configure({
  layout: 'layout',
  notFoundPage: 'notFound'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });
});
