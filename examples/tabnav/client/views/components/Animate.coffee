ReactTransitionGroup = React.createFactory(React.addons.CSSTransitionGroup)

# VelocityTransitionGroupChild = React.createClass
#   propType:
#     animationIn: React.PropTypes.string
#     animationOut: React.PropTypes.string

#   componentWillEnter: (done) ->
#     node = @getDOMNode()
#     if @props.animationIn
#       Velocity(node, @props.animationIn, {complete: done})
#     else
#       done()

#   componentWillLeave: (done) ->
#     node = @getDOMNode()
#     if @props.animationOut
#       Velocity(node, @props.animationOut, {complete: done})
#     else
#       done()

#   render: ->
#     React.Children.only(@props.children)

# VelocityWrapChild = React.createFactory(VelocityTransitionGroupChild)

# VelocityTransitionGroup = React.createClass
#   propType:
#     animationIn: React.PropTypes.string
#     animationOut: React.PropTypes.string

#   wrapChild: (child) ->
#     (VelocityWrapChild {animationIn: @props.animationIn, animationOut: @props.animationOut, }, 
#       (child)
#     )
#   render: ->
#     props = _.extend(@props, {childFactory:@wrapChild})
#     ReactTransitionGroup(props)






AnimatorMixin = (transitions) ->

  componentWillEnter: (done) ->
    node = @getDOMNode()
    transition = transitions[Animator.transition]?.in
    console.log "willEnter"
    if transition
      Velocity(node, transition, {complete: done})
      return

    transition = transitions.default?.in
    if transition
      Velocity(node, transition, {complete: done})
      return

    done()

  componentWillLeave: (done) ->
    node = @getDOMNode()
    transition = transitions[Animator.transition]?.out
    console.log "willLeave"
    if transition
      Velocity(node, transition, {complete: done})
      return
      
    transition = transitions.default?.out
    if transition
      Velocity(node, transition, {complete: done})
      return

    done()



fade = 
  in: 'transition.fadeIn'
  out: 'transition.fadeOut'

navTransitions = 
  push: fade
  pop: fade

Header = React.createFactory(Ionic.Header)

Animator =
  transition: 'push'
  pushTo: (args...) ->
    @transition = 'push'
    FlowRouter.go.apply(FlowRouter, args)
  popTo: (args...) ->
    @transition = 'pop'
    FlowRouter.go.apply(FlowRouter, args)

title = React.createFactory(Ionic.Title)

Ionic.Title = React.createClass(
  displayName: 'TitleAnimate'
  mixin: [AnimatorMixin(navTransitions)]
  render: ->
    (title @props)
)

React.createClassFactory
  displayName: 'Nav'
  mixin: [AnimatorMixin(navTransitions)]
  render: ->
    console.log "render nav"

    (Header _.omit(@props, 'children'),
      (ReactTransitionGroup {transitionName: 'nav', children:@props.children})
    )
    