@extends('master')

@section('content')
<article>
	<h1>Hello Worl Sectiond</h1>
    
    @foreach ($section as $key => $value)
        <h1>{{$value->name}}</h1>
        {!! $value->description !!}
        @foreach ($value->markup as $key => $value)
            {!! $value->example !!}
            <code>{{$value->example}}</code>
        @endforeach
    @endforeach
</article>
@stop