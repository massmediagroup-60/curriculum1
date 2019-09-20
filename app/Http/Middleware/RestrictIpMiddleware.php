<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class RestrictIpMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $ipsDeny = config('ipBlacklist');
        if (count($ipsDeny)) {
            if (in_array(request()->ip(), $ipsDeny)) {
                Log::warning('Forbidden access, IP address was => ' . request()->ip);

                abort(403);
            }
        }

        return $next($request);
    }
}
