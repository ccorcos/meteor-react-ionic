Body = React.createFactory(Ionic.Body)
Header = React.createFactory(Ionic.Header)
Title = React.createFactory(Ionic.Title)
Content = React.createFactory(Ionic.Content)

{p, h2} = React.DOM
{TabBar} = React.factories

subsCache = new SubsCache
  expireAter: 5 # minutes
  cacheLimit: 20

React.createClassFactory
  displayName: "Post"
  mixins: [React.MeteorMixin, React.addons.PureRenderMixin]

  propTypes:
    postId: React.PropTypes.string.isRequired

  getMeteorSubs: ->
    subsCache.subscribe('post', @rprops.postId.get())
    return () -> subsCache.ready()

  getMeteorState: 
    post: ->
      post = Post.findOne(@rprops.postId.get())
      post?.user = Meteor.users.findOne(post?.userId)
      return post

  render: ->
    (Body {},
      (Header {position:'header', color: 'positive'},
        (Title {}, 'Post')
      )
      (do =>
        if @state.post
          (Content {header: true, tabs: true},
            (h2 {}, @state.post.title)
            (p {},  @state.post.user.username)
          )
        else
          (Content {header: true, tabs: true},
            (h2 {style:{paddingTop: 20, textAlign:'center'}},
              '404'
            )
          )
      )
      (TabBar {active: 'home'})
    )