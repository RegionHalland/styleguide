<?php
//Enable/disable all errors
/*if (true) {
    error_reporting(E_ALL);
    ini_set('error_reporting', E_ALL);
}*/
//Run application
//require_once 'Bootstrap.php';
$loader = require __DIR__ . '/vendor/autoload.php';
$loader->addPsr4('Styleguide\\', __DIR__ . '/src/php');

new \Styleguide\App();