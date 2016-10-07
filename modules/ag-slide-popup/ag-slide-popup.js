app.register('ag-slide-popup', function () {
    return {
        slideEl: null,
        popupScript: null,
        loaded: false,
        popupEl: null,
        template: false,
        publish: {
            slide: null,
            trigger: null,
            noCloseBtn: false,
            popupClass: null
        },
        events: {
            "tap .close-popup-btn": function (e) {
                e.stopPropagation();
                this.close()
            }
        },
        states: [
            {
                id: 'open',
                label: 'Open popup',
                onEnter: function () {
                    if (!this.loaded)
                        this.renderContent();
                    if (this.popupScript && this.popupScript.onEnter)
                        this.popupScript.onEnter(this.slideEl);
                    this.popupEl.classList.add('state-open');
                    app.trigger('open:popup', {id: this.id});
                    var self = this;
                    $('.close-popup-btn').on('click', function () {
                        self.close();
                    });
                },
                onExit: function () {
                    if (this.popupScript && this.popupScript.onExit)
                        this.popupScript.onExit(this.slideEl);
                    this.popupEl.classList.remove('state-open');
                    app.trigger('close:popup', {id: this.id});
                }
            }
        ],
        onRender: function (el) {
            var slideId = this.props.slide;
            var self = this;

            this.createContainer();
            this.setTrigger();
            this.addCloseBtn();

            if (slideId) {
                // Fetch the slide but don't render it yet
                app.slide.load(slideId, function (data) {
                    this.slideEl = app.dom.get(slideId);
                });
            }
            else {
                this.slideEl = el.querySelector('[data-partial]');
                this.loaded = true;
            }
        },
        onRemove: function () {
            this._removeElement();
        },
        open: function (e) {
            if (this.stateIsnt('open'))
                this.goTo('open');
        },
        close: function () {
            if (this.stateIs('open'))
                this.reset();
        },
        renderContent: function () {
            this.loaded = true;
            app.dom.render(this.props.slide, this.popupEl);
            this.popupScript = app.slide.get(this.props.slide);
        },
        createContainer: function () {
            this.popupEl = document.createElement('DIV');
            this.popupEl.classList.add("ag-slide-popup");
            if (this.props.popupClass)
                this.popupEl.classList.add(this.props.popupClass);
//      this.el.appendChild(this.popupEl);
//EDITED!!
            var slide = this.el.parentNode;
            slide.appendChild(this.popupEl);
        },
        setTrigger: function () {
            if (this.props.trigger) {
                var parts = this.props.trigger.split(' ');
                var e = parts[0];
                var selector = parts[1] || null;
                if (selector) {
                    this.parent.delegate(e, selector, this.open.bind(this));
                }
                else {
                    this.delegate(e, this.open.bind(this));
                }
            }
        },
        addCloseBtn: function () {
            if (!this.props.noCloseBtn) {
//        var el = app.dom.parse('<div class="close-popup-btn">[ X ]</div>');
                var el = app.dom.parse('<div class="close-popup-btn"></div>');
                this.popupEl.appendChild(el);
            }
        }
    }
});