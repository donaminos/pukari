Template.profile.helpers({
  userFullName() {
    return  Meteor.user().services.facebook.name;
  },

  userImage() {
    let imageSrc = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large";
    return imageSrc;
  },

  cityNamify() {
    let cityName = Meteor.user().profile.city;
    let camelCased = cityName.replace(/-/g, ' ');

    return camelCased.capitalize();
  },

  usersMeetings() {
    return Meetings.find({});
  },

  haveMeetingsYet() {
    return Meetings.find({}).count() > 0;
  },

  meetingCity() {
    let camelCased = this.city.replace(/-/g, ' ');
    return camelCased.capitalize();
  },

  requestText() {
    if(this.booked) {
      return 'Already Booked';
    } else {
      if(arrayObjectIndexOf(this.requests, Meteor.user().profile.name, 'userName') > -1) {
        console.log('cancel!');
        return "Cancel Request";
      } else {
        console.log('request!');
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

Template.profile.events({
  'click .request.btn-info': (e)=> {
    e.preventDefault();

    Meteor.call('requestToMeet', e.target.id, (err, result)=> {
      if(err) {
        return throwError(err.reason);
      } else {
        return; // FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  },

  'click .request.btn-warning': (e)=> {
    e.preventDefault();

    Meteor.call('undoRequest', e.target.id, (err, result)=> {
      if(err) {
        return throwError(err.reason);
      } else {
        return; // FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  },
});

// function arrayObjectIndexOf(myArray, searchTerm, property) {
//   for(var i = 0, len = myArray.length; i < len; i++) {
//     if (myArray[i][property] === searchTerm) return i;
//   }
//   return -1;
// }

String.prototype.capitalize = function(){
  return this.toLowerCase().replace( /\b\w/g, (m)=> {
    return m.toUpperCase();
  });
};
