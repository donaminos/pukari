Template.oneMeeting.helpers({
  meeting() {
    let meetingId = FlowRouter.getParam('meetingId');
    let meeting = Meetings.findOne({_id: meetingId}) || {};
    return meeting;
  },

  requestUsers() {
    // let meetingId = FlowRouter.getParam('meetingId');
    let requestUsers = this.requests;
    return requestUsers;
  },

  meetingOwner() {
    // let meetingId = FlowRouter.getParam('meetingId');
    return this.userId == Meteor.userId();
  },

  cancelMeeting() {
    if(Meteor.userId() == this.bookedUserId) {
      return true;
    } else {
      return false;
    }
  }
});

Template.oneMeeting.events({
  'click .accept-request': (e)=> {
    e.preventDefault();
    let meetingId = FlowRouter.getParam('meetingId');
    Meteor.call('finializeMeeting', meetingId, e.target.id, (err, result)=> {
      if(err) {

      } else {
        return;
      }
    });
  },

  'click .cancel-meeting': (e)=> {
    e.preventDefault();
    let meetingId = FlowRouter.getParam('meetingId');
    Meteor.call('cancelMeeting', meetingId, (err, result)=> {
      if(err) {

      } else {
        return;
      }
    });
  },

  'click .delete-meeting': (e)=> {
    e.preventDefault();
    let meetingId = FlowRouter.getParam('meetingId');
    Meteor.call('removeMeeting', meetingId, (err, result)=> {
      if(err) {

      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  }
})
