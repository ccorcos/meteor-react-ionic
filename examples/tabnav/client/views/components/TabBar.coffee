
Tabs = React.createFactory(Ionic.Tabs)
Tab = React.createFactory(Ionic.Tab)
Icon = React.createFactory(Ionic.Icon)

React.createClassFactory
  displayName: 'TabBar'
  mixins: [React.addons.PureRenderMixin]

  propTypes:
    active: React.PropTypes.oneOf(['home', 'search', 'plus', 'activity', 'settings']).isRequired

  render: ->
    (Tabs {iconOnly: true},
      (Tab {active: @props.active is 'home', href: '/'},
        (Icon {icon:'ios-home'})
      )
      (Tab {active: @props.active is 'settings', href: '/settings'},
        (Icon {icon:'ios-person'})
      )
    )