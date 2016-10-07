app.register("ap-custom-collections-storage", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    onRender: function(el) {

      if(app.config.get('name') === "Bayer Health Care Rainmaker Template (replace with the name of your presentation)")
        console.error("### Please update the name of the presentation in the config.json ###");

      self = this;
      app.$.customCollectionsStorage = this;
    },

    /**
     * Deletes the custom collection named collectionName from the localStorage
     *
     * @method delete
     * @param {string} collectionName
     */
    delete : function(collectionName){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();
      delete(customCollections[collectionName]);
      app.model.deleteStoryboard(collectionName);
      localStorage[storageNamespace] = JSON.stringify(customCollections);

      //customCollectionsStorage.isFavorite(collectionName, false);
    },
    /**
     * returns all custom collections as an associative array from collection name to collection representation
     *
     * @method getAll
     */
    getAll : function(){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      try{
        return JSON.parse(localStorage[storageNamespace] || "{}");
      } catch (e){
        console.log("Custom Presentations storage is corrupt or empty and will be reseted: "+JSON.stringify(e));
        delete(localStorage[storageNamespace]);
      }
      return {};
    },
    /**
     * Adds a custom collection to the localStorage
     *
     * @method add
     * @param {string} collectionName name of the collection to store
     * @param {string} collectionObject object representation of the collection
     */
    add : function(collectionName, collectionObject){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();

      customCollections[collectionName] = collectionObject;

      localStorage[storageNamespace] = JSON.stringify(customCollections);
    },
    /**
     * returns the stored collection with the provided name
     *
     * @method get
     * @param {string} collectionName
     */
    get : function(collectionName){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var collection = self.getAll()[collectionName];

      if (collection == undefined || Array.isArray(collection.presentation) === false){
        return undefined;
      }

      var invalidSlidesCount = 0;
      collection.presentation = collection.presentation.map(function(slideshow){
        return slideshow.filter(function(slideId){
          if (app.model.get().slides[slideId] === undefined){
            invalidSlidesCount++;
            return false;
          }
          return true;
        });
      }).filter(function(slideshow){
        return slideshow.length > 0;
      });

      if (invalidSlidesCount > 0) {
        var errorMsg = translation["MISSING_PRESSENTATIONS_TITLE"]
            .replace("$INVALID_SLIDES_COUNT$", invalidSlidesCount);
        apprise(errorMsg, {textOk: translation["OK"]});
        self.add(collectionName, collection);
      }

      return collection;

    },
    /**
     * renames a stored collection without changing its position (e.g. collections order returned by getAll)
     *
     * @method rename
     * @param {string} oldName
     * @param {string} newName
     */
    rename : function(oldName, newName){
      //rename presentation keeping the presentation order
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections={};
      $.each(self.getAll(),function(name, object){
        if(name==oldName){
          $.each(object.slideshows, function(name, slideshow){
            slideshow.name = slideshow.name.replace(oldName,newName);
          });
          object.name = newName;
        }
        customCollections[(name==oldName) ? newName : name ] = object;

      });
      //var isFavorite = customCollectionsStorage.isFavorite(oldName);
      //customCollectionsStorage.isFavorite(oldName, false);
      //customCollectionsStorage.isFavorite(newName, isFavorite);
      localStorage[storageNamespace] = JSON.stringify(customCollections);
    },

    /**
     * returns all stored favorite collections
     *
     * @method getFavorites
     *
     */
    getFavorites : function(){

      var collections = self.getAll();

      var favorites = [];

      $.each(collections,function(collectionName,collectionObject){
        if(collectionObject.isFavorite)
          favorites.push(collectionObject);
      });

      return favorites;

    },
    /**
     * returns all stored favorite collections
     *
     * @method updateOrder
     *
     */
    updateOrder : function(order){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      var customCollections = self.getAll();
      var newCustomCollections = {};

      //clear old order
      var backUp =  localStorage[storageNamespace];
      localStorage[storageNamespace] = JSON.stringify({});

      //set new order
      try{
        $.each(order,function(index,name){
          newCustomCollections[name] = customCollections[name];
        });
      }catch(e){
        localStorage[storageNamespace] = backUp;
      }


      localStorage[storageNamespace] = JSON.stringify(newCustomCollections);
    },

    /**
     * store all custom-collections
     *
     * @method saveAll
     *
     */
    saveAll : function(customPresentations){
      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":CustomCollections";
      localStorage[storageNamespace] = JSON.stringify(customPresentations);
    }
  }

});