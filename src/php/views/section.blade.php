@extends('master')

@section('content')
<article class="col col-12 sm-col-9 px3">
	@foreach ($section as $key => $value)
		<h2>{{$value->name}}</h2>
		{!! $value->description !!}
		@if (isset($section[0]->state))
		<section class="py3">
		    <h3>Modifiers</h3>
		    <ul>
		    @foreach ((array)$section[0]->state as $state)
		        <li>
		            <code>{{ $state->name }}</code> - {!! $state->description !!}
		        </li>
		    @endforeach
		    </ul>
		</section>
		@endif
		@foreach ($value->markup as $key => $value)
			<div class="py3">{!! $value->example !!}</div>
			<pre class="language-html"><code>{{ trim($value->example) }}</code></pre>
		@endforeach
		<small><strong>Source file:</strong> {{ $value->path }}</small>
		<hr class="my4">
	@endforeach
</article>
@stop