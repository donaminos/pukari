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
  }
});

String.prototype.capitalize = function(){
  return this.toLowerCase().replace( /\b\w/g, (m)=> {
    return m.toUpperCase();
  });
};
