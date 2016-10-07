/**
 * === CLASS SlideList ===
 *
 * A class that will keep track and manipulate a 
 * (nested) list of slide ids.
 *
 */

function SlideList(list) {
  var list = list || [];
  this.init(list);
}

SlideList.prototype.init = function (list) {
  this.list = list;
  this.current = {h:0, v:0};
}

// Total number of items in list (length of flattended array)
SlideList.prototype.size = function() {
  var flat = [];
  flat = flat.concat.apply(flat, this.list);
  return flat.length;
}

/**
  * Retrieves the list item at provided index. Falls back to
  * providing current item if no index provided
  *
  * @param {Number} h If specified, the returned
  * list item will be for this horizontal index
  * rather than the current one
  *
  * @param {Number} v If specified, the returned
  * list item will be for this vertical index
  * rather than the current one
  *
  * @return {String} list item
  */
SlideList.prototype.get = function (h, v) {
  var itemType;
  // Use current if no index provided
  if (h === undefined) {
    h = this.current.h;
    v = this.current.v;
  }
  v = v || 0;
  itemType = this.getType(h);
  if (itemType) {
    if (itemType === 'list') {
      return this.list[h][v];
    }
    // If v is not 0 or undefined
    else if (!v) {
      return this.list[h];
    }
  }
  return undefined;
}

SlideList.prototype.getIndex = function (item) {
  var h = this.list.indexOf(item);
  var index;
  if (item) {
    if (h > -1) {
      return {h: h, v: 0}
    }
    // Need to look in nested lists
    else {
      // TODO: improve loop so that we stop when we find it
      this.list.forEach(function(list, i) {
        if (typeof list !== 'string') {
          h = list.indexOf(item);
          if (h > -1) {
            index = {h: i, v: h}
          }
        }
      });
      return index;
    }
  }
  else {
    return this.current;
  }
  return undefined;
}

// An item in the list can be either "item" or "list"
SlideList.prototype.getType = function(h) {
  // In range?
  if (h > -1 && h < this.list.length) {
    // TODO: improve type check
    if (typeof this.list[h] === 'string') {
      return "item";
    }
    else {
      return "list";
    }
  }
  return undefined;
}

// Check if there is an item at the provided indices
SlideList.prototype.inRange = function (h) {
  if (h > -1 && h < this.list.length) {
    return true;
  }
  return false;
}

// Compare two indices to see if they are equal
// TODO: make into class method
SlideList.prototype.isEqual = function (i1, i2) {
  if (JSON.stringify(i1) === JSON.stringify(i2)) {
    return true;
  }
  return false;
}

SlideList.prototype._set = function(index) {
  var previous = this.current;
  // Setting by name
  // if (typeof index === 'string') {
  //   index = getIndex(index);
  // }
  // if (index > -1 && index < list.length) {
    this.current = index;
  // }
  //
}


SlideList.prototype.getList = function () {
  return this.list;
 }

SlideList.prototype.setList = function(arr) {
  var currentId = this.get();
  var newIndex;
  this.list = arr;
  newIndex = this.getIndex(currentId);
  if (!this.inRange(this.current.h) || !newIndex) {
    this._set({h:0, v:0});
  }
  else {
    this._set(newIndex);
  }
};

// TODO: properly handle non-existing strings
SlideList.prototype.goTo = function(index) {
  var index = index || {h:0, v:0};
  // Setting by name
  if (typeof index === 'string') {
    index = this.getIndex(index);
  }
  index.h = index.h || 0;
  index.v = index.v || 0;
  if (this.get(index.h, index.v)) {
    this._set(index);
  }
}

// Should only move horizontally
SlideList.prototype.left = function() {
   var index = {h: this.current.h - 1, v: 0};
   if (this.get(index.h)) {
     this._set(index);
   }
 };

// Should only move horizontally
SlideList.prototype.right = function () {
  var index = {h: this.current.h + 1, v: 0};
  if (this.get(index.h)) {
    this._set(index);
  }
};

// Should only move vertically
SlideList.prototype.down = function() {
 var index = {h: this.current.h, v: this.current.v + 1};
 if (this.get(index.h, index.v)) {
   this._set(index);
 }
};

// Should only move vertically
SlideList.prototype.up = function() {
 var index = {h: this.current.h, v: this.current.v - 1};
 if (this.get(index.h, index.v)) {
   this._set(index);
 }
};

SlideList.prototype.getUp = function() {
  var upIndex = {h: this.current.h, v: this.current.v - 1};
  var itemAbove = this.get(upIndex.h, upIndex.v);
  if (itemAbove) {
    return upIndex;
  }
  return undefined;
}
SlideList.prototype.getDown = function() {
  var downIndex = {h: this.current.h, v: this.current.v + 1};
  var itemBelow = this.get(downIndex.h, downIndex.v);
  if (itemBelow) {
    return downIndex;
  }
  return undefined;
}
SlideList.prototype.getRight = function() {
  var rightIndex = {h: this.current.h + 1, v: 0};
  var itemRight = this.get(rightIndex.h, 0);
  if (itemRight) {
    return rightIndex;
  }
  return undefined;
}
SlideList.prototype.getLeft = function() {
  var leftIndex = {h: this.current.h - 1, v: 0};
  var itemLeft = this.get(leftIndex.h, 0);
  if (itemLeft) {
    return leftIndex;
  }
  return undefined;
}

// Return the ids of any available neighbor
// @return [leftId, upId, rightId, downId]
SlideList.prototype.getNeighbors = function(index) {
  var indices = [];
  // var index = index || this.getIndex();
  // ids[0] = this.get(index.h - 1, 0); // left
  // ids[1] = this.get(index.h, index.v - 1); // up
  // ids[2] = this.get(index.h + 1, 0); // right
  // ids[3] = this.get(index.h, index.v + 1); // down
  indices[0] = this.getLeft();
  indices[1] = this.getUp();
  indices[2] = this.getRight();
  indices[3] = this.getDown();
  return indices;
}

// Return the next item available (down or right)
SlideList.prototype.getNext = function() {
   // See if there is an item below to go to
   // else go to the next item to the right if available
   var downIndex = {h: this.current.h, v: this.current.v + 1};
   var rightIndex = {h: this.current.h + 1, v: 0};
   var itemBelow = this.get(downIndex.h, downIndex.v);
   var itemRight;
   if (itemBelow) {
     return downIndex;
   }
   else {
     itemRight = this.get(rightIndex.h, 0);
     if (itemRight) return rightIndex;
   }
   return undefined;
}

// Should move vertically if possible
SlideList.prototype.next = function() {
  var nextItem = this.getNext();
  if (nextItem) this._set(nextItem);
};

// Should move vertically if possible
SlideList.prototype.previous = function() {
  // See if there is an item above
  var upIndex = {h: this.current.h, v: this.current.v - 1};
  var leftIndex = {h: this.current.h - 1, v: 0};
  var itemAbove = this.get(upIndex.h, upIndex.v);
  var itemLeft, leftType;

  if (itemAbove) {
    this._set(upIndex);
  }
  else {
   // See if previous item is a list or a string
   leftType = this.getType(leftIndex.h);
   if (leftType === 'item') {
     this._set(leftIndex);
   }
   else if (leftType === 'list') {
     // Find last item in list
     leftIndex.v = this.list[leftIndex.h].length - 1;
     this._set(leftIndex);
   }
  }
};

SlideList.prototype.gotoFirst = function() {
  this._set({h:0, v:0});
};

// TODO: make this actually go to last if nested array
SlideList.prototype.gotoLast = function() {
  this._set({h:this.list.length - 1, v:0});
};

SlideList.prototype.append = function(item) {
  // var previous = list.slice();
  this.list.push(item);
};

SlideList.prototype.prepend = function(item) {
  // var previous = list.slice();
  this.list.unshift(item);
  this._set({h: this.current.h + 1, v: 0});
};

SlideList.prototype.insert = function(item, index) {
  // var previous = get(index.h, index.v);
  var prevType = this.getType(index.h);

  // if (prevType === 'item') {
    this.list.splice(index.h, 0, item);
    if (index.h <= this.current.h) this._set({h: this.current.h + 1, v: 0});
  // }
  // else if (prevType === 'list' && typeof item === 'string') {
  //   this.list[index.h].splice(index.v, 0, item);
  //   if (index.h === this.current.h && index.v <= this.current.v) {
  //     this._set({h: index.h, v: this.current.v + 1});
  //   }
  // }
};

SlideList.prototype.insertNested = function(item, index) {
  var prevType = this.getType(index.h);
  if (prevType === 'list' && typeof item === 'string') {
    this.list[index.h].splice(index.v, 0, item);
    if (index.h === this.current.h && index.v <= this.current.v) {
      this._set({h: index.h, v: this.current.v + 1});
    }
  }
};

SlideList.prototype.replace = function(index, item) {
  var previous;
  var prevType;

  if (typeof index === 'string') {
   previous = index;
   index = this.getIndex(index);
  }
  else {
   previous = this.get(index.h, index.v);
  }

  prevType = this.getType(index.h);

  if (prevType === 'list' && typeof item === 'string') {
   // Replace single item in nested list
   this.list[index.h].splice(index.v, 1, item);
  }
  else if (prevType === 'item' || prevType === 'list') {
   // Replace entire nested list or string item
   this.list.splice(index.h, 1, item);
  }
};

SlideList.prototype.remove = function(index) {
  var previous;
  var prevType;

  if (typeof index === 'string') {
   previous = index;
   index = this.getIndex(index);
  }
  else {
   previous = this.get(index.h, index.v);
  }

  prevType = this.getType(index.h);

  if (prevType === 'list' && index.v !== undefined) {
   // Replace single item in nested list
   this.list[index.h].splice(index.v, 1);
  }
  else if (prevType === 'item' || prevType === 'list') {
   // Replace entire nested list or string item
   this.list.splice(index.h, 1);
  }
};

