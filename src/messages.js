/**
* Module that contains the message output implementations.
* Depends on core.js, anim.js
*/
(function($) {
  if (typeof JSAV === "undefined") { return; }
  
  var MessageHandler = function(jsav, output) {
    this.jsav = jsav;
    this.output = output;
    if (this.output && "title" in jsav.options) {
      this.output.html("<div class='jsavtitle'>" + jsav.options.title + "</div>");
    }
  };
  MessageHandler.prototype.umsg = JSAV.anim(function(msg, options) {
    if (!this.jsav.RECORD) { // trigger events only if not recording
      $(this.jsav.container).trigger("message", [msg, options]); 
    }
    var opts = $.extend({color: "black", preserve: false}, options);
    if (this.output) {
      if (this.output.hasClass("line") && opts.preserve) {
        this.output.find("div:last").append("<span style='color:" + opts.color + ";'>" + msg + "</span>");
      } else if (this.output.hasClass("line")) {
        this.output.html("<div style='color:" + opts.color + ";'>" + msg + "</div>");
      //} else if (this.output.hasClass("scroll")) {
      } else { // e.g. "scroll", which is default
        this.output.append("<div style='color:" + opts.color + ";'>" + msg + "</div>");
        this.output[0].scrollTop = this.output[0].scrollHeight;
      }      
    }
    return this;
  });
  MessageHandler.prototype.clear = JSAV.anim(function() {
    if (this.output) {
      this.output.html("");
    }
  });
  
  MessageHandler.prototype.state = function(newValue) {
    if (newValue) {
      this.output.html(newValue);
    } else {
      return this.output.html() || "<span/>";
    }
  };
  
  JSAV.ext.umsg = function(msg, options) {
    this._msg.umsg(msg, options);
  };
  JSAV.ext.clearumsg = function(msg, options) {
    this._msg.clear();
  };
  
  JSAV.init(function(options) {
    var output = $(this.container).find(".output");
    this._msg = new MessageHandler(this, output);
  });
}(jQuery));
