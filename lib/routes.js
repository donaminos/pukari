FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'mainContent'});
  }
});

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'login'});
  }
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'notFound'});
  }
};
