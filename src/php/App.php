<?php
namespace Styleguide;

use Philo\Blade\Blade;
use Dotenv\Dotenv;
define('DOCUMENTATION_SASS_PATH', './docs/docs.json');

class App {
	

	public function __construct()
	{
		//$this->page = isset($_GET['p']) ? $_GET['p'] : 'home';
		$actual_link = explode("/", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
		$this->view = last($actual_link) ?  "section" : 'home';
		$this->page = last($actual_link) ? last($actual_link) : '';
		$this->pageParent = $actual_link[3] ? $actual_link[3] : '';
		//die();
		$this->documentation = json_decode(file_get_contents(DOCUMENTATION_SASS_PATH));
		
		if ($this->pageParent !== '') {
			$this->section = $this->documentation->pages->{"$this->pageParent"}->{"$this->page"};
		} else {
			$this->section = [];
		}

		//Add .env file
		$dotenv = new Dotenv(ROOT_PATH);
		$dotenv->load();

		$views = __DIR__ . '/views';
		$cache = __DIR__ . '/cache';
		$blade = new Blade($views, $cache);
		//print_r($this->loadNavigation());
		//die();

		//die();
		echo $blade->view()->make($this->view, [
			"nav" => $this->documentation->nav,
			"section" => $this->section
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