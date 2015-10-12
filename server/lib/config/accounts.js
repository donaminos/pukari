// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: APP_ID_PRODUCTION,
        secret: SECRET_PRODUCTION
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
