Body = React.createFactory(Ionic.Body)
Header = React.createFactory(Ionic.Header)
Title = React.createFactory(Ionic.Title)
Content = React.createFactory(Ionic.Content)
Item = React.createFactory(Ionic.Item)
List = React.createFactory(Ionic.List)
Icon = React.createFactory(Ionic.Icon)

{h2, p} = React.DOM
{PostItem, LoadingItem, InfiniteScroll, TabBar} = React.factories


# For the sake of this demo, we'll reset the postsLimit after
# 6 seconds. In practice, we should reset after a longer period
# of time, or when the user takes some action.
N_POSTS = 20
N_INC = 5
N_MINUTES = 5

# Set a session variable that resets itself periodically
ResettingSessionVar('home.postsLimit', N_POSTS, 1000*60*N_MINUTES)

# create a subscription cache to cache post list subscriptions
subsCache = new SubsCache
  expireAter: N_MINUTES
  cacheLimit: 1

React.createClassFactory
  displayName: "Home"
  mixins: [React.MeteorMixin, React.addons.PureRenderMixin]

  # create a local namespace for postsLimit
  getSessionVars:
    postsLimit: 'home.postsLimit'

  # reactively set this.state
  getMeteorState:
    postIds: -> 
      # fetch and return only the _ids for fine-grained reactivity
      posts = Posts.find({}, {sort:{name: 1, date:-1}, fields:{_id:1}}).fetch()
      _.pluck posts, '_id'
    canLoadMore: -> 
      # depend on postIds!
      @getMeteorState.postIds().length >= @vars.postsLimit.get()

  getMeteorSubs: ->
    subsCache.subscribe('posts', @vars.postsLimit.get())
    () -> subsCache.ready()

  loadMore: (nItemsCurrent)->
    # postsLimit is periodically reset. if its reset but we have cached
    # posts, we want to increment based on the current number of items.
    @vars.postsLimit.set(nItemsCurrent + N_INC)

  renderItems: (children, onScroll) -> 
    # make sure to add props!
    children.unshift({})   
    (Content {onScroll:onScroll, ref:'scrollable', header:true, tabs:true},
      List.apply(this, children)
    )
    
  renderItem: (item, onClick) ->
    (PostItem {onClick: onClick, postId: item, key: item})

  renderEmpty: () ->
    (Item {style:{textAlign:'center', border:0}},
      (p {}, 'There are no posts...')
    )

  renderLoading: () ->
    (LoadingItem {})

  clickPost: (post) ->
    console.log "clicked post", post

  render: ->
    (Body {},
      (Header {position:'header', color: 'positive'},
        (Title {}, 'Home')
      )
      (InfiniteScroll
        items: @state.postIds
        renderItems: @renderItems
        renderItem: @renderItem
        renderEmpty: @renderEmpty
        renderLoading: @renderLoading
        canLoadMore: @state.canLoadMore
        isLoading: not @state.subsReady
        loadMore: @loadMore
        onClick: @clickPost
        buffer: 50
      )
      (TabBar {active:'home'})
    )