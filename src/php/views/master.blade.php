<!DOCTYPE html>
<html>
<head>
	<title>Styleguide — Region Halland</title>
	@php($env = getenv('PRODUCTION') === 'true' ? 'dist' : 'temp')
	<link rel="stylesheet" type="text/css" href="../{{ $env }}/css/main.min.css">
	<link rel="stylesheet" type="text/css" href="../{{ $env }}/css/presentation.min.css">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<div class="clearfix mt5">
		<div class="col-12 sm-col-10 mx-auto">
			<div class="col col-12 sm-col-3 md-col-3">
				<nav class="mb4">
				<ul class="vertical-nav">
					<li class="vertical-nav__header">
						<span class="vertical-nav__heading--dynamic">Innehåll</span>
						<span class="vertical-nav__heading--static">Innehåll</span>
						<button class="vertical-nav__button">
			 				<svg class="vertical-nav__icon  icon">
								<use xlink:href="#menu"/>
							</svg>
						</button>
					</li>
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
	<script src="../{{ $env }}/js/app.min.js"></script>
</body>
</html>