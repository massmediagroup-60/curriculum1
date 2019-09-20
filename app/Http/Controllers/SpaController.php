<?php

namespace App\Http\Controllers;

class SpaController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('spa');
    }
}
