Meteor.methods({
  chooseCity(cityId) {
    check(this.userId, String);
    check(cityId, String);

    let userId = this.userId;

    Meteor.users.update(
      {_id: userId},
      {$set: {"profile.city": cityId}}
    );
  }
})
