<?php 
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

if (isset($_GET['url'])) 
{      
    $handle = fopen($_GET['url'], "r"); 
    if ($handle) 
    { 
        while (!feof($handle)) 
        { 
            $buffer = fgets($handle, 4096); 
            echo $buffer; 
        } 
         
        fclose($handle); 
    } 
} 

?>
