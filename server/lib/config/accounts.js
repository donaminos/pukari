// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: APP_ID_TEST,
        secret: SECRET_TEST
      }
    },
    { upsert: true }
  );
});


Accounts.onCreateUser(function(options, user) {
  if (options) {
    options.profile.city = '';
    user.profile = options.profile;
  }
  return user;
});
