Item = React.createFactory(Ionic.Item)
{h2, p} = React.DOM

React.createClassFactory
  displayName: 'PostItem'
  mixins: [React.MeteorMixin, React.addons.PureRenderMixin]

  propTypes:
    postId: React.PropTypes.string.isRequired
    onClick: React.PropTypes.func

  getMeteorState:
    post: ->
      post = Posts.findOne(@rprops.postId.get())
      post?.user = Meteor.users.findOne(post?.userId)
      return post

  render: -> 
    (Item {onClick: @props.onClick},
      (h2 {}, @state.post?.title)
      (p {}, @state.post?.user?.username)
    )

Icon = React.createFactory(Ionic.Icon)

React.createClassFactory
  displayName: 'Spinner'
  mixins: [React.addons.PureRenderMixin]
  render: ->
    (Icon {icon:'load-b', spin:true, style:{fontSize:'25px'}})

{Spinner} = React.factories

React.createClassFactory
  displayName: 'LoadingItem'
  mixins: [React.addons.PureRenderMixin]

  render: -> 
    (Item {style:{textAlign:'center', borderBottom:0}}, 
      Spinner()
    )
