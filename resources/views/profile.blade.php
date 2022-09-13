@extends('layouts.app')

@section('scripts')
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://cdn.tiny.cloud/1/0efkeh4p0498bwsf03d5deorgcjtsaopgw0lvebxnucvfpc5/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
@endsection

@section('content')
    <div id="content">
        <div id="editor">

        </div>
    </div>
@endsection


