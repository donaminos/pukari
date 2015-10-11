Meteor.publish('loggedInUser', (userId)=> {
  return Meteor.users.find({_id: userId});
});

Meteor.publish('meetings', (cityId)=> {
  return Meetings.find({city: cityId}, {sort: {date: 1}});
});

Meteor.publish('oneMeeting', (meetingId)=> {
  return Meetings.find({_id: meetingId});
});
