// Date picker package setting
Template.createMeeting.onRendered(()=>{
  this.$('.datetimepicker').datetimepicker();
});

// Reset Errors
Template.createMeeting.created = ()=> {
  Session.set('meetingCreateErrors', {});
}

Template.createMeeting.helpers({
  errorMessage(field) {
    return Session.get('meetingCreateErrors')[field];
  },
  errorClass(field) {
    return !!Session.get('meetingCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.createMeeting.events({
  // Submit a meeting
  'submit form': (e)=> {
    e.preventDefault();

    let meeting = {
      title: $(e.target).find('[name=title]').val(),
      place: $(e.target).find('[name=place]').val(),
      date: $(e.target).find('[name=date]').val(),
      message: $(e.target).find('[name=message]').val(),
      city: Meteor.user().profile.city
    };

    let errors = validateMeeting(meeting);
    if(errors.title || errors.place || errors.date || errors.message) {
      return Session.set('meetingCreateErrors', errors);
    }

    Meteor.call('meetingInsert', meeting, (err, result)=> {
      if(err) {
        return throwError(err.reason);
      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  }
});
