Meetings = new Mongo.Collection("meetings");

Meteor.methods({

  // Create a new meeting
  meetingInsert(meetingAttr) {
    check(this.userId, String);
    check(meetingAttr, {
      title: String,
      place: String,
      date: String,
      message: String,
      city: String
    });

    var errors = validateMeeting(meetingAttr);

    if(errors.title || errors.place || errors.date || errors.message) {
      throw new Meteor.Error('invalid-meeting', "You must fill in all field");
    }

    var user = Meteor.user();
    var meeting = _.extend(meetingAttr, {
      userId: user._id,
      author: user.profile.name,
      fbId: user.services.facebook.id,
      created: new Date(),
      booked: false,
      requests: [],
      bookedFBUser: '',
      bookedUserId: ''
    });

    let meetingId = Meetings.insert(meeting);

    return {
      _id: meetingId
    }
  },

  // Send request to book a meeting
  requestToMeet(meetingId) {
    check(this.userId, String);
    check(meetingId, String);

    let userInfo = {
      userFBID: Meteor.user().services.facebook.id,
      userName: Meteor.user().profile.name
    };
    let update = {$addToSet: {requests: userInfo}};
    Meetings.update({_id: meetingId}, update);
  },

  // Undo request to book a meeting
  undoRequest(meetingId) {
    check(this.userId, String);
    check(meetingId, String);

    let userInfo = {
      userFBID: Meteor.user().services.facebook.id,
      userName: Meteor.user().profile.name
    };
    let update = {
      $pull: {
        requests: userInfo
      }
    };
    Meetings.update({_id: meetingId}, update);
  },

  // User(author) decides who to meet on a meeting
  finializeMeeting(meetingId, requestUserId) {
    check(this.userId, String);
    check(meetingId, String);
    check(requestUserId, String);

    let update = {
      $set: {
        bookedFBUser: requestUserId,
        bookedUserId: this.userId,
        booked: true
      }
    };
    Meetings.update({_id: meetingId}, update);
  },

  // Cancel meeting
  cancelMeeting(meetingId) {
    check(this.userId, String);
    check(meetingId, String);

    let update = {
      $set: {
        bookedFBUser: '',
        bookedUserId: '',
        booked: false
      }
    };
    Meetings.update({_id: meetingId}, update);
  },

  // Remove meeting
  removeMeeting(meetingId) {
    check(this.userId, String);
    check(meetingId, String);

    Meetings.remove(meetingId);
  }
});

// Validate user input on creating a new meeting
validateMeeting = function(meeting) {
  var errors = {};

  if (!meeting.title)
    errors.title = "Please fill in Title";

  if (!meeting.place)
    errors.place = "Please fill in Place";

  if (!meeting.date)
    errors.date = "Please pick a Date";

  if (!meeting.message)
    errors.message = "Please fill in Message";

  return errors;
}
