Template.oneMeeting.helpers({
  meeting() {
    let meetingId = FlowRouter.getParam('meetingId');
    let meeting = Meetings.findOne({_id: meetingId}) || {};
    return meeting;
  },

  requestUsers() {
    let meetingId = FlowRouter.getParam('meetingId');
    let requestUsers = Meetings.findOne({_id: meetingId}).requests;
    return requestUsers;
  },

  meetingOwner() {
    let meetingId = FlowRouter.getParam('meetingId');
    return Meetings.findOne({_id: meetingId}).userId == Meteor.userId();
  }
});

Template.oneMeeting.events({
  'click .accept-request': (e)=> {
    e.preventDefault();
    let meetingId = FlowRouter.getParam('meetingId');
    console.log(meetingId);
    Meteor.call('finializeMeeting', meetingId, e.target.id, (err, result)=> {
      if(err) {

      } else {
        return;
      }
    });
  }
})
