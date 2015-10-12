Template.mainContent.helpers({
  // Check if current user chose a city yet
  cityChosen() {
    let city = Meteor.user().profile.city || '';
    if(city.length === 0) {
      return false;
    } else {
      return true;
    }
  },

  // Return city name
  cityId() {
    return Meteor.user().profile.city;
  }
});
