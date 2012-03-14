/**
*   jLinkSharer - a link sharing and web scraping plugin for jQuery         **
*   Share, scrape and show external links descriptions and thumbnails       **
*   
*   made in 2012 by Ivan Preziosi - ivan.preziosi[at]gmail[dot]com          **
*                                                                           **
*   This plugin was made taking inspiration and code bits from the work     **
*   of Jake Petroules. As seen on:                                          **
*   http://www.jakepetroules.com/2011/07/12/facebook-style-link-sharing-box **
*                                                                           **
*   version 0.1 - released under GNU LESSER GENERAL PUBLIC LICENSE v.3      **
*   http://www.gnu.org/licenses/lgpl-3.0.txt                                **
*   
*   This program is free software: you can redistribute it and/or modify    **
*   it under the terms of the GNU LGPL as published by                      **
*   the Free Software Foundation, either version 3 of the License, or       **
*   (at your option) any later version.                                     **
*   This program is distributed in the hope that it will be useful,         **
*   but WITHOUT ANY WARRANTY; without even the implied warranty of          **
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           **
*   GNU General Public License for more details.                            **
*                                                                           **
*   You should have received a copy of the GNU Lesser General Public License**
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.   **
**/



JLinkSharer is a plugin for jquery which helps the creation of link sharing services with web scraping capabilities. It provides a very simple interface to create and style your implementation in minutes.

Just follow those simple steps and you will have your link sharing/web scraping system, the 'facebook style' in 10 minutes:

1)Download the package from here. In the package you will find 4 files:

index.html -- is just an example page to show the way to implement it the easy way
jquery.jlinksharer.js -- is the plugin code. you have to import it in your webpage after the jQuery main engine.
jquery-1.7.1.min.js -- is just the jQuery main engine. You can download the latest from http://jquery.com/
proxy.php is a server side proxy you will need to web scrape pages without incurring in the cross domain security problem. You can modify it or replace it with your server side technology of choice.


2)Include the JLinkSharer code in your page like this:
 <script type="text/javascript" src="path/to/jquery.jlinksharer.js"></script>


3)Initialize the plugin like this:

 <script type="text/javascript">
   $(document).ready(function($) {
      $("#linkSharer").jlinksharer();
   });
 </script>
Where #linkSharer is the id of an input field meant to receive the string containing the url to scrape.



You can also define some properties to customize its parameters:

proxy : you can change the proxy used to collect data from the web (defaults: "proxy.php")
event : the event to bind to the field used to immit the link to be shared (deaults: "blur")
titleField : give a jQuery selector to identify elements to fill with the title informations of the scraped page. It will try to fill html() and val() to ensure you will get your element filled right away. (defaults:$('.JLinkSharer-title-field'))
descField : give a jQuery selector to identify elements to fill with the description informations of the scraped page. It will try to fill html() and val() to ensure you will get your element filled right away. (defaults:$(".JLinkSharer-desc-field"))
urlField : give a jQuery selector to identify elements to fill with the url of the scraped page. It will try to fill html() and val() to ensure you will get your element filled right away. (defaults:$(".JLinkSharer-url-field"))
imageField : give a jQuery selector to identify elements to fill with the selected thumbnail image src data. (useful to post data of the shared link images src) It will try to fill html() and val() to ensure you will get your element filled right away. (defaults:$(".JLinkSharer-image-field"))
imageElement : give a jQuery selector to identify img elements to have the src attribute filled with selected thumbnail. (defaults:$("img.JLinkSharer-image"))
loading : a bit of code to be evaluated when jlinksharer starts loading the infos. (defaults: alert("loading");)
loaded : a bit of code to be evaluated when jlinksharer finishes loading the infos. (defaults: alert("loaded");)
prevButton : id of the element to be binded to the prev button event for browsing thumbnails (defaults: jLinkSharerPrev)
nextButton : id of the element to be binded to the next button event for browsing thumbnails (defaults: jLinkSharerNext)
