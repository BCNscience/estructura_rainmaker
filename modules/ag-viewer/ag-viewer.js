/* global app */
/* global ag */
app.register("ag-viewer", function() {

  /**
   * Agnitio Viewer Module
   *
   * This module will open URLs or PDF documents
   * in iFrame on top of presentation.
   *
   * Usage:
   * - Call ag.openPDF in non-agnitio app or on the web
   * - Call ag.openURL in non-agnitio app or on the web
   * - Add 'data-viewer="browser"' to a link (<a>)
   */

  return {
    template: false,
    publish: {
        
    },
    events: {
      "tap .close": "closeViewer"
    },
    states: [],
    onRender: function(el) {

        // app.on('ready', this.init.bind(this));

        this.frame = null;
        this.content = [];
        this.inDevice = true;

        var info = ag.platform.info();

        // If non-Engager, let's open PDFs in viewer
        if (!info || (info.localizedModel !== "iPad" && info.platform !== "Windows")) {
            this.inDevice = false;
            ag.on('openPDF', this.openContent.bind(this));
        }
        ag.on('openURL', this.openContent.bind(this));
        ag.on('openSlide', this.openSlide.bind(this));

        document.addEventListener('click', this.handleClick.bind(this));
      
    },
    onRemove: function(el) {
        this._removeElement(); // Will undelegate events
    },
    handleClick: function(event) {
        var el = event.target;
        var attr = el.getAttribute('data-viewer') || el.hasAttribute('data-viewer');
        var href = el.getAttribute('href') || attr;
        if (attr) {
            event.preventDefault();
            event.stopPropagation();
            if (attr === "slide") {
                if (!href) return;
                ag.publish('openSlide', {slide: href});
            }
            else if (href) {
                if (/.pdf/.test(href)) {
                    ag.openPDF(href);
                }
                else if (ag.openURL && typeof href === 'string') {
                    ag.openURL(href);
                }
            }
        }
    },
    openLink: function(link) {
      var href = link.getAttribute('href');
      if (ag.openURL) ag.openURL(href);
    },
    closeViewer: function() {
        app.unlock();
        var last = this.content.length - 1;
        var view = this.content[last];
        if (view.slide) {
            app.slide.remove(view.slide, true);
        }
        view.container.classList.remove('loaded');
        view.container.classList.remove('visible');
        this.el.removeChild(view.container);
        this.frame = null;
        view.container = null;
        this.content.pop();
    },
    openContent: function(path) {
        var view = {};
        var markup = [
            '<header>',
                '<a class="close" href="#"><span class="icon"></span></a>',
            '</header>',
            '<div class="spinner"></div>',
            '<div class="viewport">',
                '<iframe src="'+ path +'"></iframe>',
            '</div>'
        ];
        if (!this.inDevice) markup.splice(2, 0, '<a class="external" href="'+ path +'" target="_blank"><span class="icon"></span></a>');
        view.container = document.createElement('div');
        view.container.classList.add('preview-link-overlay');
        this.el.appendChild(view.container);
        view.container.innerHTML = markup.join('');
        this.frame = this.el.querySelector('iframe');
        this.frame.addEventListener('load', this.load.bind(this));
        this.content.push(view);
        setTimeout(function() {
            view.container.classList.add('visible');
        },1);
        app.lock();
    },
    openSlide: function(data) {
        var viewer = document.createElement('div');
        var view = {};
        viewer.classList.add('viewport');
        // Need to remove slide if already loaded in presentation
        app.slide.remove(data.slide, true);
        view.slide = data.slide;
        view.container = document.createElement('div');
        view.container.classList.add('preview-link-overlay');
        this.el.appendChild(view.container);
        view.container.innerHTML = [
            '<header>',
                '<a class="close" href="#"><span class="icon"></span></a>',
            '</header>',
            '<div class="spinner"></div>'
        ].join('');
        app.dom.insert([{id: data.slide}], false, viewer);
        view.container.appendChild(viewer);
        this.content.push(view);
        setTimeout(function() {
            view.container.classList.add('visible');
            view.container.classList.add('loaded');
        },1);
        app.lock();
    },
    load: function() {
        var last = this.content.length - 1;
        this.content[last].container.classList.add('loaded');
        this.frame.removeEventListener('load', this.load.bind(this));
    }
  }

});