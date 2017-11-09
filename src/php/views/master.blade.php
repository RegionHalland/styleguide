<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
	<link rel="stylesheet" type="text/css" href="../dev/css/main.min.css">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
	/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
	/**
	 * prism.js default theme for JavaScript, CSS and HTML
	 * Based on dabblet (http://dabblet.com)
	 * @author Lea Verou
	 */
	
	code[class*="language-"],
	pre[class*="language-"] {
		color: black;
		background: none;
		text-shadow: 0 1px white;
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;
	
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
	
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}
	
	pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
	code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
		text-shadow: none;
		background: #b3d4fc;
	}
	
	pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
	code[class*="language-"]::selection, code[class*="language-"] ::selection {
		text-shadow: none;
		background: #b3d4fc;
	}
	
	@media print {
		code[class*="language-"],
		pre[class*="language-"] {
			text-shadow: none;
		}
	}
	
	/* Code blocks */
	pre[class*="language-"] {
		padding: 1em;
		margin: .5em 0;
		overflow: auto;
	}
	
	:not(pre) > code[class*="language-"],
	pre[class*="language-"] {
		background: #f5f2f0;
	}
	
	/* Inline code */
	:not(pre) > code[class*="language-"] {
		padding: .1em;
		border-radius: .3em;
		white-space: normal;
	}
	
	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: slategray;
	}
	
	.token.punctuation {
		color: #999;
	}
	
	.namespace {
		opacity: .7;
	}
	
	.token.property,
	.token.tag,
	.token.boolean,
	.token.number,
	.token.constant,
	.token.symbol,
	.token.deleted {
		color: #905;
	}
	
	.token.selector,
	.token.attr-name,
	.token.string,
	.token.char,
	.token.builtin,
	.token.inserted {
		color: #690;
	}
	
	.token.operator,
	.token.entity,
	.token.url,
	.language-css .token.string,
	.style .token.string {
		color: #a67f59;
		background: hsla(0, 0%, 100%, .5);
	}
	
	.token.atrule,
	.token.attr-value,
	.token.keyword {
		color: #07a;
	}
	
	.token.function {
		color: #DD4A68;
	}
	
	.token.regex,
	.token.important,
	.token.variable {
		color: #e90;
	}
	
	.token.important,
	.token.bold {
		font-weight: bold;
	}
	.token.italic {
		font-style: italic;
	}
	
	.token.entity {
		cursor: help;
	}		
	</style>
</head>
<body class="">
	<div class="support-header clearfix">
		<ul class="support-header__links">
			<li class="support-header__item">
				<a class="support-header__link" href="">
					<span class="support-header__link-text">Region Hallands Webbplatser</span>
				</a>
			</li>
			<li class="support-header__item">
				<a class="support-header__link" href="">
					<svg class="support-header__icon  icon icon--sm">
						<use xlink:href="#headphones"/>
					</svg>
					<span class="support-header__link-text">Lyssna</span>
				</a>
			</li>
			<li class="support-header__item">
				<a class="support-header__link" href="">
					<svg class="support-header__icon  icon icon--sm">
						<use xlink:href="#magnifying-glass"/>
					</svg>
					<span class="support-header__link-text">Translate</span>
				</a>
			</li>
		</ul>
	</div>
	<nav class="site-nav mb4">
		<div class="top-nav">
			<div class="top-nav__logo">
				
			</div>
			<div class="top-nav__search-wrapper">
				<div class="top-nav__search">
					<input type="text" placeholder="Sök på hela vårdgivarwebben" class="top-nav__search-input">
					<svg class="top-nav__search-icon  icon">
						<use xlink:href="#magnifying-glass"/>
					</svg>
				</div>
			</div>
			<ul class="top-nav__links">
				<li><a class="top-nav__link active" href="">Patientadministration</a></li>
				<li><a class="top-nav__link" href="">Behandlingsstöd</a></li>
				<li><a class="top-nav__link" href="">Kompetens & Utveckling</a></li>
				<li><a class="top-nav__link" href="">Service & IT</a></li>
				<li><a class="top-nav__link" href="">Uppdrag & Avtal</a></li>
			</ul>
		</div>
		<div class="sub-nav sub-nav--first-level">
			<ul class="sub-nav__links">
				<li><a class="sub-nav__link" href="">Patientadministration</a></li>
				<li><a class="sub-nav__link" href="">Behandlingsstöd</a></li>
				<li><a class="sub-nav__link" href="">Kompetens & Utveckling</a></li>
				<li><a class="sub-nav__link" href="">Service & IT</a></li>
				<li><a class="sub-nav__link active" href="">Uppdrag & Avtal</a></li>
			</ul>
		</div>
		<div class="sub-nav sub-nav--second-level">
			<ul class="sub-nav__links">
				<li><a class="sub-nav__link" href="">Patientadministration</a></li>
				<li><a class="sub-nav__link active" href="">Behandlingsstöd</a></li>
				<li><a class="sub-nav__link" href="">Kompetens & Utveckling</a></li>
			</ul>
		</div>
	</nav>
	<div class="mx-auto max-width-4">
		<div class="col col-12 sm-col-3 md-col-3 px3">
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