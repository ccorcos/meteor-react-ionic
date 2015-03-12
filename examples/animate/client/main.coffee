ReactTransitionGroup = React.createFactory(React.addons.CSSTransitionGroup)

{div} = React.DOM

TitleClass = React.createClass
  displayName: "Title"
  # mixins: [React.addons.PureRenderMixin]
  render: ->
    (div {onClick:@props.changeTitle}, @props.title)

  componentWillEnter: (done) ->
    node = @getDOMNode()
    console.log "willEnter"
    Velocity(node, 'transition.fadeIn', {complete: done})

  componentWillLeave: (done) ->
    node = @getDOMNode()
    console.log "willLeave"
    Velocity(node, 'transition.fadeOut', {complete: done})


Title = React.createFactory(TitleClass)

MainClass = React.createClass
  displayName: "Main"
  # mixins: [React.addons.PureRenderMixin]
  getInitialState: ->
    title: 'Main'
  changeTitle: ->
    if @state.title is 'Home'
      @setState {title: 'Main'}
    else
      @setState {title: 'Home'}
  render: ->
    (div {style:{width: '100%', fontSize:'25px', textAlign:'center', marginTop:'20px'}},
      (ReactTransitionGroup {transitionName: 'fade'},
        (Title {changeTitle:@changeTitle, title:@state.title})
      )
    )

Main = React.createFactory(MainClass)

Meteor.startup ->
  React.render(Main({}), document.body)