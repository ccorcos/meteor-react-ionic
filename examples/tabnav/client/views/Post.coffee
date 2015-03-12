Body = React.createFactory(Ionic.Body)
Header = React.createFactory(Ionic.Header)
Title = React.createFactory(Ionic.Title)
Content = React.createFactory(Ionic.Content)
Padding = React.createFactory(Ionic.Padding)

{p, h2, div} = React.DOM
{TabBar, Spinner, Nav} = React.factories

subsCache = new SubsCache
  expireAter: 5 # minutes
  cacheLimit: 20

Button = React.createFactory(Ionic.Button)

React.createClassFactory
  displayName: "NavBackButton"
  mixins: [React.addons.PureRenderMixin]

  propTypes:
    onClick: React.PropTypes.func

  render: ->
    (Button _.extend(@props, {iconOnly: true, icon:'ios-arrow-back', onClick:@props.onClick}))


{NavBackButton} = React.factories

React.createClassFactory
  displayName: "Post"
  mixins: [React.MeteorMixin, React.addons.PureRenderMixin]

  propTypes:
    postId: React.PropTypes.string.isRequired
    onBack: React.PropTypes.func.isRequired

  getMeteorSubs: ->
    sub = subsCache.subscribe('post', @rprops.postId.get())
    return () -> sub.ready()

  getMeteorState: 
    post: ->
      post = Posts.findOne(@rprops.postId.get())
      post?.user = Meteor.users.findOne(post?.userId)
      return post

  render: ->
    (Body {},
      (Nav {color: 'positive'},
        (NavBackButton {onClick:@props.onBack, color: 'positive'})
        (Title {}, 'Post')
      )
      (do =>
        if @state.post
          (Content {header: true, tabs: true},
            (Padding {}, 
              (h2 {}, @state.post.title)
              (p {},  @state.post.user.username)
            )
          )
        else if @state.subsReady
          (Content {header: true, tabs: true},
            (h2 {style:{paddingTop: 20, textAlign:'center'}},
              '404'
            )
          )
        else
          (Content {header: true, tabs: true},
            (Padding {style:{textAlign:'center'}},
              Spinner()
            )
          )
      )
      (TabBar {active: 'home'})
    )