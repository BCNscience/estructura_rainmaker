app.register("ap-follow-up-mail", function() {

  var self;
  var address = "";
  var subject = "Reference to our meeting"; //"Dateien/Referenzen aus unserem Gespräch";

  return {
    publish: {
       },
    events: {
      "tap .sendButton": "sendMailHandler",
      "tap .library .emailAttachmentToggler": "emailAttachmentHandler",
      "tap .clearButton": "clear"

    },
    states: [
      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;

      app.$.on('open:ap-follow-up-mail', function () {
        if(this.stateIsnt("visible"))
          this.show();
      }.bind(this));

      app.$.on('close:ap-follow-up-mail', function () {
        this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        this.hide();
      }.bind(this));

      self.bodyText = "Dear Customer,<br /><br />in reference to our meeting, please find attached the following documents.<br /><br />Best regards<br />Your Bayer team <br /><br /><hr />";


      var presentationName = app.config.get('name');

      localStorage.removeItem(presentationName + ":attachmentStorage");

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      app.unlock();
      this.reset();
    },

    show: function () {
      app.lock();
      this.goTo('visible');

    },

    sendMailHandler: function(){

      //var generalBodyText = "Dear Customer,<br /><br />in reference to our meeting, please find attached the following documents.<br /><br />Best regards<br />Your Bayer team"; //Sehr geehrter Kunde,<br /><br />anbei finden Sie wie gewünscht die folgenden Dateien/Referenzen aus unserem Gespräch.<br /><br />Mit freundlichen Grüßen,<br />Ihr Bayer Team",

      var presentationName = app.config.get('name');
      var storageNamespace = presentationName + ":attachmentStorage";
      var collectedAttachments = Object.keys(JSON.parse(localStorage[storageNamespace] || "{}"));

      var fileAttachments = [];


      // Attachments that don't represent real files are writen into the body text,
      // all others are being attached as files:
      $.each(collectedAttachments, function (index, attachment) {
        var contentRegex = /^content\:\/\//;
        var urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        if (contentRegex.test(attachment)) {
          self.bodyText += "<br /><br />";
          self.bodyText += attachment.replace(contentRegex, "");
        } else if (urlRegex.test(attachment)) {
          self.bodyText += "<br /><br />";
          self.bodyText += attachment;
        } else {
          fileAttachments.push(attachment);
        }
      });

      // Hand over to agnitio native mail dialog:
      console.log('ag.sendMail("' + address + '", "' + subject + '", "' + self.bodyText + '",', fileAttachments, ")");
      ag.sendMail(address, subject, self.bodyText, fileAttachments);
    },

    emailAttachmentHandler: function(event){
      var filename = $(event.target).parent("li").attr("data-file");
      var $movedDown = $(".attachments ul li[data-file='"+filename+"']");
      $(".attachments ul").append($movedDown);
    },

    clear: function(event){
      $(".mail [data-file][data-is-attached='true'] .emailAttachmentToggler").each(function() {
        // touchy custom events doesn't support jquery trigger
        var tapEvent = document.createEvent('UIEvents');
        tapEvent.initEvent("tap", true, true);
        this.dispatchEvent(tapEvent);
      });
    }

  }

});