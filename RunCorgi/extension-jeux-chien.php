<?php

/*
Plugin Name: RunCorgi
Plugin URI: https://github.com/RoutouX/CorgiGame_WordPress_plugin
Description: add a corgi runner
Version: 1.0
Author: RoutouX
Author URI: https://github.com/RoutouX/CorgiGame_WordPress_plugin
License: MIT
*/

add_shortcode("RunCorgi", "ajoutJeuxChien");

include_once "add-menu.php";

function ajoutJeuxChien($atts = [], $content = null){
    $pageHtml = file_get_contents(plugin_dir_url(dirname( __FILE__))."RunCorgi/jeuxChien.html");
    $pageHtml = str_replace("%dir%", plugin_dir_url(dirname( __FILE__)), $pageHtml);
    $content = $content.$pageHtml;
    return $content;
}