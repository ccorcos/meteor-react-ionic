
# VelocityTransitionGroupChild = React.createClass

#   componentWillEnter: (done) ->
#     node = @getDOMNode()
#     Velocity(node, 'slideRightIn', {complete: done})

#   componentWillLeave: (done) ->
#     node = @getDOMNode()
#     Velocity(node, 'slideRightOut', {complete: done})

#   render: ->
#     React.Children.only @props.children


# VelocityTransitionGroup = React.createClass

#   wrapChild: (child) ->
#     (VelocityTransitionGroupChild {transitionName: @props.transitionName}, child)
#   render: ->
#     props = _.extend @props, {childFactory:@wrapChild}
#     ReactTransitionGroup(props)

