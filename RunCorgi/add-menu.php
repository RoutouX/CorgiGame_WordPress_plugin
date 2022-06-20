<?php

add_action("admin_menu", "addMenu");
function addMenu(){
    add_menu_page("RunCorgi Option", "RunCorgi Option", "4", "menu_runcorgi_option", "optionMenu");
}

function optionMenu()
{
    if (shortcode_exists("RunCorgi")) {
        echo "
    <h1 style='text-align: center'>Option:</h1>
    <ul>
        <li><h>Short Code = [jeux_chien]</h></li>   
    </ul>
    ";
    }else{
        echo "Err cant create short code";
    }
}


