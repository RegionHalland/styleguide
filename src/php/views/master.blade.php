<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
	<link rel="stylesheet" type="text/css" href="../dev/css/main.min.css">
	<link rel="stylesheet" type="text/css" href="../dev/css/presentation.min.css">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body class="">
	<div class="support-header clearfix">
		<div class="col-12 sm-col-10 mx-auto">
			<a class="support-header__skip-link" href="">Hoppa till innehåll</a>
			<ul class="support-header__links">
				<li class="support-header__item has-dropdown">
					<button class="support-header__link" href="">
						<span class="support-header__link-text">Region Hallands Webbplatser</span>
						<svg class="support-header__icon  icon icon--sm">
							<use xlink:href="#caret-bottom"/>
						</svg>
					</button>
					<ul class="support-header__dropdown">
						<li>
							<a href="" class="support-header__dropdown-link">
								<span>www.regionhalland.se</span>
								<svg class="support-header__dropdown-icon  icon icon--sm">
									<use xlink:href="#share-boxed"/>
								</svg>
							</a>
						</li>
						<li>
							<a href="" class="support-header__dropdown-link">
								<span>www.regionhalland.se</span>
								<svg class="support-header__dropdown-icon  icon icon--sm">
									<use xlink:href="#share-boxed"/>
								</svg>
							</a>
						</li>
						<li>
							<a href="" class="support-header__dropdown-link">
								<span>www.regionhalland.se</span>
								<svg class="support-header__dropdown-icon  icon icon--sm">
									<use xlink:href="#share-boxed"/>
								</svg>
							</a>
						</li>
					</ul>
				</li>
				<li class="support-header__item">
					<a class="support-header__link" href="">
						<span class="support-header__link-text">Github</span>
						<svg class="support-header__icon  icon icon--sm">
							<use xlink:href="#headphones"/>
						</svg>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<nav class="mobile-nav">
		<div class="mobile-navbar">
			<img class="mobile-navbar__logo" src="../dist/img/logo.svg" alt="">
			<div class="mobile-navbar__controls">
				<button class="mobile-navbar__menu-button">
					<span class="mobile-navbar__menu-text">Meny</span>
					<svg class="mobile-navbar__menu-icon  icon">
						<use xlink:href="#menu"/>
					</svg>
				</button>
			</div>
		</div>
		<div class="mobile-top-nav  active">
			<ul class="mobile-top-nav__links">
				<li><a class="mobile-top-nav__link" href="">UI-komponenter</a></li>
				<li><a class="mobile-top-nav__link" href="">Sidmallar</a></li>
				<li><a class="mobile-top-nav__link" href="">Kom igång</a></li>
				<li><a class="mobile-top-nav__link" href="">Designprinciper</a></li>
			</ul>
		</div>
	</nav>
	<nav class="site-nav clearfix">
		<div class="col-12 sm-col-10 mx-auto">
			<div class="top-nav">
				<img class="top-nav__logo" src="../dist/img/logo.svg" alt="">
				<ul class="top-nav__links">
					<li><a class="top-nav__link" href="">UI-komponenter</a></li>
					<li><a class="top-nav__link" href="">Sidmallar</a></li>
					<li><a class="top-nav__link" href="">Kom igång</a></li>
					<li><a class="top-nav__link" href="">Designprinciper</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="clearfix mt5">
		<div class="col-12 sm-col-10 mx-auto">
			<div class="col col-12 sm-col-3 md-col-3">
				<nav class="mb4">
				<ul class="vertical-nav">
					@foreach ($nav as $item => $subitems)
						<li class="vertical-nav__item static">{{$item}}</li>
						
						@foreach ($subitems as $subitem)
							<li class="vertical-nav__item"><a class="vertical-nav__link" href="/{{$item}}/{{$subitem}}">{{$subitem}}</a></li>
						@endforeach

					@endforeach
				</ul>
				</nav>
			</div>
		@yield('content')
		</div>
	</div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/prism.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script>
	// Get spritesheet
	// In a real world project, change the URL to where the styleguide lives.
	$.get('/dist/icons/sprite.svg', function(data) {
		var div = document.createElement('div');
		div.className = 'display-none';
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
		document.body.insertBefore(div, document.body.childNodes[0]);
	});
	</script>
</body>
</html>