# this file should load firstRun
if Meteor.isClient
  @subs = new SubsManager
    # maximum number of cache subscriptions
    cacheLimit: 10
    # any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