SlideList.prototype.move = function(from, to) {
  var item, itemAtIndex, itemType, locationType;

  if (typeof from === 'string') {
    item = from;
    from = this.getIndex(from);
  }
  else {
    item = this.get(from.h, from.v);
  }

  if (typeof to === 'string') {
    itemAtIndex = to;
    to = this.getIndex(to);
  }
  else {
    itemAtIndex = this.get(to.h, to.v);
  }

  itemType = this.getType(from.h);
  locationType = this.getType(to.h);

  if (itemType === 'item' && locationType === 'item') {
    // Move single item to single item location
    if (from.h < to.h) to.h = to.h - 1; // Make sure location index is correct after removing item
    this.list.splice(from.h, 1);
    this.list.splice(to.h, 0, item);
  }
  else if (itemType === 'item' && locationType === 'list') {
   if (to.v !== undefined) {
     // Move single item into nested list
     if (from.h < to.h) to.h = to.h - 1; // Make sure location index is correct after removing item
     this.list.splice(from.h, 1);
     this.list[to.h].splice(to.v, 0, item);
   }
   else {
     // Move single item to nested list location
     if (from.h < to.h) to.h = to.h - 1; // Make sure location index is correct after removing item
     this.list.splice(from.h, 1);
     this.list.splice(to.h, 0, item);
   }
  }
  else if (itemType === 'list' && locationType === 'item') {
    if (from.v !== undefined) {
     // Move item in nested list to single item location
     // TODO: check if item is the only one in nested list, if so nested list should be removed
     this.list[from.h].splice(from.v, 1);
     this.list.splice(to.h, 0, item);
    }
    else {
     // Move nested list to single item location
     if (from.h < to.h) to.h = to.h - 1; // Make sure location index is correct after removing item
     this.list.splice(from.h, 1);
     this.list.splice(to.h, 0, item);
    }
  }
  else if (itemType === 'list' && locationType === 'list') {
    if (to.v !== undefined && from.v !== undefined) {
     // Move item in nested list into a nested list
     // TODO: check if item is the only one in nested list, if so nested list should be removed
     if (from.h === to.h && from.v < to.v) to.v = to.v - 1;
     this.list[from.h].splice(from.v, 1);
     this.list[to.h].splice(to.v, 0, item);
    }
    else if (to.v === undefined && from.v === undefined) {
     // Move nested list to nested list location
     if (from.h < to.h) to.h = to.h - 1; // Make sure location index is correct after removing item
     this.list.splice(from.h, 1);
     this.list.splice(to.h, 0, item);
    }
    else if (to.v === undefined && from.v !== undefined) {
     // Move item in nested list to nested list location
     // TODO: check if item is the only one in nested list, if so nested list should be removed
     this.list[from.h].splice(from.v, 1);
     this.list.splice(to.h, 0, item);
    }
  }
};
/***********************************************************
*
* The application model API
*
***********************************************************/ 
app.model = (function() {

  var model = {
    slides: {},
    modules: {},
    structures: {},
    storyboard: [],
    storyboards: {}
  };

  function fetch(path, next) {
    var cached = app.cache.get(path);
    next = next || function() {};
    if (cached) {
      set(JSON.parse(cached));
      next();
    }
    else {
      app.util.getFile(path, function(err, data) {
        if (!err) {
          set(JSON.parse(data));
          next();
        }
        else {
          throw new Error("Unable to fetch model " + path, err);
        }
      });
    }
  }

  function save(storage) {
    storage = storage || 'local'; // Default to save to browser storage
    app.model.trigger('save', {model: model, storage: storage});
  }

  function set(obj) {
    if (obj.slides && obj.structures && obj.storyboard) {
      model = obj;
      app.model.trigger('set:model');
    }
    else {
      throw new Error("Presentation model is incorrectly formatted");
    }
  }

  /**
   * @api app.model.get() Get model
   *
   * @apiDescription
   * Get the presentation model
   *
   * @apiName get
   * @apiGroup Model
   *
   * @apiExample Example:
   * app.model.get();
   */
  function get() {
    return model;
  }

  /**
   * @api app.model.getSlide(id) Get slide model data
   *
   * @apiDescription
   * Get slide model data
   *
   * @apiName getSlide
   * @apiGroup Model
   *
   * @apiParam {String} id Id of slide
   *
   * @apiExample Example:
   * var slideModel = app.model.getSlide('efficacy_study');
   */
  function getSlide(id) {
    if (model.slides[id]) return model.slides[id];
    return false;
  }

  function getModule(id) {
    if (model.modules[id]) return model.modules[id];
    return false;
  }

  /**
   * @api app.model.getView(id) Get slide or module data
   *
   * @apiDescription
   * Get slide or module data
   *
   * @apiName getView
   * @apiGroup Model
   *
   * @apiParam {String} id Id of slide or module
   *
   * @apiExample Example:
   * var viewModel = app.model.getView('efficacy-slider');
   */
  function getView(id) {
    if (model.slides[id]) return model.slides[id];
    if (model.modules[id]) return model.modules[id];
    return false;
  }

  /**
   * @api app.model.getItem(id) Get data for an item in model
   *
   * @apiDescription
   * Get data for an item in model. Resolve in following order:
   * - slide
   * - module
   * - structures
   * - storyboards
   *
   * @apiName getItem
   * @apiGroup Model
   *
   * @apiParam {String} id Id of item
   *
   * @apiExample Example:
   * var item = app.model.getItem('efficacy');
   */
  function getItem(id) {
    if (model.slides[id]) return model.slides[id];
    if (model.modules[id]) return model.modules[id];
    if (model.structures[id]) return model.structures[id];
    if (model.storyboards[id]) return model.storyboards[id];
    return false;
  }

  /**
   * @api app.model.getStructure(id) Get structure data
   *
   * @apiDescription
   * Get structure (chapter) data
   *
   * @apiName getStructure
   * @apiGroup Model
   *
   * @apiParam {String} id Id of structure
   *
   * @apiExample Example:
   * var structure = app.model.getStructure('efficacy');
   */
  function getStructure(id) {
    if (model.structures[id]) return model.structures[id];
    return false;
  }

  /**
   * @api app.model.getStoryboard(id) Get storyboard data
   *
   * @apiDescription
   * Get storyboard data
   *
   * @apiName getStoryboard
   * @apiGroup Model
   *
   * @apiParam {String} id Id of storyboard
   *
   * @apiExample Example:
   * var storyboard = app.model.getStoryboard('zanadryl');
   */
  function getStoryboard(id) {
    if (!id && model.storyboard) return model.storyboard;
    if (model.storyboards && model.storyboards[id]) return model.storyboards[id];
    return false;
  }

  function getSlidePosition(structureId, id) {
    if (!structureId) return false;
    var structure = getStructure(structureId) || getStoryboard(structureId);
    if (structure) {
      return structure.content.indexOf(id);
    }
  }

  function exist(id) {
    if (model.slides[id] || model.structures[id] || model.modules[id] || model.storyboards[id]) return true;
    return false;
  }

  function hasSlide(id) {
    if (model.slides[id]) return true;
    return false;
  }

  function hasStructure(id) {
    if (model.structures[id]) return true;
    return false;
  }

  function hasStoryboard(id) {
    if (model.storyboards[id]) return true;
    return false;
  }

  function isLinear(id) {
    if (model.storyboards[id] && model.storyboards[id].linear) return true;
    return false;
  }

  function setLinear(id, linear) {
    if (model.storyboards[id]) model.storyboards[id].linear = linear;
  }

  function isShareable(id) {
    var item = getItem(id);
    if (item.shareable) return true;
    return false;
  }

  function setShareable(id) {
    var item;
    if (model.slides[id]) { item = model.slides[id]; }
    else if (model.structures[id]) { item = model.structures[id]; }
    else if (model.storyboards[id]) { item = model.storyboards[id]; }
    if (!item.shareable) item.shareable = {};
  }

  function removeShareable(id) {
    var item;
    if (model.slides[id]) { item = model.slides[id]; }
    else if (model.structures[id]) { item = model.structures[id]; }
    else if (model.storyboards[id]) { item = model.storyboards[id]; }
    if (item.shareable) delete item.shareable;
  }

  function addSlide(id, data) {
    if (!hasSlide(id)) {
      model.slides[id] = data;
      // this.trigger('add:slide', {id: id, data: data});
    }
  }

  function addStructure(id, data) {
    if (!data.name || !data.content) throw new Error('Name and content must be specified when adding structure');
    if (!hasStructure(id)) {
      model.structures[id] = data;
      // this.trigger('add:structure', {id: id, data: data});
    }
  }

  function addStoryboard(id, data) {
    if (!data.name || !data.content) throw new Error('Name and content must be specified when adding storyboard');
    if (!hasStoryboard(id)) {
      model.storyboards[id] = data;
      // this.trigger('add:structure', {id: id, data: data});
    }
  }

  function deleteSlide(id) {}

  function deleteStructure(id) {}

  function deleteStoryboard(id) {
    if (hasStoryboard(id)) {
      delete model.storyboards[id];
    }
  }

  function insertSlide(id, slide, index) {
    var structure = getStoryboard(id) || getStructure(id);
    addSlide(slide.id, slide);
    if (structure) {
      structure.content.splice(index, 0, slide.id);
    }
  }

  function insertNested(id, slide, index, list) {
    var sb = getStoryboard(id);
    addSlide(slide.id, slide); 
    if (sb) {
      sb.content.splice(index, 1, list);
    }
  }

  // Remove slide from a storyboard or structure
  function removeSlide(id, slideId, index) {
    var structure = getStoryboard(id) || getStructure(id);
    var content;
    if (structure) {
      content = structure.content;
      if (typeof content[index.h] === 'string') {
        if (hasStructure(content[index.h])) {
          structure = getStructure(content[index.h]);
          structure.content.splice(index.v, 1);
        }
        else {
          content.splice(index.h, 1);
        }
      }
      else {
        content = content[index.h];
        content.splice(index.v, 1);
      }
    }
  }

  // Update some property of an item
  function update(id, prop, val) {
    var item = getItem(id);
    if (item && item[prop]) {
      item[prop] = val;
    }
  }

  // Update a storyboard or structure with new content
  function updateContent(id, content) {
    var structure = getStoryboard(id) || getStructure(id);
    if (structure && content) {
      structure.content = content;
      app.model.trigger('update:content', {id: id, content: content});
    }
  }


  return {
    save: save,
    set: set,
    get: get,
    getSlide: getSlide,
    getModule: getModule,
    getView: getView,
    getItem: getItem,
    getStructure: getStructure,
    getStoryboard: getStoryboard,
    getSlidePosition: getSlidePosition,
    fetch: fetch,
    exist: exist,
    hasSlide: hasSlide,
    hasStructure: hasStructure,
    hasStoryboard: hasStoryboard,
    isLinear: isLinear,
    setLinear: setLinear,
    isShareable: isShareable,
    setShareable: setShareable,
    removeShareable: removeShareable,
    addSlide: addSlide,
    addStructure: addStructure,
    addStoryboard: addStoryboard,
    insertSlide: insertSlide,
    insertNested: insertNested,
    removeSlide: removeSlide,
    update: update,
    updateContent: updateContent,
    deleteStoryboard: deleteStoryboard
  }

}());

