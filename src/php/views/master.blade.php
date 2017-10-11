<!DOCTYPE html>
<html>
<head>
	<title>Styleguide</title>
</head>
<body>
	<nav>
    <ul class="nav-aside">
        @foreach ($nav as $item => $subitems)
            <li>{{$item}}</li>
            
            @foreach ($subitems as $subitem)
            	<li><a href="/{{$item}}/{{$subitem}}">{{$subitem}}</a></li>
            @endforeach

        @endforeach
    </ul>
	</nav>

	 @yield('content')
</body>
</html>