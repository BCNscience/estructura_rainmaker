app.register('ag-auto-menu', function () {
    var self;

    return {
        template: '<div class="menu-container"><ul class="menu"></ul></div>',
        current: '',
        fallback: '', // if no menu is built
        publish: {
            hide: false, // Should we initially hide menu?
            placement: ['top', 'bottom'], // top or bottom?
            exclude: '', // Some content that should not be in the menu?
            slideshows: '',
            binding: 77,
            trigger: ''
        },
        events: {
            "tap li": "navigate",
            "tap .menu-container": function (e) {
                if (this.stateIsnt('hidden')) {
                    this.goTo('hidden');
                    app.$.toolbar.hide();
                }
                else
                    this.goTo('open');
            },
            "swipeleft": function (event) {
                event.stopPropagation();
            },
            "swiperight": function (event) {
                event.stopPropagation();
            }
        },
        states: [
            {
                id: 'hidden',
                onEnter: function () {
                    if (this.props.placement === 'bottom') {
                        app.util.transformElement(this.$el, 'translate(0,62px)');
                    }
                    else {
                        app.util.transformElement(this.$el, 'translate(0,-62px)');
                    }
                },
                onExit: function () {
                    app.util.transformElement(this.$el, 'translate(0,0)');
                }
            },
            {
                id: 'open'
            }
        ],
        onRender: function (el) {
            self = this;
            /* antwerpes modification */
            self.appWidth = $(window).width();
            /* end antwerpes modification*/

            if (app.env == 'ag-microsites' || app.env == 'ag-remote') {
                $(el).hide();
            }

            self.pathLength = 2; // Default to menu of structures
            app.$.menu = this;
            if (this.props.hide) {
                this.hide();
                if (this.props.binding) {
                    app.config.update('keyboard', parseInt(this.props.binding, 10), function () {
                        app.$.trigger("toggle:menu");
                    })
                }
            }
            app.$.on('toggle:menu', function () {
                this.toggle('hidden');
            }.bind(this));
            if (this.props.placement === 'bottom') el.classList.add('placement-bottom');
            // Are we using this menu with specific slideshows?
            if (this.props.slideshows) {
                this.props.slideshows.replace(/\s+/g, ''); // "one, two" => "one,two"
                this.props.slideshows = this.props.slideshows.split(',');
            }
            app.listenTo(app.slideshow, 'update:current', this.updateCurrent);
            app.listenTo(app.slideshow, 'load', function (data) {
                self.setup(data.id);
            });
            this.layout({scale: app.getScale()});
            app.on('update:layout', this.layout);
            this.setup();
        },
        hide: function () {
            this.goTo('hidden');
        },
        setup: function (id) {
            id = id || app.slideshow.getId();
            if (!this.props.slideshows || this.props.slideshows.indexOf(id) > -1) {
                this.createLinks(id);
                this.updateCurrent();
            }
            else {
                this.removeLinks();
            }
            this.setTrigger();
        },
        setTrigger: function () {
            if (this.props.trigger) {
                var parts = this.props.trigger.split(' ');
                var e = parts[0];
                var selector = parts[1] || null;
                var el = document;
                if (selector) {
                    el = document.body.querySelector(selector);
                }
                if (el) el.addEventListener(e, function () {
                    self.toggle('hidden');
                });
            }
        },
        createLinks: function (structure) {
            var list = this.$('.menu')[0];
            var structure = structure || app.slideshow.getId();
            var html = '';
            var chapter, links;
            var data = structure === 'storyboard' ? app.model.getStoryboard() : app.model.getStoryboard(structure);
            var pathPrefix = structure + '/';
            var excludedLinks = this.props.exclude.split(' ');

            if (data && data.content) {
                links = data.content;

                // If a single item in menu, let's try to dive down and get more links
                if (links.length === 1) {
                    chapter = data.content[0];
                    data = app.model.getStructure(chapter);
                    if (data && data.content) {
                        links = data.content;
                        pathPrefix += chapter + '/';
                        this.pathLength = 3;
                    }
                }

            }

            if (!list) {
                list = document.createElement('ul');
                list.classList.add('menu');
                this.$el.appendChild(list);
            }
            else {
                list.innerHTML = '';
            }

            if (links) {
                links.forEach(function (item, i) {
                    if (typeof item !== 'string') item = item[0];
                    if (excludedLinks.indexOf(item) === -1) {
                        var name = app.model.getItem(item).name;
                        html += '<li data-goto="' + pathPrefix + item + '">' + name + '</li>';
                    }
                });

                list.appendChild(app.dom.parse(html));
                this.createScroller(list);
            }
        },
        setFallback: function (html) {
            if (html) this.fallback = html;
        },
        removeLinks: function () {
            var list = this.$('.menu')[0];
            list.innerHTML = this.fallback;
        },
        updateCurrent: function () {
            var path = app.getPath();
            var parts = path.split('/');
            if (parts.length > 2 && self.pathLength === 2) path = parts[0] + '/' + parts[1];
            if (self.current) self.current.classList.remove('selected');
            self.current = self.el.querySelector('.menu [data-goto="' + path + '"]');
            if (self.current) self.current.classList.add('selected');


            /*antwerpes modification */
            if (self.scroller) {
                var moveTo;
                if (self.getWidth().menu > self.appWidth) {
                    if (self.current) var pos = $(self.current).position();
                    if (self.current) var outerWidth = $(self.current).outerWidth();

                    if ((pos.left + outerWidth) > self.appWidth) {
                        moveTo = self.scroller.config.limitsX[0];

                    }
                    else if ((pos.left + outerWidth) < self.getWidth().menu) {
                        moveTo = 0;
                    }

                    setTimeout(function () {
                        return self.scroller.moveTo(moveTo, 0)
                    }, 500);
                }
            }


            /*antwerpes modification end */


        },
        navigate: function (event) {
            var link = event.target;
            var path;

            if (link) {
                path = link.getAttribute('data-goto');
                if (path) {
                    app.goTo(path);
                    self.updateCurrent(); // Immediate update of menu
                }
                if (self.props.hide) app.$.trigger("toggle:menu");
            }
        },
        createScroller: function (menu) {
            // TODO: listen to window resize and update limits
            var widths = this.getWidth();
            var appWidth = app.dom.get('wrapper').getBoundingClientRect().width;
            var scrollLimit = appWidth - widths.menu;
            // No scroller necessary if menu isn't bigger than width of view
            if (scrollLimit < 0) {
                this.scroller = new Draggy(menu, {
                    restrictY: true,
                    limitsX: [scrollLimit, 0]
                });
            }
            else {
                this.scroller = null;
            }
        },
        getWidth: function () {
            var links = this.el.querySelectorAll('.menu li');
            var menuWidth = 0;
            var linkWidths = [];
            Array.prototype.slice.call(links).forEach(function (link) {
                var width = link.getBoundingClientRect().width;
                menuWidth += width;
                linkWidths.push(width);
            });
            return {
                menu: menuWidth,
                links: linkWidths
            }
        },
        layout: function (data) {
            // Only apply if zoom is supported
            if (typeof self.el.style.zoom !== 'undefined' && !navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)) {
                self.el.style.zoom = data.scale;
            }
            // Apply scale transform as a fallback
            else {
                app.util.transformElement(self.el, 'translate(-50%, -50%) scale(' + data.scale + ') translate(50%, 50%)');
            }
        },

        moveToCurrent: function (data) {

        }
    }
});