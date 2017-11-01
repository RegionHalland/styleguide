<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
	<link rel="stylesheet" type="text/css" href="../dist/css/main.min.css">
	<style type="text/css">
	<meta charset="utf-8">
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
	<nav class="py4 mb4" style="background: blue;"></nav>
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
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.1/prism.min.js"></script>
</body>
</html>