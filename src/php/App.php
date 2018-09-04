<?php
namespace Styleguide;

use Philo\Blade\Blade;
use Dotenv\Dotenv;

class App {

	private $views = __DIR__ . '/views';
	private $cache = __DIR__ . '/cache';
	private $dssPath = './docs/docs.json';

	public function __construct()
	{
		// Load environment file
		$dotenv = new Dotenv(ROOT_PATH);
		$dotenv->load();

		// Get generated DSS documentation
		$this->documentation = json_decode(file_get_contents($this->dssPath));
		$view = $this->getView();

		// // Bestämmer om HOME eller SECTION ska renderas
		// $actual_link = explode("/", "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
		// $this->view = last($actual_link) ?  "section" : 'home';

		// //var_dump($_SERVER['REQUEST_URI']);

		
		// //var_dump($actual_link[3]);
		// $this->pageParent = $actual_link[3] ? $actual_link[3] : '';
		// //var_dump(last($actual_link));
		// $this->page = last($actual_link) ? last($actual_link) : '';

		$blade = new Blade($this->views, $this->cache);

		echo $blade->view()->make($view, [
			"nav" => $this->documentation->nav,
			"data" => $this->getData()
		])->render();

	}

	/**
	* Returns what view to render
	* @return string
	*/
	public function getView()
	{	
		// Remove empty strings from array
		$paths = $this->getPaths();

		//var_dump($this->getData());
		
		// If there are no paths, return home
		if (empty($paths)) {
			return 'home';
		}

		return 'section';
	}

	/**
	* Returns documentation data for the views
	* @return string
	*/
	public function getData()
	{
		$paths = $this->getPaths();
		$pages = $this->documentation->pages;

		$data = [];

		var_dump($paths);

		foreach ($paths as $key => $value) {
			if (!isset($pages->{"$value"}))
				break;

			if ($value === end($paths)) {
				$data = $pages->{"$value"};
			}

			$pages = $pages->{"$value"};
		}

		return $data;
	}

	/**
	* Returns array of request paths
	* @return array
	*/
	public function getPaths()
	{
		// Explode request path at slashes
		$paths = explode("/", $_SERVER['REQUEST_URI']);
		// Remove empty strings from array
		return array_filter($paths, function($element) { return $element !== ''; });
	}

	/**
    * Reads the navigation from the json
    * @return object
    */
	public function loadNavigation()
	{
		$nav = $this->documentation->nav;
		ksort($nav);
		return $nav;
	}
}