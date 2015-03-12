
FlowRouter.route '/',
  action: (params, queryParams) ->
    {postId} = queryParams
    if postId
      React.renderBody React.factories.Post({postId:postId, onBack:(() -> FlowRouter.go('/'))})
    else
      React.renderBody React.factories.Home({})

FlowRouter.route '/settings',
  action: (params) ->
    React.renderBody React.factories.Settings({})