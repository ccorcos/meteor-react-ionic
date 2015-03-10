
Ionic = {}

var classSet = React.addons.classSet

var COLOR = 'light'

Ionic.mixins = {}

var Classable = {
    propTypes: {
        className: React.PropTypes.string
    },
    getClasses() {
        return classSet(this.props.className, classSet.apply(null, arguments));
    }
}

Colorable = function(prefix) {
    return {
        getColorClass() {
            if (this.props.color) {
                return prefix + '-' + this.props.color;
            }
        },

        getColor() {
            return this.props.color;
        },

        propTypes: {
            color: React.PropTypes.oneOf(['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'])
        }
    }
}

BackgroundColorable = function(prefix) {
    return {
        getBackgroundColorClass() {
            if (this.props.backgroundColor) {
                return prefix + '-' + this.props.backgroundColor;
            }
        },

        getBackgroundColor() {
            return this.props.backgroundColor;
        },

        propTypes: {
            backgroundColor: React.PropTypes.oneOf(['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'])
        }
    }
}

Ionic.mixins.Colorable = Colorable
Ionic.mixins.BackgroundColorable = BackgroundColorable 
Ionic.mixins.Classable = Classable



Ionic.Body = React.createClass({
    mixins: [ Classable ],

    render() {
        return (
            <div className='ionic'>
                <div className='ionic-body' style={{position:'absolute'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }

});


Ionic.Title = React.createClass({

    render() {
        return (
            <h1 className='title'>
                {this.props.children}
            </h1>
        ) 
    }
});


Ionic.Bar = React.createClass({

    mixins: [ Colorable('bar'), Classable ],

    propTypes: {
        position: React.PropTypes.oneOf(['header', 'subheader', 'footer']).isRequired
    },

    getDefaultProps() {
        return {
            color: COLOR
        }
    },

    getPositionClass() {
        return 'bar-'+this.props.position;
    },

    render() {
        return (
            <div className={this.getClasses('bar', this.getColorClass(), this.getPositionClass())}>
                {this.props.children}
            </div>
        )
    }

});

Bar = Ionic.Bar

Ionic.Header = React.createClass({
    mixins: [ Colorable('bar'), Classable ],

    render() {
        return <Bar {...this.props} position='header'/>
    }
})

Ionic.SubHeader = React.createClass({
    mixins: [ Colorable('bar'), Classable ],

    render() {
        return <Bar {...this.props} position='subheader'/>
    }
})

Ionic.Footer = React.createClass({
    mixins: [ Colorable('bar'), Classable ],

    render() {
        return <Bar {...this.props} position='footer'/>
    }
})

Ionic.Content = React.createClass({
    mixins: [ Classable ],

    getDefaultProps() {
        return {
            header: false,
            footer: false,
            tabsTop: false,
            tabs:false
        };
    },

    render() {
        classes = classSet({
            'content': true,
            'overflow-scroll': true,
            'has-header': this.props.header,
            'has-footer': this.props.footer,
            'has-tabs-top': this.props.tabsTop,
            'has-tabs': this.props.tabs
        })

        return <div className={classes}>{this.props.children}</div>
    }
})

Ionic.Padding = React.createClass({
    mixins: [ Classable ],
    render() {
        return <div className='padding'>{this.props.children}</div>
    }
})

Ionic.List = React.createClass({
    mixins: [ Classable ],
    render() {
        return <div className='list'>{this.props.children}</div>
    }
})


Ionic.Item = React.createClass({
    mixins: [ Colorable('item'), Classable ],

    propTypes: {
        onClick: React.PropTypes.func,
        input: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            color: COLOR,
            input: false
        }
    },

    render() {
        var color = this.getColorClass()
        var cs = {}
        cs[color] = true
        cs['item'] = true
        cs['item-input'] = this.props.input
        var classes = classSet(cs)
        return (
            <label className={classes} onClick={this.props.onClick}>
                {this.props.children}
            </label>
        )

    }
})



Ionic.Button = React.createClass({

    mixins: [ Ionic.mixins.Colorable('button'), Ionic.mixins.Classable ],

    propTypes: {
        width: React.PropTypes.oneOf(['full', 'block']),
        size: React.PropTypes.oneOf(['small', 'large']),
        type: React.PropTypes.oneOf(['outline', 'clear']),
        icon: React.PropTypes.string,
        iconOnly: React.PropTypes.bool,
        iconPosition: React.PropTypes.oneOf(['left', 'right']),
        onClick: React.PropTypes.func,
        div: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            color: COLOR,
            iconOnly: false,
            iconPosition: 'left',
            div: false
        }
    },

    prefix(prop) {
        return prop ? 'button-'+prop : null;
    },

    render() {
        var color = this.getColorClass();

        var cs = {'button': true}
        cs[color] = true
        cs['icon'] = this.props.iconOnly

        if (this.props.icon) {
            cs['ion-'+this.props.icon] = true
            cs['icon-'+this.props.iconPosition] = true
        }
        if (this.props.width) {
            cs['button-'+this.props.width] = true
        }
        if (this.props.size) {
            cs['button-'+this.props.size] = true
        }
        if (this.props.type) {
            cs['button-'+this.props.type] = true
        }
        
        var classes = classSet(cs)

        if (this.props.div) {
            return (
                <div className={classes} onClick={this.props.onClick}>
                    {this.props.children}
                </div>
            )       
        } else {
            return (
                <button className={classes} onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            )  
        }
    }
});

Ionic.Tabs = React.createClass({
    mixins: [ Classable , Colorable('tabs-color'), BackgroundColorable('tabs-background')],

    propTypes: {
        iconOnly: React.PropTypes.bool,
        iconPosition: React.PropTypes.oneOf(['top', 'left', 'right']),
        striped: React.PropTypes.bool,
        top: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            color: 'positive',
            backgroundColor: 'stable',
            iconOnly: false,
            striped: false,
            top: false,
        }
    },

    render() {
        var color = this.getColorClass()
        var bgColor = this.getBackgroundColorClass()
        var wcs = {}
        wcs[color] = true
        wcs[bgColor] = true
        wcs['tabs-striped'] = this.props.striped
        wcs['tabs-top'] = this.props.top

        var wrapperClasses = classSet(wcs)

        var cs = {}
        cs['tabs'] = true
        cs['tabs-icon-only'] = this.props.iconOnly
        if (this.props.iconPosition) {
            cs['tabs-icon-'+this.props.iconPosition] = true
        }

        var classes = classSet(cs);

        return (
            <div className={wrapperClasses}>
                <div className={classes}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});



Ionic.Tab = React.createClass({
    mixins: [ Classable ],

    propTypes: {
        href: React.PropTypes.string,
        active: React.PropTypes.bool,
    },

    getDefaultProps () {
        return {
            active: false,
            href: '#'  
        };
    },

    render() {
        classes = classSet({
            'tab-item': true,
            'active': this.props.active
        });
        return <a className={classes} href={this.props.href}>{this.props.children}</a>
    }
});

Ionic.Icon = React.createClass({

    propTypes: {
        icon: React.PropTypes.string.isRequired,
    },

    render() {
        classes = 'icon ion-'+this.props.icon
        return <i className={classes}></i>
    }
});

