// Check if user already requested to meet
function arrayObjectIndexOf(myArray, searchTerm, property) {
  for(var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}

Template.city.helpers({
  cityId() {
    return Meteor.user().profile.city;
  },

  cityNamify() {
    let cityName = Meteor.user().profile.city;
    let camelCased = cityName.replace(/-/g, ' ');

    return camelCased.capitalize();
  },

  meetings() {
    return Meetings.find({});
  },

  haveMeetings() {
    return Meetings.find({}).fetch().length > 0;
  }

});

Template.city.events({
  'click .request.btn-info': (e)=> {
    e.preventDefault();

    Meteor.call('requestToMeet', e.target.id, (err, result)=> {
      if(err) {

      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  },

  'click .request.btn-warning': (e)=> {
    e.preventDefault();

    Meteor.call('undoRequest', e.target.id, (err, result)=> {
      if(err) {

      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  },
});


Template.eachMeeting.helpers({
  userImage() {
    let imageSrc = "http://graph.facebook.com/" + this.fbId + "/picture/?type=large";
    return imageSrc;
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
