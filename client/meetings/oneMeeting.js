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
  },

  requestText() {
    if(this.booked) {
      return 'Already Booked';
    } else {
      if(arrayObjectIndexOf(this.requests, Meteor.user().profile.name, 'userName') > -1) {
        return "Cancel Request";
      } else {
        return "Request to meet";
      }
    }
  },

  requestBtn() {
    if(this.booked) {
      return 'disabled';
    } else {
      if(arrayObjectIndexOf(this.requests, Meteor.user().profile.name, 'userName') > -1) {
        return "btn-warning";
      } else {
        return "btn-info";
      }
    }
  }
});

Template.oneMeeting.events({
  'click .accept-request': (e)=> {
    e.preventDefault();
    let meetingId = FlowRouter.getParam('meetingId');
    Meteor.call('finializeMeeting', meetingId, e.target.id, (err, result)=> {
      if(err) {
        return throwError(err.reason);
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
        return throwError(err.reason);
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
