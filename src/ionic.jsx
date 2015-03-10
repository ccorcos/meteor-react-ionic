
Ionic = {}

var classSet = React.addons.classSet

var COLOR = 'light'

Ionic.mixins = {}

var Classable = {
    propTypes: {
        className: React.PropTypes.string
    }
}

var Styleable = {
    propTypes: {
        style: React.PropTypes.object
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
Ionic.mixins.Styleable = Styleable


Ionic.Body = React.createClass({
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
    mixins: [Classable, Styleable],
    render() {
        var c = {'title': true}
        if (this.props.className) {
            c[this.props.className] = true
        }
        var classes = classSet(c);

        return (
            <h1 className={classes} style={this.props.style}>
                {this.props.children}
            </h1>
        ) 
    }
});


Ionic.Bar = React.createClass({

    mixins: [ Colorable('bar'), Classable , Styleable],

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
        var c = {'bar': true}
        if (this.props.className) {
            c[this.props.className] = true
        }
        c[this.getPositionClass()] = true
        c[this.getColorClass()] = true
        var classes = classSet(c);
        return (
            <div className={classes} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }

});

Bar = Ionic.Bar

Ionic.Header = React.createClass({
    mixins: [ Colorable('bar'), Classable , Styleable],

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
    mixins: [ Classable, Styleable],

    getDefaultProps() {
        return {
            header: false,
            footer: false,
            tabsTop: false,
            tabs:false
        };
    },

    render() {
        var c =  {
            'content': true,
            'overflow-scroll': true,
            'has-header': this.props.header,
            'has-footer': this.props.footer,
            'has-tabs-top': this.props.tabsTop,
            'has-tabs': this.props.tabs
        }
        if (this.props.className) {
            c[this.props.className] = true
        }
        var classes = classSet(c);

        return <div className={classes} style={this.props.style}>{this.props.children}</div>
    }
})

Ionic.Padding = React.createClass({
    mixins: [ Classable, Styleable],
    render() {
        var c =  {'padding': true}
        if (this.props.className) {
            c[this.props.className] = true
        }
        var classes = classSet(c);

        return <div className={classes} style={this.props.style}>{this.props.children}</div>
    }
})

Ionic.List = React.createClass({
    mixins: [ Classable, Styleable],
    render() {
        var c =  {'list': true}
        if (this.props.className) {
            c[this.props.className] = true
        }
        var classes = classSet(c);
       
        return <div className={classes} style={this.props.style}>{this.props.children}</div>
    }
})


Ionic.Item = React.createClass({
    mixins: [ Colorable('item'), Classable, Styleable],

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
        var c =  {
            'item': true,
            'item-input': this.props.input,
        }

        c[this.getColorClass()] = true
        if (this.props.className) {
            c[this.props.className] = true
        }

        var classes = classSet(c);

        return (
            <label className={classes} style={this.props.style} onClick={this.props.onClick}>
                {this.props.children}
            </label>
        )

    }
})



Ionic.Button = React.createClass({

    mixins: [Colorable('button'), Classable, Styleable],

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

        if (this.props.className) {
            c[this.props.className] = true
        }
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
                <div className={classes} style={this.props.style} onClick={this.props.onClick}>
                    {this.props.children}
                </div>
            )       
        } else {
            return (
                <button className={classes} style={this.props.style} onClick={this.props.onClick}>
                    {this.props.children}
                </button>
            )  
        }
    }
});

Ionic.Tabs = React.createClass({
    mixins: [ Colorable('tabs-color'), BackgroundColorable('tabs-background')],

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
    mixins: [ Styleable ],

    propTypes: {
        icon: React.PropTypes.string.isRequired,
        spin: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
              spin: false
        };
    },

    render() {
        classes = 'icon ion-'+this.props.icon
        if (this.props.spin) {
            classes += " ion-spin"
        }
        return <i className={classes} style={this.props.style}></i>
    }
});

