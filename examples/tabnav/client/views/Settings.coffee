Body = React.createFactory(Ionic.Body)
Header = React.createFactory(Ionic.Header)
Title = React.createFactory(Ionic.Title)
Content = React.createFactory(Ionic.Content)

{p} = React.DOM
{TabBar, Nav} = React.factories

React.createClassFactory
  displayName: "Settings"
  mixins: [React.addons.PureRenderMixin]

  render: ->
    (Body {},
      # (Nav {color: 'positive'},
      #   (Title {}, 'Settings')
      # )
      (Content {header: true, tabs: true},
        (p {}, 'nothing here yet')
      )
      (TabBar {active: 'settings'})
    )