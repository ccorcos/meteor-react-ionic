if Meteor.isClient
  # reset a session variable some time after the last time it changed.
  @ResettingSessionVar = (sessionString, resetValue, ms) ->
    Session.setDefault(sessionString, resetValue)
    timerId = null
    Tracker.autorun (c) ->
      value = Session.get(sessionString)
      if value isnt resetValue
        # reset the posts after some time
        Meteor.clearTimeout(timerId)
        timerId = Meteor.setTimeout((()->
          Session.set(sessionString, resetValue)
          Meteor.clearTimeout(timerId)
        ), ms)

        