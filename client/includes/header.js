Template.header.events({
  // User log out and redirect to sign in page
  'click #log-out': (e)=> {
    e.preventDefault();
    Meteor.logout(()=>{
      FlowRouter.go('/sign-in');
    });
  }
});
