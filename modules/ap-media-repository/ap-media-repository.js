app.register("ap-media-repository", function () {


    /**
     * Implements a database interface for accessing meta information of media content.
     * --------------------------------------------------------------------------------
     *
     * The media repository provides search and rendering capability
     * of arbitrary media information and content based on meta data
     * defined in a json file. Within this json file arbitrary meta
     * data can be associated with any type of file or content.
     * The solution is relying heavily the "convention over configuration" principle.
     *
     * Anatomy of a media entry:
     *
     *     // It's key can be any kind of unique string:
     *     // An example convention might be to put in the file path
     *     // of a real file the meta data should be associated with:
     *     "content/pdf/reference_01.pdf": {
	 *         // Meta data is defined as attributes. Those can really
	 *         // be completely arbitrary as long as there is a renderer
	 *         // implemented that is capable of processing these values.
	 *         // Currently string, number and boolean are the types of
	 *         // object values supported by the search/find functionality.
	 *         "title": "Doe J, Lorem Ipsum 1. 2005",
	 *         "referenceId": 3,
	 *         "allowDistribution": true,
	 *         "tags": "document pdf publication reference 3"
	 *     },
     *
     * Apart from searching, each media entry can also be rendered into
     * DOM via "renderers", e.g. in order to be displayed inside a list.
     * For each "type" of media (which is completely up to the developer to be defined),
     * a separate renderer must be implemented and registered at the media repository.
     * When a media entry is about to be rendered, the media repository uses the
     * renderer that matches first the media type of the file or content of the entry
     * (first come first serve at registration time).
     *
     * Anatomy of a media renderer:
     *
     *     MediaRepository.addRenderer({
	 *         // Regular expression used to determine what "type" of
	 *         // media entries are accepted by this renderer:
	 *         regex: <some regular expression>,
	 *         // Function returning a jQuery DOM element representing that
	 *         // media entry based on the filename or content as well as meta data
	 *         render: function (fileOrContent, meta, options) {
	 *             return <some generated jQuery DOM element>;
	 *         }
	 *     });
     **/


    var _metadata;
    var _renderers;


    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            window.mediaRepository = this; // export globally
            window.mediaRepository.load("media.json"); // load database file

            var createBasicMediaEntry; //forward declaration

            // Content:
            window.mediaRepository.addRenderer({
                regex: /^content\:\/\//,
                render: function (file, meta, options) {
                    return createBasicMediaEntry(file, meta, $.noop)
                        .addClass('content')
                        .append("<span class='title'>" + file.replace("content://", "") + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // PDF:
            window.mediaRepository.addRenderer({
                regex: /\.(pdf)$/,
                render: function (file, meta, options) {
                    options = $.extend({
                        onTap: function () {
                            console.log('ag.openPDF("' + file + '", "' + meta.title + '")');
                            ag.openPDF(file, meta.title);
                        }
                    }, options);
                    return createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('pdf')
                        .append("<span class='title'>" + (meta.title || "") + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // URL:
            window.mediaRepository.addRenderer({
                /* http://blog.mattheworiordan.com/post/13174566389 */
                regex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
                render: function (file, meta, options) {
                    options = $.extend({
                        shouldAllowTap: function () {
                            return true;
                        },
                        onTap: function () {
                            console.log('window.open("' + file.replace(/^(https?|ftp)/, "agnitiodefaultbrowser") + '", "' + meta.title + '")');

                            //iOS Fix until Agnitio fixes their ag.openUrl function
                            //window.open(file.replace(/^(https?|ftp)/, "agnitiodefaultbrowser"));

                            ag.openURL(file, meta.title);


                        }
                    }, options);
                    return createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('url')
                        .append("<span class='title'>" + (meta.title || "") + "</span>")
                        .append("<span class='url'>(" + file + ")</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                }
            });

            // Video (with thumbnail):
            // Expecting a PNG thumbnail image by convention
            // e.g. thumbnail for "content/video/my_movie.mp4" is expected to be "content/video/my_movie.mp4.png"
            window.mediaRepository.addRenderer({
                regex: /\.(mov|mp4|m4v)$/,
                render: function (file, meta, options) {
                    options = $.extend({
                        onTap: function () {
                            $("<div class='videoPopup'><video src='" + file + "' controls/><div class='close'></div></div>")
                                .on("swipedown swipeup swiperight swipeleft", function (e) {
                                    e.stopPropagation();
                                })
                                .on("tap", function (event) {
                                    if ($(event.target).is(":not(video)")) $(this).remove();
                                }).appendTo("#presentation");
                            var v = $("#presentation").find('.videoPopup video').get(0)
                            if (v.load) v.load()
                        }
                    }, options);
                    var entry = createBasicMediaEntry(file, meta, options.onTap)
                        .addClass('video')
                        .append("<span class='title'>" + meta.title + "</span>")
                        .append("<span class='tags'>" + (meta.tags ? "[" + meta.tags + "]" : "") + "</span>");
                    entry.find(".icon").css({
                        "background-image": "url('" + file + ".png')",
                        "background-size": "contain"
                    });
                    return entry;
                }
            });

            createBasicMediaEntry = function (file, meta, onTap) {
                var presentationName = app.config.get('name');
                var storageNamespace = presentationName + ":attachmentStorage";
                var attachmentStorage = JSON.parse(localStorage[storageNamespace] || "{}");

                var $emailAttachmentToggler = null;
                if (meta.allowDistribution) {
                    $emailAttachmentToggler = $("<div class='emailAttachmentToggler' />");
                    $emailAttachmentToggler.on("tap", function (e) {
                        attachmentStorage = JSON.parse(localStorage[storageNamespace] || "{}");

                        var file = $(this).parent().attr("data-file");
                        var isAttached = !attachmentStorage[file];
                        if (isAttached) {
                            attachmentStorage[file] = true;
                        } else {
                            delete(attachmentStorage[file]);
                        }
                        localStorage[storageNamespace] = JSON.stringify(attachmentStorage);
                        $("[data-file='" + file + "']").attr("data-is-attached", isAttached);
                    });
                }

                return $("<li/>")
                    .addClass('mediaEntry')
                    .attr("data-file", file)
                    .attr("data-is-attached", !!attachmentStorage[file])
                    .append($emailAttachmentToggler)
                    .append("<div class='icon' />")
                    .append(meta.referenceId ? "<div class='referenceId'>[" + meta.referenceId + "]</div>" : "")
                    .on("tap", ":not(.emailAttachmentToggler)", function () {
                        onTap.apply(this);
                    });
            };
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        /**
         * Loads a JSON file containing meta data in an object for later runtime use.
         *
         * @method load
         * @param {String} file Path of file containing meta data.
         */
        load: function (file) {
            _metadata = {};
            _metadata = JSON.parse(app.cache.get(file));
            if (!_metadata) {
                $.ajax({
                    url: file,
                    dataType: "json",
                    success: function (json) {
                        _metadata = json;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        throw "Error loading media repository metadata file '" + file + "': " + textStatus;
                    },
                    async: false
                });
            }
        },
        /**
         * Returns the meta data object representing the meta database at runtime.
         *
         * @method metadata
         * @return {Object} Reference to the meta data object.
         */
        metadata: function () {
            return _metadata;
        },
        /**
         * Searches through the meta data object for given search terms in given attributes.
         *
         * @method find
         * @param {String} [searchTerms] Search terms separated by whitespaces. If not specified, all entries will be returned.
         * @param {String|Array} [attributesToBeSearched] Meta attribute keys whose values should be searched for searchTerms. If not specified, all attributes are being searched.
         * @return {Object} Hash containing found media entries or null if nothing was found.
         */
        find: function (searchTerms, attributesToBeSearched) {

            var searchTerms = searchTerms || "";
            var searchTerms = searchTerms.toLowerCase().split(/\s+/g);
            if (typeof attributesToBeSearched === "string") {
                attributesToBeSearched = [attributesToBeSearched];
            }
            var results = null;
            $.each(_metadata, function (file, meta) {
                var haystack = "";

                if (attributesToBeSearched) { // search only specific attributes
                    $.each(attributesToBeSearched, function (index, attributeToBeSearched) {
                        var attrVal = meta[attributeToBeSearched];
                        if (attrVal && (typeof attrVal === "string"
                            || typeof attrVal === "number"
                            || typeof attrVal === "boolean")) {
                            haystack += attrVal.toString() + " ";
                        }
                    });
                } else { // search all
                    $.each(meta, function (attrKey, attrVal) {
                        if (typeof attrVal === "string" || typeof attrVal === "number" || typeof attrVal === "boolean") {
                            haystack += attrVal.toString() + " ";
                        }
                    });
                }
                if (haystack.length > 0) {
                    haystack = haystack.toLowerCase();
                    var found = searchTerms.reduce(function (found, searchTerm) {
                        return found && (haystack.indexOf(searchTerm) !== -1);
                    }, true);
                    if (found) {
                        results = results || {};
                        results[file] = meta;
                    }
                }
            });
            return results;
        },
        /**
         * Adds a renderer to the renderer chain.
         *
         * @method addRenderer
         * @param {Object} Renderer to be added.
         */
        addRenderer: function (renderer) {
            _renderers = _renderers || [];
            _renderers.push(renderer);
        },
        /**
         * Renders a media entry. Uses the first matching renderer in the renderer chain.
         *
         * @method render
         * @param {String} file Media entry key.
         * @param {Object} meta Media entry meta data.
         * @param {Object} options Attributes passed to the designated renderer.
         * @return {jQuery Element} Rendered jQuery Element ready to be inserted into the DOM.
         */
        render: function (file, meta, options) {
            var renderer = _renderers.reduce(function (bestRenderer, currentRenderer) {
                return bestRenderer || (currentRenderer.regex.test(file) && currentRenderer)
            }, undefined);
            if (!renderer) console.log("Warning: no renderer found for media resource ", file);
            else return renderer.render(file, meta, options);
        }
    }

});