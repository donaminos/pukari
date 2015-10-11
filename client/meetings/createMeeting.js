// Date picker package setting
Template.createMeeting.onRendered(()=>{
  this.$('.datetimepicker').datetimepicker();
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

    Meteor.call('meetingInsert', meeting, (err, result)=> {
      if(err) {

      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);  
      }
    });
  }
});
