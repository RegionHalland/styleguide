@extends('master')

@section('content')
<article class="col col-12 sm-col-9 px2">
	@foreach ($section as $key => $value)
		<h2>{{$value->name}}</h2>
		{!! $value->description !!}
		@foreach ($value->markup as $key => $value)
			{!! $value->example !!}
			<pre><code class="code">{{$value->example}}</code></pre>

		@endforeach
		<small><strong>Source file:</strong> {{ $value->path }}</small>
		<hr class="my3">
	@endforeach
</article>
@stop