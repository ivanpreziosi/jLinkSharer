/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   					JLinkSharer a link sharing plugin             			             //
//   			Share and show external links in a social way   				  //
//   			This plugin was made taking inspiration and                                      //
//   			code bits from the work of Jake Petroules                                          //
//   as seen on:                                                                                                               //
//   http://www.jakepetroules.com/2011/07/12/facebook-style-link-sharing-box   //
//   made in the beginning of 2012 by Ivan Preziosi (ivan.preziosi@gmail.com) 	 //
//                                                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



/* 
 * jLinkSharer by Ivan Preziosi
 */
jQuery.fn.jlinksharer = function(options) {
	
    //configurations goes here
    var defaults = {
        proxy : "proxy.php",                        //the server side proxy used to overcome the XHR cross domain limitations
        event : 'blur', 							//event to bind to start grabbing the link
        titleField: $(".JLinkSharer-title-field"),  //selector which defines which elements to be filled with the link title
        descField: $(".JLinkSharer-desc-field"),    //selector which defines which elements to be filled with the link description
        urlField: $(".JLinkSharer-url-field"),    	//selector which defines which elements to be filled with the link url
        imageField: $(".JLinkSharer-image-field"),	//selector which defines which elements to be filled with the image src (useful to post data of the shared link images src)
        imageElement: $("img.JLinkSharer-image"), 	//selector which defines which image elements to be filled with the link image src
        images: new Array(),						//will contain all grabbed images src
        imagesCounter: 0, 							//counter used internally to cycle between all grabbed images
        raw: '',									//the raw data downloaded from link
        title: '',									//the page title parsed from raw data
        description: '',							//the page description parsed from raw
        url:'',                                                                          //the url you want to share
        loading: 'alert("loading");',   //a bit of code to be avaluated when jlinksharer starts loading the infos
        loaded:'alert("loaded");',       //a bit of code to be evaluated when jlinksharer has ended loading
        prevButton : "jLinkSharerPrev",  //id of the element to be binded to the prev button event
        nextButton: "jLinkSharerNext"  //id of the element to be binded to the next button event
    };
					
	

    //inherit provided configurations
    var options = $.extend(defaults, options);

    return this.each(function() {
        var $this = $(this); //cache jQuery object of the element invoked on

        var data = $this.data("test");
		
        //start grabbing page at specified url
        var getData = function(){
            var lig;
            eval(options.loading);
            $.ajax({
                url:options.proxy+"?url="+$this.val(),
                async: false,
                success: function(data) {
                    lig = data;
                    eval(options.loaded);
                }
            });
            options.raw = lig;
            options.title = getLinkTitle();
            options.description = getLinkDescription();
            options.images = getImageUrls();
            options.url = $this.val();
            fillFields();
        }


        /*
		 * Gets the title of the link by trying the following in order
		 * until it finds a string or returns an empty string:
		 * * Contents of the first title tag
		 * * Contents of the first h1 tag
		 */
        var getLinkTitle = function(){
            var title = '';

            // Try the first title tag
            $(options.raw).filter('title').each(function() {
                title = $(this).text();
                return false;
            });
            if (!isBlank(title))
                return title;

            // No luck, first h1 tag?
            $('h1', options.raw).each(function() {
                title = $(this).text();
                return false;
            });
            if (!isBlank(title))
                return title;

            return 'title not found';
        }


        /*
		 * Gets a description of the link by trying the following in order
		 * until it finds a string or returns an empty string:
		 * * Contents of the first meta tag with the name attribute set to "description"
		 * * Contents of the first p tag
		 * * Contents of the first div tag
		 */
        var getLinkDescription = function() {
            var description = '';

            // Look through the meta tags and find the first one
            // that is a description tag; if we find one, return its
            // content and we're done
            $(options.raw).filter('meta').each(function() {
                if ($(this).attr('name') == 'description') {
                    description = $(this).attr('content');
                    if(description.length>2){
                        return false;
                    }else{
                        description = '';
                    }
                }
            });
            if (!isBlank(description))
                return description;

            // No meta description? How about paragraphs?
            $('p', options.raw).each(function() {
                description = $(this).text();
                if(description.length>2){
                    return false;
                }else{
                    description = '';
                }
            });
            if (!isBlank(description))
                return description;

            // Nope, try divs?
            $('div', options.raw).each(function() {
                description = $(this).text();
                if(description.length>2){
                    return false;
                }else{
                    description = '';
                }
            });
            if (!isBlank(description))
                return description;

            return 'description not found';
        }


        /*
		 * Gets an array of all the URLs of the img tags on the page.
		 */
        var getImageUrls = function() {
            var urls = new Array();
            $('*', options.raw).each(function() {
                if ($(this).attr('src')) {
                    if (isValidUrl($(this).attr('src'))) {
                        urls.push($(this).attr('src'));
                    }
                }

                if ($(this).attr('style')) {
                    var urlsFromStyle = $(this).attr('style').match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
                    if (urlsFromStyle != null) {
                        $.each(urlsFromStyle, function(i, url) {
                            if (isValidUrl(url)) {
                                urls.push(url);
                            }
                        });
                    }
                }
            });
            options.imagesCounter = 0;
            return eliminateDuplicates(urls);
        }

        // a utility method to fill all of the field in one go
        var fillFields = function() {
            showImage();
            showTitle();
            showDescription();
            showUrl();
        }

        var showImage = function() {
            options.imageElement.each(function(){
                $(this).attr("src", options.images[options.imagesCounter]);
            });

            options.imageField.each(function(){
                $(this).val( options.images[options.imagesCounter]);
            });
        }

       var showTitle = function() {
            options.titleField.each(function(){
                $(this).html(options.title); //in case its a div or similar, we fill html
                $(this).val(options.title); //in case is a form field we fill the value
            });
        }

        var showDescription = function() {
            options.descField.each(function(){
                $(this).html(options.description); //in case is a div or similar, we fill html
                $(this).val(options.description); //in case is a form field we fill the value
            });
        }
		
        var showUrl = function() {
            options.urlField.each(function(){
                $(this).html("<a href='"+options.url+"' target='_blank'>"+options.url+"</a>"); //in case is a div or similar, we fill html
                $(this).val(options.url);  //in case is a form field we fill the value
            });
            
        }

        var getPrevImage = function(){
            options.imagesCounter--;
            if(options.imagesCounter < 0){
                options.imagesCounter = options.images.length-1;
            }
            showImage();
        }

        var getNextImage = function(){
            options.imagesCounter++;
            if(options.imagesCounter == options.images.length){
                options.imagesCounter = 0;
            }
            showImage();
        }

		
        var isEmpty = function (str) {
            return (!str || 0 === str.length);
        }
		
        var isBlank = function (str) {
            return (!str || /^\s*$/.test(str));
        }

        var isValidUrl = function (url) {
            return /\.(jpg|jpeg|gif|png)$/i.test(url);
        }


        var eliminateDuplicates = function (arr) {
            var i, len = arr.length, out = [], obj = { };

            for (i = 0; i < len; i++) {
                obj[arr[i]] = 0;
            }

            for (i in obj) {
                out.push(i);
            }

            return out;
        }


		
        //fire grabbing on the invoked element using the provided event
        $this.bind(options.event, function(){
            getData();
        });

        $("#"+options.prevButton).bind("click",function(){
            getPrevImage();
        })

        $("#"+options.nextButton).bind("click",function(){
            getNextImage();
        })
		
    });

};




/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}