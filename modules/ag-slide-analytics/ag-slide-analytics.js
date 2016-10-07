app.register('ag-slide-analytics', function() {

  /**
   * Agnitio Slide Analytics Module
   *
   * This module will save data about
   * the slides visited.
   *
   * Usage:
   * Include <div data-modules="ag-slide-analytics"></div>
   * in index.html. See docs for more info.
   */

  var self;
  return {
    template: false,
    // The interface to this module
    publish: {
      debug: false,
      map: "", // Provide the namespace for map, e.g. "monitorMap" => window.monitorMap
      offset: 0, // e.g. if 1: default/safety/study => safety/study
      skip: ""
    },
    onRender: function(el) {
      self = this;
      app.listenTo(app.slide, 'slide:enter', this.save.bind(this));
      if (this.props.debug) ag.debug(true);
    },
    /**
     * Assign correct id or name
     * Get correct id and name for chapter, subchapter and slide
     * Lookup order:
     * 1. map[id]
     * 2. app.json[type]['name']
     * 3. id
     * @private
     * @param id STRING Id of structure to find label for
     * @param itemType STRING One of 'slide', 'chapter', or 'slideshow'
     */
    assignValues: function(id, itemType) {
      var val;
      var data;
      var name;

      if (itemType === 'slide') {
        data = app.model.getSlide(id);
      }
      else if (itemType === 'chapter') {
        data = app.model.getStructure(id);
      }
      if (itemType === 'slideshow') {
        data = app.model.getStoryboard(id);
      }

      if (data) {
        // If specific id and name has been specified
        // for monitoring in presentation.json
        if (data.monitoring) {
          id = data.monitoring.id || id;
          name = data.monitoring.name || data.name;
        }
        else if (this.map && this.map[id]) {
          id = this.map[id].id || id;
          name = this.map[id].name || data.name;
        }
        else {
          name = data.name;
        }
        return {id: id, name: name};
      }
      return {id: id, name: null};
    },
    save: function(data) {
      var id = data.id;
      var path = app.getPath();
      var index = app.slideshow.getIndex();
      var slideIndex = index.v ? index.v : index.h;
      var components = app.slideshow.resolve();
      var subChapterId = components.chapter || null;
      var chapterId = components.slideshow || null;
      var chapter = {id: null, name: null};
      var subChapter = {id: null, name: null};
      var slide = this.assignValues(id, 'slide');
      
      if (subChapterId) subChapter = this.assignValues(subChapterId, 'chapter');
      if (chapterId) chapter = this.assignValues(chapterId, 'slideshow');

      // Slide id and name are required
      if (!slide.name) {
        if (console.error) console.error('Slide will not be monitored! Name must be specified for "' + data.id + '"');
        return;
      }

      if (window.ag) {
        ag.submit.slide({
          id: slide.id,
          name: slide.name,
          path: path,
          slideIndex: slideIndex,
          chapter: chapter.name,
          chapterId: chapter.id,
          subChapter: subChapter.name,
          subChapterId: subChapter.id
        })
      }
    }
  }
});