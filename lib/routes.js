FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [AccountsTemplates.ensureSignedIn, checkCity],
  subscriptions(params, queryParams) {
    this.register('loggedInUser', Meteor.subscribe('loggedInUser', Meteor.userId()));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'mainContent'});
  }
});

FlowRouter.route('/profile/:id', {
  name: 'profile',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('loggedInUser', Meteor.subscribe('loggedInUser', params.id));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'profile'});
  }
});

FlowRouter.route('/city/:cityId', {
  name: 'city',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('meetings', Meteor.subscribe('meetings', params.cityId));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'city'});
  }
});

FlowRouter.route('/city/:cityId/create_meeting', {
  name: 'createMeeting',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'createMeeting'});
  }
});

FlowRouter.route('/meetings/:meetingId', {
  name: 'meeting',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('oneMeeting', Meteor.subscribe('oneMeeting', params.meetingId));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'oneMeeting'});
  }
});

FlowRouter.route('/choose_city', {
  name: 'createEvent',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'chooseCity'});
  }
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('mainLayout', {top: 'header', content: 'notFound'});
  }
};

function checkCity(context, redirect) {
  if((Meteor.user()) && (Meteor.user().profile.city.length > 0)) {
    redirect('/city/' + Meteor.user().profile.city);
  }
}


// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');
