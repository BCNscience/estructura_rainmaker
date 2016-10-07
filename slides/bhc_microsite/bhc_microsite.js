app.register("bhc_microsite", function() {
  return {
    events: {
      "tap .thumb": "gotoSlide"
    },
    states: [],
    onRender: function(el) {
      var self = this;
      var provided;
      this.wrapper = this.el.querySelector('.slide-container');
      var defaultContent = ["test_slide_1", "test_slide_2", "test_slide_3"];
      if (window.ag) {
        // Allow some time for message to come from server
        // Will work even if the timeout is too short, but
        // there might be a slight flash of content
        setTimeout(function() {
          provided = ag.content.get(); // If server/content is setup
          if (provided.topics && provided.topics.length) {
            self.buildThumbs(provided.topics);
            self.createStoryboard(provided.topics);
            console.log('Build content from topics');
          }
          else {
            // This is a demo fallback. Can be replaced with error message
            // or other default content
            self.buildThumbs(defaultContent);
            console.log('Build content from defaults. No topics provided');
          }
          // If server/content setup happens after timeout
          ag.on('contentData', function(data) {
            if (!data.topics || !data.topics.length) data.topics = defaultContent;
            self.buildThumbs(data.topics);
            self.createStoryboard(data.topics);
            console.log('Update content from provided data');
          });
        },300);
      }
      else {
        this.buildThumbs(defaultContent);
        console.log('Build content from defaults. API not available.');
      }

    },
    onEnter: function(el) {
      app.$.toolbar.setMicrosite();

    },
    onExit: function(el) {

    },
    gotoSlide: function(event) {
      var thumb = event.target;
      var slide = thumb.getAttribute('data-slide-id');
      if (slide) {
        app.slideshow.goTo(slide);
      }
    },
    createStoryboard: function(topics) {
      var content = ['bhc_microsite'];
      content = content.concat(topics);
      if(app.model.hasStoryboard("bhc_custom"))
        app.model.deleteStoryboard("bhc_custom");

      app.model.addStoryboard("bhc_custom", {
        "name": "Personalized BHC",
        "content": content,
        "type":"microsite"
      });
      app.slideshow.load('bhc_custom');
    },
    buildThumbs: function(content){
      var self = this;
      self.wrapper.innerHTML = "";
      content.forEach(function(item) {
        var info = app.model.getItem(item);
        var thumb = document.createElement("div"),
            thumbText = document.createElement("p");
        if (info) {
          thumb.setAttribute('data-slide-id', item);
          thumb.classList.add('thumb');
          thumbText.innerHTML = info.name;
          thumbText.classList.add('thumb-text');

          thumb.appendChild(thumbText);
          self.wrapper.appendChild(thumb);
        }
      });
    }
  }
});