app.util.extend(app.model, app.events);
/***********************************************************
  *
  * Handling lists of views (slideshows)
  * It is an API wrapper for class SlideList
  *
  ***********************************************************/
  // Will trigger following events:
  // 'load', 'update:current', 'update:list'
  app.slideshow = (function(model) {

    if (!model) throw new Error("app.model module is required for app.slideshow");

    // Object with initialized lists
    // { id: new SlideList(list) }
    var lists = {};
    var current = ""; // Id of current list
    var __chapterMap__ = {};
    var publicLoad, __load__;

    // Updating content of storyboards and structures should update slideshow list
    app.listenTo(app.model, 'update:content', updateList );

    app.on('enter:element', loadNeighbors);

    function updateChapterMap(id) {
      var sb = model.getStoryboard(id);
      var slides = sb.content || [];
      if (slides.length) {
        __chapterMap__[id] = {};
        slides.forEach(function(slide, i) {
            if (model.hasStructure(slide)) {
                if (!model.hasSlide(slide)) { // If same id is used then slideId is used
                  __chapterMap__[id][i] = slide; // So that we can find structure in model
                }
            }
        });
      }
    }

    // Create new slideshow instance
    /**
     * @api app.slideshow.initialize(id) Initialize a slideshow
     *
     * @apiDescription
     * Will register a slideshow so that it can be used in the presentation.
     * This is normally not called manually but will be called first time a slideshow is loaded. 
     * Creates the SlideList class that keeps track of indexes etc.
     *
     * @apiName initialize
     * @apiGroup Slideshow
     *
     * @apiParam {String} id Id of slideshow to initialize. Should be available in the model as a storyboard.
     *
     * @apiExample Example:
     * app.slideshow.initialize('placebo');
     */
    function initialize(id, data) {
      data = data || model.getStoryboard(id);
      var content = data.content || [];
      var slides = content.slice(0);
      __chapterMap__[id] = {};

      if (data) {
        // Check if any references are to other structures (nested with named chapters)
        // If so then create plain nested list to send to SlideList
        // __chapterMap__ is used to keep track of chapters
        slides.forEach(function(slide, i) {
            if (model.hasStructure(slide)) {
                if (!model.hasSlide(slide)) { // If same id is used then slideId is used
                    slides.splice(i, 1, model.getStructure(slide).content.slice(0));
                    __chapterMap__[id][i] = slide; // So that we can find structure in model
                  // }
                }
            }
        });
        lists[id] = new SlideList(slides);
      }
      // If opening a single slide
      else {
        data = model.getItem(id);
        if (data) {
          if (data.content) {
            lists[id] = new SlideList(data.content);
          }
          else {
            // Single item
            lists[id] = new SlideList([id]);
          }
        }
        else {
          throw new Error('Not able to find content with id "' + id + '"');
        }
      }
      if (lists[id]) return lists[id];
    }

    /**
     * @api app.slideshow.load(path) Load a slideshow
     *
     * @apiDescription
     * Will load a slideshow if available in presentation model. 
     * If no slide parameter is provided the first slide will be loaded.
     *
     * @apiName load
     * @apiGroup Slideshow
     *
     * @apiParam {String} path Path to slideshow/chapter/slide to load.
     *
     * @apiExample Example:
     * app.slideshow.load('placebo/quality_of_life');
     */
    function load(path) {
      var prevSlide = {};
      var currentSlide = {};
      var resolvedPath = resolvePath(path);
      var id = resolvedPath.slideshow;
      var chapter = resolvedPath.chapter;
      var slide = resolvedPath.slide;
      var index = {h:0, v:0};
      var newStructure = false;

      if (id !== current) {
        newStructure = true; // We will trigger content load event
        app.slideshow.trigger('unload', {id: current});
      }

      // Are we going from one slideshow to another?
      if (current) {
        // Get info about current slide before loading new
        prevSlide = {
          index: getIndex(),
          id: get(),
          classes: ["present", "past"]
        }
      }

      if (!lists[id]) initialize(id);

      if (lists[id]) {

        current = id;

        if (slide && !chapter) {
          index = getIndex(slide);
        }
        else if (chapter && !slide) {
          index.h = getChapterPosition(chapter, id);
        }
        else if (chapter && slide) {
          if (model.isLinear(id)) {
            index = getIndex(slide);
          }
          else {
            index.h = getChapterPosition(chapter, id);
            index.v = model.getSlidePosition(chapter, slide);
            index.v = index.v > -1 ? index.v : 0;
          }
        }

        lists[id].goTo(index);

        currentSlide = {
          index: getIndex(),
          id: get(),
          classes: ["past future", "present"]
        }

        if (newStructure) app.slideshow.trigger('load', {id: id});
        // Telling the world that we have updated position
        app.slideshow.trigger('update:current', {
          current: currentSlide,
          prev: prevSlide
        });
      }
    }

    // Setting up load so that it can be publically removed.
    // We do this when serving content to a remote contact
    function publicLoad(path) { load(path) };

    /**
     * @api {get} app.slideshow.inspect(id) Get class instance
     *
     * @apiDescription
     * Will return the raw SlideList class instance for the specified slideshow. 
     * Normally only used for debugging.
     *
     * @apiName inspect
     * @apiGroup Slideshow Util
     *
     * @apiParam {String} [id=current] Slideshow unique ID.
     *
     * @apiExample Example:
     * var placeboList = app.slideshow.inspect('placebo');
     *
     * @apiSuccessExample Example of return:
     * SlideList {list: Array[9], current: {h:4, v:0}, init: function, size: function, get: function…}
     */
    function inspect(id) {
      var id = id || current;
      if (id) return lists[id];
      return undefined;
    }

    // data should include listId
    function updateList(data) {
      var currentIndex = getIndex();
      // Only if we have initialized the list
      if (lists[data.id]) {
        initialize(data.id); // Reinitalizing the slideshow
        getUpdates({h:0, v:0}, currentIndex);
        // lists[data.id].goTo(currentIndex);
      }
    }

    // Dynamically adding a new slide
    // TODO: Develop or remove
    function add(id, name, list) {
      if (!model.exist(id)) {
        model.add('structure', id, {name: name, content: list});
      }
    }

    /**
     * @api {get} app.slideshow.getId() Get id of current slideshow
     *
     * @apiDescription
     * Will return the id of the current slideshow.
     *
     * @apiName getId
     * @apiGroup Slideshow Info
     *
     * @apiExample Example:
     * var currentId = app.slideshow.getId();
     *
     * @apiSuccessExample Example of return:
     * "placebo"
     */
    function getId() {
      if (current) return current;
      return undefined;
    }

    /**
     * @api {get} app.slideshow.get(horizontalIndex,verticalIndex) Get id of slide
     *
     * @apiDescription
     * Will return the id of a slide in the current slideshow.
     *
     * @apiName get
     * @apiGroup Slideshow Info
     *
     * @apiParam {Number} [horizontalIndex=currentIndex.h] Horizontal index of slide.
     * @apiParam {Number} [verticalIndex=currentIndex.v] Vertical index of slide.
     *
     * @apiExample Examples:
     * var current = app.slideshow.get();
     * var rightSlideId = app.slideshow.get(currentIndex.h + 1);
     * var belowSlideId = app.slideshow.get(currentIndex.h, currentIndex.v + 1);
     *
     * @apiSuccessExample Example of return:
     * "quality_of_life"
     */
    function get(h, v) {
      if (current) return lists[current].get(h, v);
      return undefined;
    }

    /**
     * @api {get} app.slideshow.getIndex(id) Get index of slide
     *
     * @apiDescription
     * Will return the index of a slide in the current slideshow. 
     *
     * @apiName getIndex
     * @apiGroup Slideshow Info
     *
     * @apiParam {String} [id=currentId] Id of the slide.
     *
     * @apiExample Examples:
     * var currentIndex = app.slideshow.getIndex();
     * var qolIndex = app.slideshow.getIndex("quality_of_life");
     *
     * @apiSuccessExample Example of return:
     * {h:3, v:0}
     */
    function getIndex(id) {
      if (current) return lists[current].getIndex(id);
      return undefined;
    }

    // Horizontal length
    /**
     * @api {get} app.slideshow.getLength Get length of slideshow
     *
     * @apiDescription
     * Will return the horizontal length of current slideshow. 
     *
     * @apiName getLength
     * @apiGroup Slideshow Info
     *
     * @apiExample Examples:
     * var ssLength = app.slideshow.getLength();
     *
     * @apiSuccessExample Example of return:
     * 5
     */
    function getLength() {
      if (current) return lists[current].list.length;
      return undefined;
    }

    // Total number of slides
    /**
     * @api {get} app.slideshow.getSize Get number of slides
     *
     * @apiDescription
     * Will return the number of slides in current slideshow. 
     *
     * @apiName getSize
     * @apiGroup Slideshow Info
     *
     * @apiExample Examples:
     * var ssSize = app.slideshow.getSize();
     *
     * @apiSuccessExample Example of return:
     * 14
     */
    function getSize() {
      if (current) return lists[current].size();
      return undefined;
    }

    // Type of content at index
    // Possible returns: "item", or "list"
    // TODO: Document as public API
    function getType(index) {
      if (current) return lists[current].getType(index);
      return undefined;
    }

    // Comparing two indexes
    // @private
    function isEqual(i1, i2) {
      if (JSON.stringify(i1) === JSON.stringify(i2)) {
        return true;
      }
      return false;
    }

    // After updating, find what classes an affected slide should have 
    // @private
    function getSlideClasses(currentIndex, slideIndex, linear) {
      var classesToAdd = "";
      var classesToRemove = "";

      if (!linear) {
        // Add 'stack' class if it's a nested slide
        if (currentIndex.h === slideIndex.h && (currentIndex.v > 0 || slideIndex.v > 0)) {
            classesToAdd += 'stack';
        }
        // Remove 'stack' class when it's not current stack
        // else if (slideIndex.v === 0 || currentIndex.h !== slideIndex.h) {
        //     classesToRemove += 'stack';
        // }
      }

      // Are we updating the current slide?
      if (isEqual(slideIndex, currentIndex)) {
        classesToRemove += " past future archived";
        classesToAdd += " present";
      }
      else if (currentIndex.h < slideIndex.h) {
        classesToRemove += " past present stack archived";
        classesToAdd += " future";
      }
      else if (currentIndex.h === slideIndex.h && currentIndex.v < slideIndex.v) {
        classesToRemove += " past present archived";
        classesToAdd += " future";
      }
      // If h index is smaller, then class should be 'past'
      else {
        if (currentIndex.h === slideIndex.h) {
          classesToRemove += " past present archived";
          // classesToAdd += " future";
        }
        else {
          classesToRemove += " present future stack archived";
        }
        classesToAdd += " past";
      }

      return [classesToRemove, classesToAdd];
    }

    // Get info about all slides that need to be updated in view
    // @private
    function loadNeighbors(data) {
      var neighbors = lists[current].getNeighbors();
      var toUpdate = []; // Will hold info about all slides to update
      var currentIndex = app.slideshow.getIndex();
      var prevIndex = lists[current].getIndex(data.prevId);
      var isLinear = app.model.isLinear(current);

      // Make sure we moved
      // if (prevSlide && prevSlide.id === currentSlide.id && isEqual(prevSlide.index, currentSlide.index)) return;

      // toUpdate = [currentSlide];

      // if (prevSlide) {
      //   prevSlide.classes = prevSlide.classes || getSlideClasses(currentSlide.index, prevSlide.index, isLinear);
      //   toUpdate.unshift(prevSlide);
      //   prevIndex = prevSlide.index;
      // }

      // Update classes for neighboring slides
      neighbors.forEach(function(i) {
        var id, slide;
        if (i && !isEqual(prevIndex, i)) {
          id = lists[current].get(i.h, i.v);
          slide = {
            index: i,
            id: id,
            classes: getSlideClasses(currentIndex, i, isLinear)
          };
          // Make sure to not include present slide twice or more
          if (id !== data.id) toUpdate.push(slide);
        }
      });

      // Telling the world that we have updated position
      app.slideshow.trigger('load:neighbors', {
        updates: toUpdate
      });
    }

    // Update the rest of the application
    // @private
    function getUpdates(currentIndex, prevIndex) {
      var currentSlide, prevSlide;
      var isLinear = app.model.isLinear(current);

      // Packaging slide data for current and previous slides
      currentSlide = {
        index: currentIndex,
        id: lists[current].get(),
        classes: getSlideClasses(currentIndex, currentIndex, isLinear)
      }

      if (prevIndex) {
        prevSlide = {
          index: prevIndex,
          id: lists[current].get(prevIndex.h, prevIndex.v),
          classes: getSlideClasses(currentIndex, prevIndex, isLinear)
        }
      }

      // update(currentSlide, prevSlide);
      // Telling the world that we have updated position
      app.slideshow.trigger('update:current', {
        current: currentSlide,
        prev: prevSlide
      });

    }

    /**
     * @api {get} app.slideshow.getPath() Get path to current slide
     *
     * @apiDescription
     * Will return the path of the current slide.
     *
     * @apiName getPath
     * @apiGroup Slideshow Info
     *
     * @apiExample Example:
     * var path = app.slideshow.getPath();
     *
     * @apiSuccessExample Example of return:
     * "placebo/treatment_adherence/quality_of_life"
     */
    function getPath() {
      var path = current;
      var chapter = __chapterMap__[current][getIndex().h] || null;

      // If current index is a named chapter
      if (chapter) {
        path += "/" + chapter;
      }

      path += "/" + lists[current].get();

      return path;
    }

    // Proxy method for navigating in a slideshow
    // @private
    function navigate(method, params, slideshow) {
      var currentIndex, prevIndex;
      var slideshow = slideshow || current;
      var isLinear = app.model.isLinear(slideshow);
      if (!lists[slideshow]) throw new Error("Slideshow is not initialized. Use 'app.slideshow.init(id)' to initialize.");
      prevIndex = getIndex();
      if (isLinear) {
        if (method === 'right') method = 'next';
        if (method === 'left') method = 'previous';
      }
      lists[slideshow][method].apply(lists[slideshow], params);
      currentIndex = getIndex();
      getUpdates(currentIndex, prevIndex);
      // Haven't moved?
      if (lists[slideshow].isEqual.apply(lists[slideshow], [prevIndex, currentIndex])) {
        if (method === 'next' || method === 'right') app.slideshow.trigger('slideshow:end', {id: slideshow});
        if (method === 'down') app.slideshow.trigger('chapter:end', {id: slideshow});
        if (method === 'previous' || method === 'left') app.slideshow.trigger('slideshow:start', {id: slideshow});
        if (method === 'up') app.slideshow.trigger('chapter:start', {id: slideshow});
      }
      else {
        app.slideshow.trigger('navigate');
      }
    }

    // Get the array index of a chapter in a slideshow
    // @private
    function getChapterPosition(chapter, slideshow) {
      if (!chapter) return -1;
      var slideshow = slideshow || current;
      var index;
      var sb = model.getStoryboard(slideshow);
      if (!sb) return -1;
      return sb.content.indexOf(chapter);
    }

    /**
     * @api {get} app.slideshow.resolve(path) Get current ids
     *
     * @apiDescription
     * Will resolve slide path into components.
     *
     * @apiName resolve
     * @apiGroup Slideshow Info
     *
     * @apiParam {String} [path] Slide path, e.g. 'demo/safety/safety_study'.
     *
     * @apiExample Example:
     * var components = app.slideshow.resolve();
     *
     * @apiSuccessExample Example of return:
     * {slideshow: 'demo', chapter: 'safety', slide: 'safety_study'}
     */
    function resolvePath(path) {
      path = path || app.getPath();
      var parts = path.split('/');
      var slideshow, chapter, slide;
      if (parts[0] === '') parts.splice(0, 1); // Remove empty
      slideshow = parts[0];
      if (parts[2]) {
        chapter = parts[1];
        slide = parts[2];
      }
      // Do we have a chapter or slide?
      else if (parts[1]) {
        if ( model.hasStructure(parts[1]) && !model.hasSlide(parts[1]) ) {
          chapter = parts[1];
          slide = null;
        }
        else {
          chapter = null;
          slide = parts[1];
        }
      }
      else {
        chapter = null;
        slide = null;
      }
      return {
        slideshow: slideshow,
        chapter: chapter,
        slide: slide
      }
    }

    /**
     * @api {get} app.slideshow.pathExist(path) Check if path is valid
     *
     * @apiDescription
     * Will return true if path is valid, otherwise false.
     *
     * @apiName pathExist
     * @apiGroup Slideshow Info
     *
     * @apiParam {String} [path] Slide path, e.g. 'demo/safety/safety_study'.
     *
     * @apiExample Example:
     * if (app.slideshow.pathExist('demo/safety_study')) { ... }
     *
     * @apiSuccessExample Example of return:
     * true
     */
    function pathExist(path) {
      if (!path) return false;
      var exist = true;
      var parts = resolvePath(path);
      if (parts.slideshow) {
        if (!model.hasStoryboard(parts.slideshow)) exist = false;
      }
      else {
        exist = false;
      }
      if (parts.chapter && !model.hasStructure(parts.chapter)) exist = false;
      if (parts.slide && !model.hasSlide(parts.slide)) exist = false;
      return exist;
    }

    /**
     * @api app.slideshow.goTo(id,chapter,slideshow) Go to a slide
     *
     * @apiDescription
     * Will set current slide of specified slideshow. 
     * Specified slideshow need to have been initialized.
     *
     * @apiName goTo
     * @apiGroup Slideshow Navigation
     *
     * @apiParam {String} id Slide unique ID.
     * @apiParam {String} [chapter] Chapter unique ID.
     * @apiParam {String} [slideshow=current] Slideshow unique ID.
     *
     * @apiExample Example:
     * app.slideshow.goTo('quality_of_life', 'treatment_adherence');
     */
    function goTo(id, chapter, slideshow) {
      var slideshow = slideshow || current;
      var index = {h:0, v:0};
      var chapterPos, slidePos, structure;
      if (chapter) {
        chapterPos = getChapterPosition(chapter, slideshow);
        if (chapterPos < 0) return false; // Specified chapter not in slideshow
        index.h = chapterPos;
        slidePos = lists[slideshow].list[chapterPos].indexOf(id);
        if (slidePos < 0) return false; // Specified slide not in chapter
        index.v = slidePos;
      }
      else {
        slidePos = lists[slideshow].getIndex(id);
        if (slidePos) {
          index = slidePos;
        }
        else {
          // Perhaps we got a chapter and no slide
          chapterPos = getChapterPosition(id, slideshow);
          if (chapterPos < 0) return false;
          index.h = chapterPos;
        }
      }
      navigate('goTo', [index], slideshow);
      return true;
    }

    // Stepping through the presentation
    // @param dir - The direction to step [up, down, left, right]
    function step(dir, slideshow) {
      navigate(dir, [], slideshow);
    }

    // Convenience methods (makes nice API)
    /**
     * @api app.slideshow.next() Move to next slide
     *
     * @apiDescription
     * Will move to next slide which is either below or right of current slide. 
     *
     * @apiName next
     * @apiGroup Slideshow Navigation
     */
    function next() { step('next') }

    /**
     * @api app.slideshow.prev() Move to previous slide
     *
     * @apiDescription
     * Will move to previous slide which is either above or left of current slide. 
     *
     * @apiName prev
     * @apiGroup Slideshow Navigation
     */
    function prev() { step('previous') }

    /**
     * @api app.slideshow.left() Move left
     *
     * @apiDescription
     * Will move to previous slide which is left of current slide. 
     *
     * @apiName left
     * @apiGroup Slideshow Navigation
     */
    function left() { step('left') }

    /**
     * @api app.slideshow.right() Move right
     *
     * @apiDescription
     * Will move to next slide which is right of current slide. 
     *
     * @apiName right
     * @apiGroup Slideshow Navigation
     */
    function right() { step('right') }

    /**
     * @api app.slideshow.up() Move up
     *
     * @apiDescription
     * Will move to previous slide which is above current slide. 
     *
     * @apiName up
     * @apiGroup Slideshow Navigation
     */
    function up() { step('up') }

    /**
     * @api app.slideshow.down() Move down
     *
     * @apiDescription
     * Will move to next slide which is below current slide. 
     *
     * @apiName down
     * @apiGroup Slideshow Navigation
     */
    function down() { step('down') }

    function first() { step('gotoFirst') }
    function last() { step('gotoLast') }

    // Proxy method to SlideList
    // @private
    function proxy(method, params, slideshow) {
      var slideshow = slideshow || current;
      if (lists[slideshow]) {
        lists[slideshow][method].apply(lists[slideshow], params);
      }
    }

    // TODO: make these methods work if manipulating around the current slide (update)
    // TODO: Document them as public API
    function append(slide, slideshow) {
      proxy('append', [slide], slideshow);
    }

    function prepend(slide, slideshow) {
      proxy('prepend', [slide], slideshow);
    }

    function insert(slide, index, slideshow) {
      proxy('insert', [slide, index], slideshow);
    }

    function insertNested(slide, index, slideshow) {
      proxy('insertNested', [slide, index], slideshow);
    }

    function move(from, to, slideshow) {
      proxy('move', [from, to], slideshow);
    }

    // param slide can be id or index
    function replace(slide, replacement, slideshow) {
      proxy('replace', [slide, replacement], slideshow);
    }

    // param slide can be id or index
    function remove(slide, slideshow) {
      proxy('remove', [slide], slideshow);
      if (get()) {
        update({index: getIndex(), id:get(), classes: ["past future", "present"]});
      }
      else {
        prev();
      }
    }

    // Save list of slides to model
    function save(slideshow) {
      // Here we need to revert the unfolding done when initializing
      // var slideshow = slideshow || current;
      // var newList = [];
      // lists[slideshow].list.forEach(function(item, i) {

      // });
    }

    return {
      init: initialize,
      load: publicLoad,
      __load__: load,
      inspect: inspect,
      getId: getId,
      get: get,
      getIndex: getIndex,
      getPath: getPath,
      getLength: getLength,
      getSize: getSize,
      getType: getType,
      resolve: resolvePath,
      pathExist: pathExist,
      updateChapterMap: updateChapterMap,
      goTo: goTo,
      step: step,
      next: next,
      prev: prev,
      left: left,
      right: right,
      up: up,
      down: down,
      first: first,
      last: last,
      prepend: prepend,
      append: append,
      insert: insert,
      insertNested: insertNested,
      move: move,
      remove: remove,
      replace: replace
    }

  }(app.model));

