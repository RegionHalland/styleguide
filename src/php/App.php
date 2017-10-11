<?php
namespace Styleguide;

use Philo\Blade\Blade;
define('DOCUMENTATION_SASS_PATH', './docs/docs.json');

class App {
	

	public function __construct()
	{
	    //$this->page = isset($_GET['p']) ? $_GET['p'] : 'home';
	    $actual_link = explode("/", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
	    $this->view = last($actual_link) ?  "section" : 'home';
	    $this->page = last($actual_link) ? last($actual_link) : 'home';
	    $this->pageParent = $actual_link[3] ? $actual_link[3] : 'home' ;
	    //die();

	    /*$this->documentation = json_decode(file_get_contents(DOCUMENTATION_SASS_PATH));
	    $this->createCacheDir();
	    $this->loadPage();*/


		$views = __DIR__ . '/views';
		$cache = __DIR__ . '/cache';
		$blade = new Blade($views, $cache);
		$this->documentation = json_decode(file_get_contents(DOCUMENTATION_SASS_PATH));
		//print_r($this->loadNavigation());
		//die();

		//die();
		echo $blade->view()->make($this->view, [
			"nav" => $this->documentation->nav,
			"section" => $this->documentation->pages->{"$this->pageParent"}->{"$this->page"}
		])->render();
		
		//var_dump($this->documentation = json_decode(file_get_contents(DOCUMENTATION_SASS_PATH)));
	    //echo '123';
	}

	 /**
     * Reads the navigation from the json
     * @return object Navigation
     */
    public function loadNavigation()
    {
        $nav = (array)$this->documentation->nav;
        ksort($nav);
        return (object)$nav;
    }
}