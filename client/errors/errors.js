// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message})
}

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
};
