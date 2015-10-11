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

    if (errors.title || errors.place || errors.date || errors.message) {
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
      bookedUser: ''
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

    let userInfo = {userFBID: Meteor.user().services.facebook.id, userName: Meteor.user().profile.name};
    let update = {$addToSet: {requests: userInfo}};
    Meetings.update({_id: meetingId}, update);
  },

  // User(author) decides who to meet on a meeting
  finializeMeeting(meetingId, requestUserId) {
    check(this.userId, String);
    check(meetingId, String);
    check(requestUserId, String);

    let update = {$set: {bookedUser: requestUserId, booked: true}};
    Meetings.update({_id: meetingId}, update);
  }
});

// Validate user input on creating a new meeting
validateMeeting = function(meeting) {
  var errors = {};

  if (!meeting.title)
    errors.title = "Please fill in Title";

  if (!meeting.place)
    errors.url = "Please fill in Place";

  if (!meeting.date)
    errors.url = "Please pick a Date";

  if (!meeting.message)
    errors.url = "Please fill in Message";

  return errors;
}
