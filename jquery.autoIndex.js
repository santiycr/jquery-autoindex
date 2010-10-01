(function( $ ){

  function string_to_slug(str) {
    //http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    
    var from = "Ã Ã¡Ã¤Ã¢Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®Ã²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã±Ã§Â·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(from[i], to[i]);
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  }

  $.fn.autoIndex = function( options ) {  

    var settings = {
      'htag': 'h1',
      'ol': false,
      'backLinks': false
    };
      
    // If options exist, lets merge them
    // with our default settings
    if ( options ) { 
      $.extend( settings, options );
    }

    // Creating list
    if (settings.ol) {
      listTag = "ol";
    } else {
      listTag = "ul";
    }
    indexList = $("<" + listTag + " id=\"autoIndex\"/>");

    idsArray = [];
    // Tooltip plugin code here
    $(settings.htag).each(function() {
      heading = $(this);
      titleText = heading.text();
      if (! heading.attr("id")) {
        slug = string_to_slug(titleText);
        while ($.inArray(slug, idsArray) > -1) {
          slug += "-next";
        }
        heading.attr("id", slug);
      }
      titleId = heading.attr("id");
      idsArray.push(titleId);

      html = "<li><a href=\"#" + titleId + "\">" + titleText + "</a>";
      indexList.append(html);
      if (settings.backLinks) {
        heading.before("<a href=\"#autoIndex\" style=\"float:right;font-size:70%;\">Back</a>");
      }
    });

    if ($.inArray(window.location.hash, idsArray) > -1) {
      $("#" + window.location.hash).focus().blur();
      // hack to scroll to heading after generating the ids
    }

    return this.each(function() {
      $(this).append(indexList);
    });

  };
})( jQuery );