app.util.extend(app.slideshow, app.events);
/***********************************************************
*
* Registrering and keeping track of elements in DOM
*
***********************************************************/

// Get a new element and related files
// Fetch both dependencies and HTML at the same time
// When both are done, continue with adding HTML to DOM

// In the HTML check for data-module attributes
// Only load files if either
// - config.lazy is true
// - data-module has script file assign but it's not registered

// For dependencies look in app.model.slides
// - Any dependency HTML we fetch should be stored in cache 
// - Insert dependency elements to slides before rendering

// - Fetch dependencies
// -- Any CSS and JS files
// -- Any declared modules
// - Fetch the HTML
// -- From cache
// -- From template string on script
// -- From folder using HTTP
// - Check for preprocessing
// -- Apply data to template
// - Create element
// - Check for postprocessing
// -- Apply modules

app.dom = (function(slideshow, config, util) {

  if (!slideshow || !config || !util) throw new Error("app.dom requires following modules to be loaded: app.slideshow, app.config, app.util");

  // Listening to update of current slide in slideshow
  // This is what triggers insert of new slides and updating classes
  app.listenTo(app.slideshow, 'update:current', function(data) {
    updateCurrent(data);
  });

  app.listenTo(app.slideshow, 'load:neighbors', function(data) {
    updateElements(data);
  });

  var elements = config.get('cachedElements'); // Elements retrieved during startup
  var fetched = {}; // Container used to look up if components/dependencies have already been retrieved
  var history = []; // List of slides loaded and entered
  var pathToSlides = config.get('pathToSlides'); // Defaults to 'slides/<id>/'
  var pathToModules = config.get('pathToModules'); // Defaults to 'modules/<id>/'
  var emptyEl = document.createElement('div');

  // Module states to handle loading files and resolving HTML
  var __loading__ = false;
  var __resolving__ = false;

  // Cache references to key DOM elements
  if (!elements) {
    elements = {};
    elements.theme = document.querySelector( '#theme' );
    elements.wrapper = document.querySelector( '.accelerator' );
    elements.slides = document.querySelector( '.accelerator .slides' );
  }

  var currentEl, prevEl, currentState;

  var activeTransitionListener = false;
  // Getting the property name for transform
  // This will be used to listen to transitionend events
  var transformPropertyName = (function () {
    var el = document.createElement('div');
    if (el.style.transform !== undefined) {
      return 'transform';
    } 
    else if (el.style.webkitTransform !== undefined) {
      return '-webkit-transform';
    }
    else if (el.style.MozTransform !== undefined) {
      return '-moz-transform';
    }
    else if (el.style.msTransform !== undefined) {
      return '-ms-transform';
    }
    else if (el.style.OTransform !== undefined) {
      return '-o-transform';
    }
    return 'transform';
  }());
  
  // Check if a template parser has been registered
  var templateParser = (function() {
    var parser = app.registry.get('templateParser');
    return parser; // return null if not registered
  }());

  /**
   * Create DOM element from HTML string
   * Domify: https://github.com/component/domify
   *
   * @param {String} path
   */

  var domify = (function() {

    var div = document.createElement('div');
    // Setup
    div.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
    // Make sure that link elements get serialized correctly by innerHTML
    // This requires a wrapper element in IE
    var innerHTMLBug = !div.getElementsByTagName('link').length;
    div = undefined;

    /**
     * Wrap map from jquery.
     */

    var map = {
      legend: [1, '<fieldset>', '</fieldset>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      // for script/link/style tags to work in IE6-8, you have to wrap
      // in a div with a non-whitespace character in front, ha!
      _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
    };

    map.td =
    map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

    map.option =
    map.optgroup = [1, '<select multiple="multiple">', '</select>'];

    map.thead =
    map.tbody =
    map.colgroup =
    map.caption =
    map.tfoot = [1, '<table>', '</table>'];

    map.text =
    map.circle =
    map.ellipse =
    map.line =
    map.path =
    map.polygon =
    map.polyline =
    map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

    /**
     * Parse `html` and return a DOM Node instance, which could be a TextNode,
     * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
     * instance, depending on the contents of the `html` string.
     *
     * @api app.dom.parse(html) Create element from string
     *
     * @apiDescription
     * Parse a string into a HTML element. 
     *
     * @apiName domParse
     * @apiGroup DOM
     *
     * @apiParam {String} html The HTML string to parse.
     *
     * @apiExample Example:
     * var el = app.dom.parse('<h1>A new element</h1>');
     *
     * @apiSuccessExample Example of return:
     * {DOM node}
     */

    function parse(html, doc) {
      if ('string' != typeof html) throw new TypeError('String expected');

      // default to the global `document` object
      if (!doc) doc = document;

      // tag name
      var m = /<([\w:]+)/.exec(html);
      if (!m) return doc.createTextNode(html);

      html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

      var tag = m[1];

      // body support
      if (tag == 'body') {
        var el = doc.createElement('html');
        el.innerHTML = html;
        return el.removeChild(el.lastChild);
      }

      // wrap map
      var wrap = map[tag] || map._default;
      var depth = wrap[0];
      var prefix = wrap[1];
      var suffix = wrap[2];
      var el = doc.createElement('div');
      el.innerHTML = prefix + html + suffix;
      while (depth--) el = el.lastChild;

      // one element
      if (el.firstChild == el.lastChild) {
        return el.removeChild(el.firstChild);
      }

      // several elements
      var fragment = doc.createDocumentFragment();
      while (el.firstChild) {
        fragment.appendChild(el.removeChild(el.firstChild));
      }

      return fragment;
    }

    return {
      parse: parse
    }

  }());

  /**
   * Get an element that we are keeping track of
   * 
   * @api {get} app.dom.get(id) Get an element
   *
   * @apiDescription
   * Get an element previously retrieved. 
   *
   * @apiName getDomElement
   * @apiGroup DOM
   *
   * @apiParam {String} id Id of the element to get.
   *
   * @apiExample Example:
   * var el = app.dom.get('quality_of_life');
   */
  function get(id) {
    if (id && elements[id]) {
      return elements[id];
    }
    else if(!id) {
      return elements;
    }
  }

  // Functions used for cleanup
  function getHistory() { return history };
  function setHistory(arr) { history = arr };

  // Get the classes to add and remove from a slide element
  // This takes existing non-related classes into account
  // Related classes are 'present', 'past', 'future', 'stack' 
  function addAndRemoveClasses(el, remove, add) {
    var classes;
    if (!el) return [];
    classes = el.className.split(' ');
    remove.forEach(function(className) {
      var i = classes.indexOf(className);
      if (i > -1) {
        classes.splice(i, 1);
      }
    });
    add.forEach(function(className) {
      var i = classes.indexOf(className);
      if (i === -1 && !!className) {
        classes.push(className);
      }
    });
    return classes;
  }

  // Entering a new slide. This triggers the slide script if there is one
  function enterCurrent() {
    var id = app.slideshow.get();
    currentEl = elements[id];
    var prevId = prevEl ? prevEl.id : null;
    history.push(id);
    app.dom.trigger('element:enter', {id: id, prevId: prevId});
    app.trigger('enter:element', {id: id, prevId: prevId});
  }

  // @event element:enter
  function endTransition(event) {
    if (event.propertyName === transformPropertyName) {
      currentEl.removeEventListener('transitionend', endTransition);
      enterCurrent();
    }
  }

  // Make sure we allow slide transition before running other scripts
  function transitionElements(id) {
    prevEl = currentEl || null;
    currentEl = elements[id];

    if (prevEl) {
      prevEl.removeEventListener('transitionend', endTransition);
    }

    if (currentEl) {
      currentEl.addEventListener('transitionend', endTransition);
    }
  }

  // Get a view element
  // Return a Promise as we might fetch template using HTTP
  // 1. Create from template string in JS
  // 2. See if string exist in app.cache
  // 3. Load template from files specified in presentation.json
  // 4. Try to load from default folder
  function getElement(data) {
    return new Promise(function(resolve, reject) {
      var id = data.id;
      var viewModel = data.model || {};
      var type = data.type || 'slide';
      var path = "";
      var el = null;
      var script = app.registry.get(id) || {};
      var linkTags;
      var scriptTags;
      var linksLn;
      var deps;
      var lazy = config.get('lazy');

      if (elements[data.id]) resolve(elements[data.id]);

      var createElement = function(str) {
        // Exit if we don't have HTML
        if (!str || str.trim().charAt(0) !== '<') resolve(null);
  	  	// Manipulate string if custom template parser exist
        if (app.lang) {
          var tPath = type === 'module' ? pathToModules : pathToSlides;
          tPath = tPath.replace('<id>', id) + 'translations/' + app.lang + ".json";
          var translation = app.cache.get(tPath);
          if (translation) str = app.template(str, JSON.parse(translation));
        } 
        else if (templateParser) {
          str = templateParser(str);
  	  	}
        el = domify.parse(str);
        el = el.querySelector('#' + id) || el;
        if (!el.tagName) { // It means we have doctype
          // TODO: register error - not able to get template
          console.error('Could not get template for ' + id);
          resolve(null);
        }
        else {
          if (translation) {
            translation = JSON.parse(translation);
            var tags = el.querySelectorAll('[data-ag-local]');
            app.util.toArray(tags).forEach(function(tag) {
              var attr = tag.getAttribute('data-ag-local');
              if (translation[attr]) tag.innerHTML = translation[attr]
            });
          }
          resolve(el);
        }
      };      

      // is the template defined in the script?
      if (script.hasOwnProperty('template')) {
        createElement(script.template);
      }
      else {

        if (script.hasOwnProperty('templateUrl')) {
          path = script.templateUrl;
        }
        else if (viewModel.files && viewModel.files.templates) {
          path = viewModel.files.templates[0];
        }

        // First we check if the template exist in the cache
        if (app.cache.exist(path)) {
          createElement(app.cache.get(path));
        }
        // lastly we try to load it using HTTP
        // TODO: if mode is builder, save result to cache
        else if (path) {
          util.getFile(path, function(err, result) {
            if (err || !result) {
              if (type === 'slide') {
                el = document.createElement('div');
                el.id = id;
                el.classList.add('slide');
                el.innerHTML = "<h2>Missing template: " + path + "</h2>";
              }
              resolve(el);
            }
            else {
              if (!lazy) {
                deps = getDependencies([{id: id}], true);
                if (deps.length) loadDependencies(deps).then(function() {
                  createElement(result);
                })
                else {
                  createElement(result);
                };
              }
              else {
                createElement(result);
              }
            }
          });
        }
        else {
          resolve(null);
        }

      }
      
    });
  }

  function loadDependencies(dependencies) {
    return new Promise(function(resolve, reject) {
      // Remove duplicates
      var deps = dependencies.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
      head.load(dependencies, function() {
        resolve();
      });
    });
  }

  // Get scripts and styles defined in model
  function getDependencies(views, lazy) {
    var allFiles = [];
    lazy = lazy || config.get('lazy');
    if (lazy) {
      views.forEach(function(view) {
        var id = view.id;
        // If view is module or partial we need to get the id from attribute
        if (view.getAttribute) id = view.getAttribute('data-module') || view.getAttribute('data-partial');
        if (!fetched[id]) {
          var data = app.model.getView(id) || null;
          var files = [];
          if (data) {
            // if (data.dependencies) allFiles.concat(getFiles(data.dependencies, "modules"));
            if (data.files) {
                data.files.styles = data.files.styles || [];
                data.files.scripts = data.files.scripts || [];
                files = files.concat(data.files.styles);
                files = files.concat(data.files.scripts);
            }
          }
          allFiles = allFiles.concat(files);
        }
      });
    }

    return allFiles;
  }

  // A promise as we might have to fetch content using HTTP
  // param view - the module container element
  function insertModuleElement(view) {
    return new Promise(function(resolve, reject) {
      var moduleId = view.getAttribute('data-module') || view.getAttribute('data-partial');
      var viewModel = app.model.getView(moduleId);
      var backupId = moduleId + '_' + new Date().getTime();
      var id = view.id || backupId;
      var type = view.hasAttribute('data-module') ? 'module' : 'slide';

      getElement({id: moduleId, model: viewModel, type: type}).then(function(el) {
        if (el) {
          if (el.id) el.removeAttribute('id');
          view.appendChild(el);
        }
        view.id = id;
        elements[id] = view;
        resolve({id: id, moduleId: moduleId, el: el});
      }, function(error) {
        // No element is fine, still resolve
        view.id = id;
        elements[id] = view;
        resolve({id: id, moduleId: moduleId, el: null});
      });
    });
  }

  function getModules(el) {
    var modules = Array.prototype.slice.call(el.querySelectorAll('[data-module]'));
    var partials = Array.prototype.slice.call(el.querySelectorAll('[data-partial]'));
    var inserts = modules.concat(partials);
    return inserts;
  }

  // TODO: make sure children are rendered before parents
  function resolveModules(el, parentId) {
    var modules = getModules(el);
    var dependencies;

    if (modules.length) {
      dependencies = getDependencies(modules);

      if (dependencies.length) {
        loadDependencies(dependencies).then(function() {
          modules.forEach(function(view) {
            insertModuleElement(view).then(function(result) {
              if (result.el) resolveModules(result.el, result.id);
              app.dom.trigger('new:elements', {views: [{id: result.id, scriptId: result.moduleId, parent: parentId, el: result.el}]});
            });
          });
        });
      }
      else {
        modules.forEach(function(view) {
          insertModuleElement(view).then(function(result) {
            if (result.el) resolveModules(result.el, result.id);
            app.dom.trigger('new:elements', {views: [{id: result.id, scriptId: result.moduleId, parent: parentId, el: result.el}]});
          });
        });
      }
      
    }
  }

  // Helper to manually render a slide previously loaded
  function render(id, container) {
    var el = get(id);
    container = container || elements.slides;
    if (!el) return;
    container.appendChild(el);
    app.dom.trigger('new:elements', {views: [{id: id}]});
  }

  // Remove DOM element
  // Normally called by API after cleanup of references
  function remove(id, parent) {
    parent = parent || elements.slides;
    var el = elements[id] || null;
    if (el) parent.removeChild(el);
    elements[id] = null;
    fetched[id] = false;
  }

  // Archive element for removal
  function archive(id) {
    if (elements[id]) {
      elements[id].classList.add('archived');
    }
  }

  // Load and insert a bunch of slides
  // @param slides - [{id: [slide id], classes: ["add", "remove"]}]
  function insert(slides, callEnter, container) {
    callEnter = callEnter || false;
    container = container || elements.slides;
    load(slides).then(function(data) {
      insertUpdate(data.elements, data.views, callEnter, container);
    });
  }

  // STEP 7 - Append the elements and create scripts
  function insertUpdate(fragment, views, callEnter, container) {
    container.appendChild(fragment);
    app.dom.trigger('new:elements', {views: views});
    if (callEnter) {
      setStateClass();
      // Need to let the slides render first
      setTimeout(function() {
        enterCurrent();
      },300); // Should improve this so that we call it as soon render is done
    }
  }

  function load(slides) {
    return new Promise(function(resolve, reject) {
      // Create document fragment to hold all new elements
      var fragment = document.createDocumentFragment();
      var count = 0;
      var ln = slides.length; // The number of slide templates to fetch
      var views = []; // If onRender is registered
      var dependencies = getDependencies(slides) || []; // Any dependencies that we need to load before inserting elements

      // Used to keep track how many templates we have loaded
      // We will render all templates at the same time
      var updateCount = function() {
        count += 1;
        if (count === ln) {
          if (dependencies.length) {
            // STEP 6 - Load all dependencies
            loadDependencies(dependencies).then(function() {
              // Now it's time to create the view scripts
              resolve({
                elements: fragment,
                views: views
              });
            })
          }
          else {
            resolve({
              elements: fragment,
              views: views
            });
          }
        }
      }

      // STEP 4 - Get module elements
      var fetchModules = function(el, parentId) {
        var modules = getModules(el);

        if (modules.length) {
          // We now have more templates we need to fetch before rendering
          ln += modules.length;
          
          dependencies = dependencies.concat(getDependencies(modules));

          modules.forEach(function(view) {
            insertModuleElement(view).then(function(result) {
              // STEP 5 - Get any nested module and partials
              if (result.el) resolveModules(result.el, result.id);
              views.push({id: result.id, scriptId: result.moduleId, parent: parentId});
              updateCount();
            }, function() {
              // Some modules don't have elements
              updateCount(); // Make sure to render
            });
          });
        }
      }

      // STEP 3 - Get slide elements
      // Get the slide elements and set classes
      slides.forEach(function(slide) {
        var slideModel = app.model.getSlide(slide.id);
        var classes = [];
        if (!fetched[slide.id]) {
          // A promise
          getElement({id: slide.id, model: slideModel, type: 'slide'}).then(function(el) {
            fetched[slide.id] = true;
            if (!el) return new Error('Not able to get element for ' + slide.id);
            if (slide.classes) {
              classes = addAndRemoveClasses(el, slide.classes[0].split(' '), slide.classes[1].split(' '));
              el.className = classes.join(' ');
            }
            elements[slide.id] = el;

            fetchModules(el, slide.id);
            
            fragment.appendChild(el);
            views.push({id: slide.id, parent: 'presentation'});
            updateCount();
          }, function(error) {
            fetched[slide.id] = true;
            updateCount(); // Still need to render everything else
            console.log('Not able to get element for', slide.id);
          });
        }
        else {
          if (elements[slide.id] && slide.classes) {
            classes = addAndRemoveClasses(elements[slide.id], slide.classes[0].split(' '), slide.classes[1].split(' '));
            elements[slide.id].className = classes.join(' ');
          }
          updateCount();
        }
      });

    });

  }

  // If data-state is specified on slide
  // Can handle multiple states: data-state="one two"
  function setStateClass(id) {
    var id = id || app.slideshow.get();
    var el = elements[id];
    var state = el.getAttribute('data-state');
    if (currentState) {
      currentState.split(' ').forEach(function(s) {
        document.documentElement.classList.remove(s);
      });
    }
    if (state) {
      currentState = state;
      state.split(' ').forEach(function(s) {
        document.documentElement.classList.add(s);
      });
    }
  } 

  function updateCurrent(data) {
    var classes;
    if (!elements[data.current.id]) {
      insert([data.current], true);
    }
    // Nothing to load
    if (elements[data.prev.id]) { 
       // STEP 1 - Update classes on existing elements
       classes = addAndRemoveClasses(elements[data.prev.id], data.prev.classes[0].split(' '), data.prev.classes[1].split(' '));
       elements[data.prev.id].className = classes.join(' ');
    }
    if (currentEl && elements[data.current.id]) {
      transitionElements(data.current.id);
      classes = addAndRemoveClasses(currentEl, data.current.classes[0].split(' '), data.current.classes[1].split(' '));
      elements[data.current.id].className = classes.join(' ');
      setStateClass(data.current.id);
    }
    // If we only got one slide then no transition is necessary
    else if (elements[data.current.id]) {
      enterCurrent();
      setStateClass(data.current.id);
    }
  }

  // Handler
  // Move from one slide element to another
  // @param data - Info coming from app.slideshow module
  // Example: {current: {}, prev: {}, updates: {classes: [], id: ""}}
  function updateElements(data) {
    var toLoad = [];
    var enterCurrentOnLoad = false;
    var ln = data.updates.length;
    var i;

    var prepare = function(update) {
      var el = elements[update.id]; 
      var classes;
      if (el) {
        // STEP 1 - Update classes on existing elements
        classes = addAndRemoveClasses(el, update.classes[0].split(' '), update.classes[1].split(' '));
        el.className = classes.join(' ');
      }
      // We need to find and load the HTML for the slide
      else {
        toLoad.push(update);
        history.push(update.id);
      }
    }

    for(i=0;i<ln;i++) {
      prepare(data.updates[i]);
    }

    // STEP 2 - Load files
    // Load slides and modules not yet in dom
    insert(toLoad, enterCurrentOnLoad);
  }

  return {
    get: get,
    getElement: getElement,
    getHistory: getHistory,
    setHistory: setHistory,
    load: load,
    insert: insert,
    remove: remove,
    archive: archive,
    render: render,
    resolveModules: resolveModules,
    parse: domify.parse
  }

}(app.slideshow, app.config, app.util)); // Getting elements from app-init

app.util.extend(app.dom, app.events);
/***********************************************************
*
* Handling individual slides
*
***********************************************************/
app.slide = app.view = app.module = (function (dom) {

  function has(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
  };

  function result(object, property) {
    var value = object ? object[property] : undefined;
    return typeof value === 'function' ? object[property]() : value;
  };

  // Cached regex to match an opening '<' of an HTML tag, possibly left-padded
  // with whitespace.
  var paddedLt = /^\s*</;

  // Caches a local reference to `Element.prototype` for faster access.
  var ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};

  // Cross-browser event listener shims
  var elementAddEventListener = ElementProto.addEventListener || function(eventName, listener) {
    return this.attachEvent('on' + eventName, listener);
  }
  var elementRemoveEventListener = ElementProto.removeEventListener || function(eventName, listener) {
    return this.detachEvent('on' + eventName, listener);
  }

  var indexOf = function(array, item) {
    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
    return -1;
  }

  // Find the right `Element#matches` for IE>=9 and modern browsers.
  var matchesSelector = ElementProto.matches ||
      ElementProto.webkitMatchesSelector ||
      ElementProto.mozMatchesSelector ||
      ElementProto.msMatchesSelector ||
      ElementProto.oMatchesSelector ||
      // Make our own `Element#matches` for IE8
      function(selector) {
        // Use querySelectorAll to find all elements matching the selector,
        // then check if the given element is included in that list.
        // Executing the query on the parentNode reduces the resulting nodeList,
        // (document doesn't have a parentNode).
        var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
        return ~indexOf(nodeList, this);
      };

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  app.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    app.util.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) app.util.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  var View = function(options) {

    if (options) Object.keys(options).forEach(function(key) {
      if (viewOptions.indexOf(key) !== -1) this[key] = options[key];
    }, this);

    this._elements = {};
    this._ensureElement();
    this._createStateMap();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  app.util.extend(View.prototype, app.events, {


    initialize: function() {},

    _state: 0, // 0 = no state, 1 = first state
    states: [],
    rotate: false,

    _domEvents: [],

    // Utility for finding elements in slide
    // Is cached if called multiple times
    $: function(selector) {
      var action = 'querySelectorAll';
      if (this._elements[selector]) return this._elements[selector];
      if (selector[0] === '#') action = 'querySelector';
      if (selector[0] === '<') return app.dom.parse(selector);
      this._elements[selector] = this.el[action](selector);
      return this._elements[selector];
    },

    /**
     * @api #getState() Get the current view-state
     *
     * @apiDescription
     * Get the current view-state
     *
     * @apiName getState
     * @apiGroup View Instance
     *
     * @apiExample Example:
     * this.getState();
     */
    getState: function() {
      if (this.states[this._state - 1]) return this.states[this._state - 1];
      return null;
    },

    addState: function(stateObj) {
      if (stateObj.id) this.states.push(stateObj);
      this._createStateMap();
    },

    /**
     * @api #stateIs(id) Check if view-state match
     *
     * @apiDescription
     * Check if view-state match
     *
     * @apiName stateIs
     * @apiGroup View Instance
     *
     * @apiParam {String} id Id of the state
     *
     * @apiExample Example:
     * if (this.stateIs('displayInfo')) {...}
     */
    stateIs: function(id) {
      var state = this.states[this._state - 1];
      if (state && state.id === id) return true;
      return false;
    },

    /**
     * @api #stateIsnt(id) Check if view-state doesn't match
     *
     * @apiDescription
     * Check if view-state doesn't match
     *
     * @apiName stateIsnt
     * @apiGroup View Instance
     *
     * @apiParam {String} id Id of the state
     *
     * @apiExample Example:
     * if (this.stateIsnt('displayInfo')) {...}
     */
    stateIsnt: function(id) {
      var state = this.states[this._state - 1];
      if (state && state.id === id) return false;
      return true;
    },

    /**
     * @api #next() Go to next view-state
     *
     * @apiDescription
     * Go to next view-state
     *
     * @apiName next
     * @apiGroup View Instance
     *
     * @apiExample Example:
     * this.next();
     */
    next: function() {
      return this._setState(this._state + 1);
    },

    /**
     * @api #previous() Go to previous view-state
     *
     * @apiDescription
     * Go to previous view-state
     *
     * @apiName previous
     * @apiGroup View Instance
     *
     * @apiExample Example:
     * this.previous();
     */
    previous: function() {
      return this._setState(this._state - 1);
    },

    /**
     * @api #goTo(id,stateData) Go to a view-state
     *
     * @apiDescription
     * Go to a state of the view. Will call onExit on
     * current state (if any) and onEnter on this state.
     * Class will be set on view with the format state-[stateId]
     *
     * @apiName goTo
     * @apiGroup View Instance
     *
     * @apiParam {String} id Id of the state
     * @apiParam {Object} stateData Any data to pass to the state
     *
     * @apiExample Example:
     * this.goTo('showPopup');
     */
    goTo: function(id, stateData) {
      var index;
      if (typeof id === 'string') {
        index = this._stateMap[id];
        if (index > 0) this._setState(index, stateData);
      }
      // If numeric id
      else {
        this._setState(id, stateData);
      }
    },

    getIndex: function(id) {
      if (!id) return this._state;
      if (this._stateMap[id]) return this._stateMap[id];
      return -1;
    },

    /**
     * @api #reset() Reset view-state
     *
     * @apiDescription
     * Reset the view to default state.
     * Will set the class state-default on the view.
     *
     * @apiName reset
     * @apiGroup View Instance
     *
     * @apiExample Example:
     * this.reset();
     */
    reset: function() {
      this._setState(0);
    },

    /**
     * @api #toggle(id) Toggle a view-state
     *
     * @apiDescription
     * Enter or exit a view-state
     *
     * @apiName toggle
     * @apiGroup View Instance
     *
     * @apiParam {String} id Id of the state
     *
     * @apiExample Example:
     * this.toggle('displayInfo');
     */
    toggle: function(id) {
      var index = this._stateMap[id];
      // Exit
      if (index === this._state) {
        this.reset();
      }
      else {
        this.goTo(id);
      }
    },

    _setState: function(stateIndex, stateData) {
      var currentIndex = this._state;
      var current = {};
      var next;
      var stateObj = this.states[stateIndex - 1];

      if (stateIndex === currentIndex) return;

      // If we don't have any states don't bother
      if (this.states.length && (stateObj || stateIndex === 0)) {

        next = stateObj || {id: null};
        // Exit previous state first
        if (currentIndex) {
          current = this.states[currentIndex - 1];
          this.el.classList.remove("state-" + current.id);
          if (current.onExit) {
            current.onExit.bind(this)(next.id);
          }
          if (stateIndex === 0) {
            this.el.classList.add("state-default");
            // Also send exit event as no enter event will be triggered
            this.trigger('reset', {id: current.id, next: next.id, view: this.id});
            app.slide.trigger('reset', {id: current.id, next: next.id, view: this.id});
          }
        }
        this._state = stateIndex;
        if (stateIndex !== 0) {
          // Enter the next state
          current.id = current.id || null;
          this.el.classList.remove("state-default");
          this.el.classList.add("state-" + next.id);
          if (next.onEnter) {
            next.onEnter.bind(this)(current.id, stateData);
          }
          this.trigger('state:enter', {id: next.id, previous: current.id, view: this.id, data: stateData});
          app.slide.trigger('state:enter', {id: next.id, previous: current.id, view: this.id, data: stateData});
        }

        return true;

      }
      // Check if we are at the last one and should rotate
      else if (this.rotate && stateIndex === this.states.length + 1) {
        this._setState(1);
        return true;
      }

      return false;

    },

    _injectStates: function(childId, states) {
      var index = this._stateMap[childId];
      var self = this;
      var remove = 1;
      if (index) {
        states.forEach(function(state, i) {
          self.states.splice((index + i) - 1, remove, {
            id: childId + "-" + state.id,
            onEnter: function(prev, data) {
              var s = app.slide.get(childId);
              s.goTo(i + 1);
            },
            onExit: function(prev, data) {
              var s = app.slide.get(childId);
              s.reset();
            }
          });
          if (i === 0) remove = 0;
        });
        this._createStateMap(); // New map after insertion
      }
    },

    _createStateMap: function() {
      var self = this;
      this._stateMap = {};
      this.states.forEach(function(item, i) {
        var mEl, module, script, states;
        if (item.id) self._stateMap[item.id] = i + 1; // not 0-based
        if (item.include) {
          self._stateMap[item.include] = i + 1; // not 0-based
        }
      });
    },

    _removeElement: function() {
      var self = this;
      if (this.onRemove) this.onRemove(this.el);
      this.undelegateEvents();
      // Remove cached element lookups
      Object.keys(this._elements).forEach(function(selector) {
        self._elements[selector] = null;
      });
      dom.remove(this.id, this.el.parentNode);
      views[this.id] = null;
      // if (app.$[this.id]) app.$[this.id] = null;
    },

    // Apply the `element` to the view. `element` can be a CSS selector,
    // a string of HTML, or an Element node.
    _setElement: function(element) {
      if (typeof element == 'string') {
        if (paddedLt.test(element)) {
          var el = document.createElement('div');
          el.innerHTML = element;
          this.el = el.firstChild;
        } else {
          this.el = document.querySelector(element);
        }
      } else {
        this.el = element;
      }
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Set a hash of attributes to the view's `el`. We use the "prop" version
    // if available, falling back to `setAttribute` for the catch-all.
    _setAttributes: function(attrs) {
      for (var attr in attrs) {
        attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
      }
    },

    // Make a event delegation handler for the given `eventName` and `selector`
    // and attach it to `this.el`.
    // If selector is empty, the listener will be bound to `this.el`. If not, a
    // new handler that will recursively traverse up the event target's DOM
    // hierarchy looking for a node that matches the selector. If one is found,
    // the event's `delegateTarget` property is set to it and the return the
    // result of calling bound `listener` with the parameters given to the
    // handler.
    delegate: function(eventName, selector, listener) {
      if (typeof selector === 'function') {
        listener = selector;
        selector = null;
      }

      var root = this.el;
      var handler = selector ? function (e) {
        var node = e.target || e.srcElement;
        for (; node && node != root; node = node.parentNode) {
          if (matchesSelector.call(node, selector)) {
            e.delegateTarget = node;
            listener(e);
          }
        }
      } : listener;

      elementAddEventListener.call(this.el, eventName, handler, false);
      this._domEvents.push({eventName: eventName, handler: handler, listener: listener, selector: selector});
      return handler;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      if (!(events || (events = result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (typeof method !== 'function') {
          if (this[events[key]]) {
            method = this[events[key]];
          }
          else {
            // Let's see if it's a state
            // TODO: Make it navigate to state if possible
            method = function() {};
          }
        }
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], method.bind(this));
      }
      return this;
    },

    // Remove a single delegated event. Either `eventName` or `selector` must
    // be included, `selector` and `listener` are optional.
    undelegate: function(eventName, selector, listener) {
      if (typeof selector === 'function') {
        listener = selector;
        selector = null;
      }

      if (this.el) {
        var handlers = this._domEvents.slice();
        for (var i = 0, len = handlers.length; i < len; i++) {
          var item = handlers[i];

          var match = item.eventName === eventName &&
              (listener ? item.listener === listener : true) &&
              (selector ? item.selector === selector : true);

          if (!match) continue;

          elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
          this._domEvents.splice(indexOf(handlers, item), 1);
        }
      }
      return this;
    },

    // Remove all events created with `delegate` from `el`
    undelegateEvents: function() {
      if (this.el) {
        for (var i = 0, len = this._domEvents.length; i < len; i++) {
          var item = this._domEvents[i];
          elementRemoveEventListener.call(this.el, item.eventName, item.handler, false);
        };
        this._domEvents.length = 0;
      }
      return this;
    },
    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = app.util.extend({}, result(this, 'attributes'));
        if (this.id) attrs.id = result(this, 'id');
        if (this.className) attrs['class'] = result(this, 'className');
        this.setElement(this._createElement(result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(result(this, 'el'));
      }
    }
  });

  View.extend = app.extend;

  if (!dom) throw new Error("app.dom module is required for app.slide");

  // A container for all initialized views
  // Partials and modules will have slide id prepended
  // e.g. 'blue_urine_nr_of_patients'
  var views = {};
  var current;

  app.listenTo(dom, 'new:elements', addViews);
  app.listenTo(dom, 'element:enter', enter);

  /**
   * @api app.view.get(id) Get the view instance
   *
   * @apiDescription
   * Get the view instance if it exist, otherwise undefined
   *
   * @apiName get
   * @apiGroup View Class
   *
   * @apiParam {String} id Id of the view instance
   *
   * @apiExample Example:
   * var slide = app.view.get('efficacy_study');
   */
  function get(id) {
    var id = id || current;
    if (id) {
      return views[id];
    }
    return undefined;
  }

  function getInstance(id) {
    if (!id) throw new Error('Need to supply slide id when creating new instance');
    var viewModel = app.model.getView(id);
    if (viewModel) {
      return viewModel;
    }
  }

  function addViews(data) {
    if (data.views.length) {
      data.views.forEach(function(view) {
        createAndRender(view);
      });
    }
  }

  // Load a slide (or return already loaded)
  function load(id, next) {
    if (views[id]) return views[id];
    app.dom.load([{id: id, classes:['present', 'future']}]).then(function(data) { next(data); })
  }

  function setupParent(el, data) {
    var parent;
    var view = views[data.id];
    if (view) {
      if (data.parent) {
        parent = views[data.parent];
        // If no parent script, create a default one
        if (!parent) {
          // parent = new View();
          parent = views['presentation'];
        }
        // else {
        //   app.$[data.id] = views[data.id];
        // }
        // app.listenTo(parent, )
        if (view.states) parent._injectStates(data.id, view.states);
        view.parentId = data.parent;
        view.parent = parent;
        if (parent.children) parent.children.push(data.id); // So that we can exit children
      }

      if (view.onRender) view.onRender(el);
      
    }
  }

  // Modules are instaniated before the slide
  function createAndRender(data) {
    var el = dom.get(data.id) || null;
    var Slide;
    var slide = {};
    var script;
    var attrs;
    var scriptId = data.scriptId || data.id;

    if (!views[data.id]) {
      if (!el) el = document.getElementById(data.id);
      slide.el = el;
      slide.id = data.id;
      slide.scriptId = scriptId; // Not always same as slide.id

      // Easy access to module/partial element
      if (data.el) {
        slide.$el = data.el;
      }

      // We need to parse any modules and import module states if defined
      script = app.registry.get(scriptId) || {};
      script.children = [];
      if (script) {
        app.util.extend(slide, script);
      }
      Slide = View.extend(slide);
      views[data.id] = new Slide();
      if (views[data.id].publish) {
        views[data.id].props = app.util.extend({}, views[data.id].publish);
        for (prop in views[data.id].props) {
          if (views[data.id].props[prop] && !!views[data.id].props[prop].push) views[data.id].props[prop] = views[data.id].props[prop][0];
        }
      }
      else {
        views[data.id].props = {};
      }

      // Get any properties on element. my-prop will be accessed as myProp
      app.util.toArray(el.attributes).forEach(function(attr) {
        var aName = attr.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        views[data.id].props[aName] = attr.value || true;
      });

    }
    window.setTimeout(function() {
      setupParent(el, data);
    });
  }

  views['presentation'] = new View({el: app.dom.get('wrapper'), id: 'presentation', children: []});

  // Entering a slide
  function enter(data, isChild) {
    var id = data.id;
    var slide = views[id] || {};
    var el = dom.get(id) || null;
    var state;
    var isChild = isChild || false;

    // Make sure to exit current slide before entering next
    if (current && !isChild) exit(current);

    if (slide) {
      if (slide._state === 0) el.classList.add("state-default");
      if (slide.onEnter) slide.onEnter(el);
      if (slide.children && slide.children.length) {
        slide.children.forEach(function(child) {
          enter({id: child}, true);
        });
      }
    }
    if (!isChild) {
      current = id;
      app.slide.trigger('slide:enter', data);
    }
    return slide;
  }

  function exit(id, isChild) {
    var slide = views[id] || {};
    var el = dom.get(id) || null;
    var isChild = isChild || false;

    if (slide) {
      // Call exit if exist
      // Note that state will NOT be automatically exited (slide state persist)
      if (slide.onExit) slide.onExit(el);
      if (slide.children && slide.children.length) {
        slide.children.forEach(function(child) {
          exit(child, true);
        });
      }
    }
    if (!isChild) app.slide.trigger('slide:exit', {id: id});
    return slide;
  }

  function runSingle(id) {
    enter({id: id});
  }

  function next() {
    var slide;
    if (current) {
      slide = views[current];
      if (slide) return slide.next();
      return false;
    }
  }

  function previous() {
    var slide;
    if (current) {
      slide = views[current];
      if (slide) return slide.previous();
      return false;
    }
  }

  function goTo(id) {
    var slide;
    if (current) {
      slide = views[current];
      slide.goTo(id);
    }
  }

  function toggle(id) {
    var slide;
    if (current) {
      slide = views[current];
      slide.toggle(id);
    }
  }

  function reset() {
    var slide;
    if (current) {
      slide = views[current];
      slide.reset();
    }
  }

  // Remove any references to the slide
  function remove(id, force) {
    var view = views[id] || null;
    if (view) {
      if (force || view.el.classList.contains('archived')) {
        if (view.children) {
          view.children.forEach(function(childId) {
            app.slide.remove(childId, true);
          });
        }
        view._removeElement();
      }
    }
  }

  // Create new slide
  // Will add new slide to the model
  function newSlide(id, options) {

  }

  // Public API
  return {
    get: get,
    getInstance: getInstance,
    load: load,
    remove: remove,
    views: views,
    enter: enter,
    exit: exit,
    next: next, // Next fragment
    prev: previous,
    goTo: goTo,
    toggle: toggle,
    reset: reset
  }

}(app.dom));

app.util.extend(app.slide, app.events);
app.history = (function(slide) {

  if (!slide) throw new Error("app.slide module is required for app.history");

  var initialized = false;
  var queryPrefix;

  //Use history module
  function init(prefix) {
    if (!initialized) {
      queryPrefix = prefix ? prefix + "&" : "?";
      app.listenTo(app.slide, 'slide:enter', setURL);
      app.listenTo(app.slide, 'state:enter', setStates);
      app.listenTo(app.slide, 'reset', resetStates);
      initialized = true;
    }
    // app.listenTo(app.slideshow, 'update:current', setURL);
  }

  function setStates(data) {
    var slide = app.slide.get();
    // Check if it's a slide state or something else
    if (slide && slide.stateIs(data.id)) {
      var stateObj = {
        stateId: data.id,
        path: app.getPath()
      };
      window.history.replaceState(stateObj, "", queryPrefix + 'path=' + stateObj.path +  '&state=' + data.id);
    }
  }

  function resetStates(data) {
    var stateObj = {
      stateId: 'default',
      path: app.getPath()
    };
    window.history.replaceState(stateObj, "", queryPrefix + 'path=' + stateObj.path);
  }

  function setURL(data) {
    // window.location.search 
    var state = app.slide.get().getState();
    var stateObj = {
      stateId: 'default',
      path: app.getPath()
    };
    if (data.view) state = data;
    var url = queryPrefix + "path=" + stateObj.path;
    if (state) {
      stateObj.stateId = state.id;
      url += '&state=' + state.id;
    }
    window.history.pushState(stateObj, "", url);
  }

  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.path !== app.getPath()) {
      app.goTo(event.state.path);
    }
    else {
      // window.history.back();
    }
  });

  return {
    init: init,
    setStates: setStates
  }

}(app.slide));
/***********************************************************
*
* Simple templating.
* https://gist.github.com/marlun78/2701678
*
* TODO: Fix bug: will not work if ERB tag is in commented code
*
***********************************************************/ 
app.template = (function() {

  /*!
    Underscore.js templates as a standalone implementation. 
    JavaScript micro-templating, similar to John Resig's implementation. 
    Underscore templates documentation: http://documentcloud.github.com/underscore/#template
    Modifyed by marlun78
*/
  'use strict';

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  var settings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
      '\\': '\\',
      "'": "'",
      'r': '\r',
      'n': '\n',
      't': '\t',
      'u2028': '\u2028',
      'u2029': '\u2029'
  };

  for (var p in escapes) {
      escapes[escapes[p]] = p;
  }

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  var tmpl = function (text, data, objectName) {
    settings.variable = objectName;

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
        .replace(escaper, function (match) {
            return '\\' + escapes[match];
        })
        .replace(settings.escape || noMatch, function (match, code) {
            return "'+\n_.escape(" + unescape(code) + ")+\n'";
        })
        .replace(settings.interpolate || noMatch, function (match, code) {
            return "'+\n(" + unescape(code) + ")+\n'";
        })
        .replace(settings.evaluate || noMatch, function (match, code) {
            return "';\n" + unescape(code) + "\n;__p+='";
        }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) {
        source = 'with(obj||{}){\n' + source + '}\n';
    }

    source = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', source);

    if (data) {
        return render(data);
    }

    var template = function (data) {
        return render.call(this, data);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  if (window._ && window._.template) {
      return window._.template;
  }
  else {
    window._ = {
      template: tmpl
    }
  }

  return tmpl;

}());
app.msg = (function() {

  var msgList;

  function createList() {
    var wrapper = app.dom.get('wrapper');
    var list = document.createElement('ul');
    list.classList.add('app-messages');
    wrapper.appendChild(list);
    return list;
  }

  function createNotice(id, msg) {
    var html = '<div class="notice-msg">' + msg + '</div>';
    html += '<div class="notice-accept"><button class="pure-button ag-button-success" onclick="app.msg.accept(\'' + id + '\')">Got it!</button></div>';
    return html;
  }

  function createConfirmation(id, msg) {
    var html = '<div class="confirm-msg">' + msg + '</div>';
    html += '<div class="confirm-cancel"><button class="pure-button ag-button-warning" onclick="app.msg.cancel(\'' + id + '\')">Cancel</button></div>';
    html += '<div class="confirm-confirm"><button class="pure-button ag-button-success" onclick="app.msg.accept(\'' + id + '\')">Confirm</button></div>';
    return html;
  }

  function createUpdateMsg(msg) {
    var html = '<div class="notice-msg">' + msg + '</div>';
    html += '<div class="notice-accept"><button class="pure-button ag-button-success" onclick="app.msg.reload()">Refresh</button></div>';
    return html;
  }

  function accept(id) {
    var el = document.getElementById('app-msg-' + id);
    app.msg.trigger('msg:confirmed', {id: id});
    window.localStorage.setItem(id, true);
    if (el) remove(el);
  }

  function cancel(id) {
    var el = document.getElementById('app-msg-' + id);
    app.msg.trigger('msg:cancelled', {id: id});
    if (el) remove(el);
  }

  function reload() {
    window.location.reload();
  }

  // Send a notice to the user
  // Will allow a user to discard future notices
  // param id is used to remember user setting
  function notice(id, msg) {
    var ignore = window.localStorage.getItem(id);
    if (!ignore) {
      msg = createNotice(id, msg);
      displayPermanent(id, msg);
    }
  }

  function confirm(msg) {
    var id = 'confirm_' + new Date().getTime();
    msg = createConfirmation(id, msg);
    displayPermanent(id, msg);
    return id;
  }

  // Msg with refresh button
  function update(msg) {
    msg = createUpdateMsg(msg);
    display(msg);
  }

  function alert(msg) {
    display(msg, 'alert');
  }

  function send(msg) {
    display(msg);
  }

  function remove(el) {
    el.classList.remove('active-msg');
    setTimeout(function() {
      msgList.removeChild(el);
    },500);
  }

  function displayPermanent(id, msg, type) {
    var el = document.createElement('li');
    el.id = 'app-msg-' + id;
    if (type) el.classList.add(type + '-msg');
    el.innerHTML = msg;
    if (!msgList) msgList = createList()
    msgList.insertBefore(el, msgList.firstChild);
    setTimeout(function() {
      el.classList.add('active-msg');
    },100);
  }

  function display(msg, type) {
    var el = document.createElement('li');
    if (type) el.classList.add(type + '-msg');
    el.innerHTML = msg;
    if (!msgList) msgList = createList()
    msgList.insertBefore(el, msgList.firstChild);
    setTimeout(function() {
      el.classList.add('active-msg');
    },100);
    setTimeout(function() {
      el.classList.remove('active-msg');
    },4000);
    setTimeout(function() {
      msgList.removeChild(el);
    },4500);
  }

  return {
    alert: alert,
    notice: notice,
    send: send,
    accept: accept,
    confirm: confirm,
    update: update,
    cancel: cancel,
    reload: reload
  }

}());

app.util.extend(app.msg, app.events);
app.$ = (function() {

  var env, socket, pid;
  var bundle = getBundle();

  function init(mode) {
    mode = mode || 'builder';
    var infoPath = "agnitio-info.js";
    var builderPath = window.location.pathname.match(/\/presentations\/([a-z0-9]+)\/index.html/);
    // See if we have a presentation id to work with
    if (builderPath && builderPath.length) pid = builderPath[1];
    if (pid) infoPath = "../viewer/js/agnitio-info.js";
    window.CKEDITOR_BASEPATH = 'ckeditor/'; // default, might be overwritten
    // Are we in dev, qa or prod environment?
    env = window.location.protocol === "https:" ? 'prod' : 'dev';
    if (env === 'prod' && (/sqa/).test(window.location.host)) env = 'qa';
    // Any builder app should provide agnitioInfo
    head.load([infoPath], function() {
      var filesToLoad;
      if (window.agnitioInfo) {
        if (window.agnitioInfo.applicationName === "Builder Online") {
          // Load sockets to communicate with server
          filesToLoad = window.agnitioInfo.socket[env] + "socket.io/socket.io.js";
        }
        else if (window.agnitioInfo.applicationName === "Builder CLI") {
          filesToLoad = ["http://" + (location.host || 'localhost') + window.agnitioInfo.socket[env] + "socket.io/socket.io.js"];
          if (mode === 'develop') {
            filesToLoad.push("http://" + (location.host || 'localhost').split(':')[0] + ":35729/livereload.js");
          }
        }
        if (filesToLoad) {
          head.load(filesToLoad, function() {
            setupSocket(mode);
          });
        }
      }
      // fallback to iFrame communication
      // else {

      // }
    });
  }

  // function setup(plugins) {
  //   var remote;
  //   if (window.require) {
  //     app.$.ipc = require('ipc');
  //     remote = require('remote');
  //     if (app.$.ipc && remote) setupIPC(remote);
  //   }
  // }

  // If we are connected to Web or CLI Builder
  function setupSocket(mode) {
    var urlPrefix = '?mode=' + mode;
    var socketServer;
    if (window.agnitioInfo.socket[env].length > 1) socketServer = window.agnitioInfo.socket[env];
    if (app.lang) urlPrefix += '&lang=' + app.lang;
    socket = app.$.socket = window.io(socketServer);
    
    app.$.send = function(name, data) {
      data = data || {};
      if (app.$.session && app.$.session.user) data.user = app.$.session.user;
      if (pid) data.pid = pid;
      if (bundle) data.bundle = bundle;
      socket.emit(name, data);
    }

    // Message hosting app that we wish to connect
    if (mode === 'builder') app.$.send("init:builder");
    
    app.history.init(urlPrefix);

    socket.on('server:error', function(data) {
      app.msg.alert(data.msg);
    });
    socket.on('server:confirmation', function(data) {
      app.msg.alert(data.msg);
    });
    // socket.on('server:update', function(data) {
    //   app.msg.update(data.msg);
    // });
    // socket.on('return:assets', function(assets) {
    //   app.$.trigger('return:assets', assets);
    // });
    // socket.on('return:source', function(source) {
    //   app.$.trigger('return:source', source);
    // });
    // socket.on('reload:css', function(source) {
    //   app.$.trigger('reload:css', source);
    // });
    // socket.on('presentation:saved', function(data) {
    //   var msg = data.msg || "Presentation was successfully updated";
    //   app.msg.alert(msg);
    // });
    // // Other user updated presentation
    // socket.on('presentation:updated', function(data) {
    //   var msg = data.user + " updated the presentation. Refreshing.";
    //   app.msg.alert(msg);
    //   window.location.reload();
    // });
    // socket.on('presentation:reload', function(data) {
    //   window.location.reload();
    // });
    socket.on('load:plugins', function(data) {
      app.$.trigger('load:plugins', data);
    });
    socket.on('initialize:builder', function(data) {
      app.$.isBuilder = true;
      document.childNodes[1].classList.add('mode-builder');
      if (data.basePath) window.CKEDITOR_BASEPATH = data.basePath;
      if (data.tmpPath) app.$.tmpPath = data.tmpPath;
      app.$.trigger('load:plugins', data);
    });
  }

  // If we are connected to desktop Builder
  // function setupIPC(remote) {
  //   var Menu, MenuItem;
  //   if (remote) {
  //     Menu = remote.require('menu');
  //     MenuItem = remote.require('menu-item');
  //   }

  //   var menu = new Menu();
  //   menu.append(new MenuItem({ label: 'Capture Snapshot', click: function() { app.$.ipc.send('capture:snapshot') } }));
  //   menu.append(new MenuItem({ type: 'separator' }));
  //   menu.append(new MenuItem({ label: 'Show Web Inspector', click: function() { app.$.ipc.send('open:inspector') } }));

  //   app.$.send = function(name, data) {
  //     app.$.ipc.send(name, data);
  //   }

  //   // Message hosting app that we wish to connect
  //   app.$.send("init:builder");

  //   window.addEventListener('contextmenu', function (e) {
  //     e.preventDefault();
  //     menu.popup(remote.getCurrentWindow());
  //   }, false);
  // }

  function register(files, name) {
    name = name || "";
    head.load(files, function() {
      app.$.trigger("registered", {name: name});
    });
  }

  function load(plugin) {
    return new Promise(function(resolve, reject) {
      var script = app.registry.get(plugin);
      // var container = app.dom.get('wrapper');
      var container = document.body;
      if (script && !app.$[plugin]) {
        app.dom.insert([{id: plugin}], false, container);
        resolve(true);
      }
      else {
        if (app.$[plugin]) {
          resolve(app.$[plugin]);
        }
        else {
          reject("No plugin named " + plugin + " is registered");
        }
      }
    });
  }

  // Send message to server
  // Overwritten in different setups
  function send(name, data) {
    if (ag) {
      ag.msg.send({
        name: name,
        value: data
      });
    }
  }

  function getBundle() {
    var defaultBundle = {
      "presentation": {
        "styles": ["accelerator/css/styles.css", "templates/master/**/*.{css,styl}", "modules/**/*.{css,styl}", "slides/**/*.{css,styl}"],
        "scripts": [
          "accelerator/js/init.js",
          "accelerator/lib/head.min.js",
          "templates/master/**/*.{js,coffee}",
          "modules/**/*.{js,coffee}",
          "slides/**/*.{js,coffee}",
          "modules/**/*.{html,jade,md}",
          "slides/**/*.{html,jade,md}",
          "slides/**/translations/*.json",
          "config.json",
          "presentation.json",
          "references.json"
        ]
      }
    };
    var bundle = app.config.get('bundle') || defaultBundle;
    return bundle;
  }

  // Recieved messages will be passed on using internal events
  function receiveMessage(event) {
    if (event.data) {
      if (typeof event.data === 'string') event.data = JSON.parse(event.data);
      app.$.trigger(event.data.name, event.data);
    }
  }

  // Listen for messages from hosting app (sent with postMessage API)
  window.addEventListener("message", receiveMessage, false);

  return {
    isBuilder: false,
    init: init,
    load: load,
    send: send
  }

}());

app.util.extend(app.$, app.events);

app.$.on("load:plugins", function(data) {
  if (data.files) {
    head.load(data.files, function() {
      setTimeout(function() {
        app.$.trigger("plugins:ready");
      },500);
    });
  }
});

app.$.on("navigate", function(event) {
  if (event.data.path) app.goTo(event.data.path);
});
(function() {

  app.isPaused = false;

  // Expect a path like: "structure/chapter/slide"
  app.goTo = function(path, state) {
    if (state) {
      app.slide.once('slide:enter', function() {
        app.slide.goTo(state)
      });
    }
    app.slideshow.load(path);
  }

  app.getPath = app.slideshow.getPath;

  app.addNavListeners = function() {
    var config = app.config.get();
    var slideshowId = app.slideshow.getId();
    addEventListeners(config.keyboard, config.touch);
    setupSwipeListeners({id: slideshowId});
  }

  app.removeNavListeners = function() {
    document.removeEventListener('keydown', onDocumentKeyDown, false);
    removeSwipes();
  }

  app.lock = function() {
    app.removeNavListeners();
    app.trigger('locked');
  };
  app.unlock = function() {
    app.addNavListeners();
    app.trigger('unlocked');
  };

  // Dispatch an event to outside listeners
  app.dispatchEvent = function(type, properties) {
    var event = document.createEvent("HTMLEvents", 1, 2);
    var el = app.dom.get('wrapper') || document;
    event.initEvent(type, true, true);
    app.util.extend(event, properties);
    el.dispatchEvent(event);
  }

  app.fullScreen = function() {
    // From RevealJS
    var element = document.body;

    // Check which implementation is available
    var requestMethod = element.requestFullScreen ||
      element.webkitRequestFullscreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullScreen;

    if (requestMethod) {
      requestMethod.apply(element);
    }
  }

  app.togglePause = function() {
    var wrapper = app.dom.get('wrapper');
    wrapper.classList.toggle('paused');
    app.isPaused = !app.isPaused;
    if (app.isPaused) {
      removeSwipes();
    } else {
      addSwipes();
    }
  }

  app.autoRun = function(delay) {
    setInterval(function() {
      app.next();
    }, delay);
  }

  app.next = function() {
    if (!app.slide.next()) app.slideshow.step('next');
  }

  app.prev = function() {
    if (!app.slide.prev()) app.slideshow.step('previous');
  }

  /***********************************************************
   *
   * Application startup
   *
   ***********************************************************/
  app.start = (function(model, configuration, registry, slideshow) {

    function init() {
      var config = configuration.get();

      if (app.queryParams && app.queryParams.mode) {
        app.$.init(app.queryParams.mode); // Activate plugins
      }

      if (window.ag && window.ag.on) {
        if (app.config.get('remote')) {
          app.remote.setup();
        }
        // Listen in case registration comes later
        else {
          ag.on('registerUser', function(data) {
            app.remote.init(data);
            app.remote.setup();
          })
        }
      }

      // If we haven't initialized then run single slide
      // To run as an app index.html must reference app.initialize
      if (app.initialize) {
        app.listenTo(registry, 'register', function(id) {
          app.slide.enter({
            id: id
          }, true);
        });
      }
      else {

        if (config.history) app.history.init();

        if (config.preload) {
          app.listenTo(slideshow, 'load', function(id) {
            var list = [];
            var slides = [];
            var currentSlide = app.slideshow.get();
            var classToAdd = 'past';
            var classToRemove = 'future present';
            // Flatten list of slide ids
            list = list.concat.apply(list, app.slideshow.inspect().list);
            list.forEach(function(id) {
              var slide = model.getSlide(id);
              if (id === currentSlide) {
                slide.classes = ['past future', 'present'];
                classToAdd = 'future';
                classToRemove = 'past present';
              }
              else {
                slide.classes = [classToRemove, classToAdd]
              }
              slides.push(slide);
            });
            app.dom.insert(slides);
          });
        }

        config.model = config.model || "presentation.json";

        addEventListeners(config.keyboard, config.touch);

        // Set up linear or nested swipe listeners when slideshow loads
        app.listenTo(slideshow, 'load', setupSwipeListeners);

        // Once the model is initially set, the presentation will run
        app.model.once('set:model', function(data) {
          var hash = window.location.hash;
          var query = window.location.search;
          var path = config.startPath || null;
          if (hash && hash.length > 2) {
            path = hash.replace('#', '');
          }
          // If path is set specifically it will overwrite any config
          // app.queryParams is set in app.initialize (app.js)
          else if (app.queryParams) {
            if (app.queryParams.path && app.slideshow.pathExist(app.queryParams.path)) {
                path = app.queryParams.path;
            } else if (app.queryParams.slide) {
              path = app.queryParams.slide.replace(/%2F/g, '/'); // Getting safe string from content server
            }
          }
          app.start.at(path);

          app.dispatchEvent('ready');
          app.trigger('presentation:ready');

          if (config.autoSlide) {
            app.autoRun(config.autoSlide);
          }

        });

        // Find out what kind of model we have
        // When model is set, event will be dispatched that triggers start.
        
        // Check if our path is to a JSON file
        if (/\.json$/.test(config.model)) {
          model.fetch(config.model);
        }
        // Check if we have an object (inline model), and use as is
        else if (typeof config.model === "object") {
          model.set(config.model);
        }
        // Lastly, assume that we have a string of slide ids or all slides inline
        else {
          slides = config.model.replace(/,/g, ' ').replace("  ", " ").split(" ");
          model.set({
            "slides": {},
            "modules": {},
            "structures": { },
            "storyboard": ["presentation"],
            "storyboards": {
              "presentation": {
                "content": slides
              }
            }
          });

        }
      }
    }

    function at(path) {
      var sb;
      var slidesEl = app.dom.get('slides');
      var state = app.queryParams.state || null;
      if (!path) {
        if (app.model.hasStoryboard(app.env)) {
          path = app.env;
        } else {
          sb = model.getStoryboard();
          if (!sb) throw new Error('No default storyboard or start path defined');
          path = sb[0];
        }
      }
      // app.config.set('startPath', path);
      if (state) {
        app.goTo(path, state);
      }
      else {
        slideshow.__load__(path);
      }
      // Make sure we fetch and load any modules already available in DOM
      app.dom.resolveModules(app.dom.get('wrapper'), "accelerator");
      // Enable transitions
      if (slidesEl) slidesEl.classList.remove('no-transition');
    }

    return {
      init: init,
      at: at
    }

  }(app.model, app.config, app.registry, app.slideshow));

  function locationHashChanged(event) {
    var hash = location.hash.substring(1);
    app.goTo(hash);
    // app.dom.get('wrapper').focus();
  }

  if ("onhashchange" in window) {
    window.onhashchange = locationHashChanged;
  }

  // App keyboard input
  function onDocumentKeyDown(event) {
    // From RevealJS
    // Check if there's a focused element that could be using the keyboard
    var activeElement = document.activeElement;
    var hasFocus = !!(document.activeElement && (document.activeElement.type || document.activeElement.href || document.activeElement.contentEditable !== 'inherit'));
    var customBindings = app.config.get('keyboard');

    // Disregard the event if there's a focused element or a
    // keyboard modifier key is present
    if (hasFocus || (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey) return;

    // While paused only allow "unpausing" keyboard events (b and .)
    if (app.isPaused && [66, 190, 191].indexOf(event.keyCode) === -1) {
      return false;
    }

    var triggered = false;

    // 1. User defined key bindings
    if( customBindings && typeof customBindings === 'object' ) {

      for( var key in customBindings ) {

        // Check if this binding matches the pressed key
        if( parseInt( key, 10 ) === event.keyCode ) {

          var value = customBindings[ key ];

          // Callback function
          if( typeof value === 'function' ) {
            value.apply( null, [ event ] );
          }
          // String shortcuts to reveal.js API
          else if( typeof value === 'string' && typeof app[ value ] === 'function' ) {
            app[ value ].call();
          }

          triggered = true;

        }

      }

    }

    // 2. System defined key bindings
    if (triggered === false) {

      // Assume true and try to prove false
      triggered = true;


      switch (event.keyCode) {
        // page up
        case 33: app.prev(); break;
          // page down
        case 34: app.next(); break;
          // left
        case 37: app.slideshow.step('left'); break;
          // right
        case 39: app.slideshow.step('right'); break;
          // up
        case 38: app.slideshow.step('up'); break;
          // down
        case 40: app.slideshow.step('down'); break;
          // home
        case 36: app.slideshow.first(); break;
          // end
        case 35: app.slideshow.last(); break;
          // space
        case 32: event.shiftKey ? app.prev() : app.next(); break;
          // return
          // case 13: isOverview() ? deactivateOverview() : triggered = false; break;
          // period, Logitech presenter tools "black screen" button
        case 190: case 191: app.togglePause(); break;
          // f
        case 70: app.fullScreen(); break;
        default:
          triggered = false;
      }
    }

    // If the input resulted in a triggered action we should prevent
    // the browsers default behavior
    if (triggered) {
      event.preventDefault();
    }
  }

  function addSwipes() {
    document.addEventListener('swipeleft', app.slideshow.right);
    document.addEventListener('swiperight', app.slideshow.left);
    document.addEventListener('swipeup', app.slideshow.down);
    document.addEventListener('swipedown', app.slideshow.up);
  }

  function removeSwipes() {
    document.removeEventListener('swipeleft', app.slideshow.right);
    document.removeEventListener('swiperight', app.slideshow.left);
    document.removeEventListener('swipeup', app.slideshow.down);
    document.removeEventListener('swipedown', app.slideshow.up);
  }

  function setupSwipeListeners(data) {
    var config = app.config.get();
    if (app.model.isLinear(data.id)) {
      document.removeEventListener('swipeup', app.slideshow.down);
      document.removeEventListener('swipedown', app.slideshow.up);
    }
    else if (config.touch) {
      document.removeEventListener('swipeup', app.slideshow.down);
      document.removeEventListener('swipedown', app.slideshow.up);
      document.addEventListener('swipeup', app.slideshow.down);
      document.addEventListener('swipedown', app.slideshow.up);
    }
  }

  function addEventListeners(keyboard, touch) {
    if (keyboard) {
      document.addEventListener('keydown', onDocumentKeyDown, false);
    }
    if (touch) {
      addSwipes();
    }
  }
}());