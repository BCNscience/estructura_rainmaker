app.register("ap-media-library", function () {

    var self;
    return {
        publish: {
            prefiltersearchterms: undefined,
            prefilterattributestobesearched: undefined,
            renderOptions: {},
            attachment: false,
            followupmail: false,
            hide: false
        },
        events: {

        },
        states: [
            {
                id: "hide"
            },
            {
                id: "visible"
            },
            {
                id: "followupmail"
            },
            {
                id: "attachment"
            }
        ],
        onRender: function (el) {

            self = this;


            this.load(el);

            if (this.props.hide) {
                this.hide();
            }

            if (this.props.attachment) {
                this.goTo('attachment');
            }
            if (this.props.followupmail) {
                this.goTo('followupmail');
            }

            app.$.on('open:ap-media-library', function () {
                if (this.stateIs("hide"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-media-library', function () {
                if (this.stateIs("visible"))
                    this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                if (this.stateIs("visible"))
                    this.hide();
            }.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        hide: function () {
            app.unlock();
            this.goTo('hide');
        },

        show: function () {
            app.lock();
            this.goTo('visible');
            this.load();
        },

        unload: function() {
            if(this.stateIs("visible"))
                if(self.scroll) self.scroll.destroy();
        },

        load: function (el) {


            var $list = $(el).find("ul");
            $list.empty();
            if(self.scroll) self.scroll.destroy();
            // Initialize scrolling:
            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true});

            // Fill the list with a basic set of media entries (e.g. "all media entries that are attachable to emails"):


            var media = window.mediaRepository.find(this.props.prefiltersearchterms, this.props.prefilterattributestobesearched);
            if (media) {
                $.each(media, function (file, meta) {
                    var listElement = window.mediaRepository.render(file, meta, self.renderOptions);
                    if (listElement) {
                        $list.append(listElement);
                    }
                });
                self.scroll.refresh();
            }

            // Set up live-search (on each key stroke):
            var $listElements = $(self.el).find("ul li");
            var $input = $(self.el).find("input");
            $input.keyup(function (e) {
                // Dismiss on enter:
                if (e.keyCode == 13) {
                    $input.blur();
                    return;
                }
                // Search and update list:
                var searchString = $input.val().toLowerCase();
                var searchTerms = searchString.split(/\s+/g);
                $listElements.each(function () {
                    var $listElement = $(this);
                    var found = searchTerms.reduce(function (found, searchTerm) {
                        return found && ($listElement.text().toLowerCase().indexOf(searchTerm) !== -1);
                    }, true);
                    $listElement.toggleClass("hidden", !found);
                });
                self.scroll.refresh();
            });
        }
    }

});