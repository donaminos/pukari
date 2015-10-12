FlowRouter.route('/', {
  name: 'home',
  triggersEnter: [checkCity],
  subscriptions(params, queryParams) {
    this.register('loggedInUser', Meteor.subscribe('loggedInUser', Meteor.userId()));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'mainContent', footer: 'footer'});
  }
});

FlowRouter.route('/about', {
  name: 'about',
  triggersEnter: [checkLoggedIn],
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'about', footer: 'footer'});
  }
});

FlowRouter.route('/profile/:id', {
  name: 'profile',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('loggedInUser', Meteor.subscribe('loggedInUser', params.id));
    this.register('usersMeetings', Meteor.subscribe('usersMeetings', Meteor.userId()));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'profile', footer: 'footer'});
  }
});

FlowRouter.route('/city/:cityId', {
  name: 'city',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('meetings', Meteor.subscribe('meetings', params.cityId));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'city', footer: 'footer'});
  }
});

FlowRouter.route('/city/:cityId/create_meeting', {
  name: 'createMeeting',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'createMeeting', footer: 'footer'});
  }
});

FlowRouter.route('/meetings/:meetingId', {
  name: 'meeting',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  subscriptions(params, queryParams) {
    this.register('oneMeeting', Meteor.subscribe('oneMeeting', params.meetingId));
  },
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'oneMeeting', footer: 'footer'});
  }
});

FlowRouter.route('/choose_city', {
  name: 'createEvent',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'chooseCity', footer: 'footer'});
  }
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('mainLayout', {top: 'headerNavigation', content: 'notFound', footer: 'footer'});
  }
};

function checkCity(context, redirect) {
  if(Meteor.user()) {
    if(Meteor.user().profile.city.length > 0) {
      redirect('/city/' + Meteor.user().profile.city);
    }
  } else {
    redirect('/about');
  }
}

function checkLoggedIn(context, redirect) {
  if(Meteor.user()) {
    redirect('/');
  }
}


// AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');
