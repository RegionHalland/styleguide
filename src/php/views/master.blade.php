<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
	<link rel="stylesheet" type="text/css" href="../dist/css/main.css">
</head>
<body class="pt3">
	<div class="mx-auto max-width-4">
		<div class="col col-12 sm-col-3 md-col-3 px2">
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
			<nav>
			<ul class="vertical-nav">
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
				<li class="vertical-nav__item active"><a class="vertical-nav__link" href="#">Alternativ (active)</a></li>
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
				<li class="vertical-nav__item has-children">
					<a class="vertical-nav__link" href="#">Alternativ</a>
					<ul class="vertical-nav__sub-menu">
						<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
						<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
						<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
						<li class="vertical-nav__item has-children">
							<a class="vertical-nav__link" href="#">Alternativ</a>
							<ul class="vertical-nav__sub-menu">
								<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Världens längsta alternativ</a></li>
								<li class="vertical-nav__item static">Alternativ</li>
								<li class="vertical-nav__item active"><a class="vertical-nav__link" href="#">Alternativ</a></li>
								<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
								<li class="vertical-nav__item has-children">
									<a class="vertical-nav__link" href="#">Världens längsta alternativ</a>
									<ul class="vertical-nav__sub-menu">
										<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
										<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
										<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
										<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
										<li class="vertical-nav__item has-children">
											<a class="vertical-nav__link" href="#">Alternativ</a>
											<ul class="vertical-nav__sub-menu">
												<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
												<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
												<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
												<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
												<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
												<li class="vertical-nav__item static">Alternativ</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
					</ul>
				</li>
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
				<li class="vertical-nav__item"><a class="vertical-nav__link" href="#">Alternativ</a></li>
			</ul>
			</nav>
		</div>
		@yield('content')
	</div>
	<!--<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">-->
	<!--<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>-->
	<!--<script>hljs.initHighlightingOnLoad();</script>-->
</body>
</html>