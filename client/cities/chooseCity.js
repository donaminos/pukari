Template.chooseCity.helpers({
  // Change "city-id" format to "City Name" format
  cityNamify() {
    let cityName = Meteor.user().profile.city;
    let camelCased;
    if(cityName.length > 0) {
      camelCased = cityName.replace(/-/g, ' ');
    } else {
      camelCased = 'Not Chosen Yet';
    }
    return camelCased.capitalize();
  }
});

Template.cityList.helpers({
  // Hardcoded city list
  cities() {
    return ['Montreal', 'Toronto', 'Vancouver', 'New York', 'Boston', 'Chicago', 'Los Angeles', 'San Francisco', 'San Diego', 'Phoenix', 'Seattle'];
  },

  // Replace space to hyphen for city name
  cityName() {
    let cityName = this.replace(/\s+/g, '-').toLowerCase();
    return cityName;
  },

  // Check if user chose a city yet
  cityChosen() {
    return Meteor.user().profile.city.length > 0;
  }
});

Template.cityList.events({
  // Update user's chosen city
  'click button': (e)=> {
    e.preventDefault();

    // Meteor.users.update(
    //   {_id: Meteor.userId()},
    //   {$set: {"profile.city": e.target.id}}
    // );

    Meteor.call('chooseCity', e.target.id, (err, result)=> {
      if(err){
        return throwError(err.reason);
      } else {
        FlowRouter.go('/city/' + Meteor.user().profile.city);
      }
    });
  }
});
