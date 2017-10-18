@extends('master')

@section('content')
<article class="col col-12 sm-col-9 px3">
	@foreach ($section as $key => $value)
		<h2>{{$value->name}}</h2>
		{!! $value->description !!}
		@foreach ($value->markup as $key => $value)
			<div class="py3">{!! $value->example !!}</div>
			<pre class="language-html"><code>{{ trim($value->example) }}</code></pre>

		@endforeach
		<small><strong>Source file:</strong> {{ $value->path }}</small>
		<hr class="my4">
	@endforeach
</article>
@stop