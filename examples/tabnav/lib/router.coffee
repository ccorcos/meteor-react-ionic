
FlowRouter.route '/',
  action: (params) ->
    React.renderBody React.factories.Home?({})

FlowRouter.route '/settings',
  action: (params) ->
    React.renderBody React.factories.Settings?({})