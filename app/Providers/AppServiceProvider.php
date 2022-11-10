<?php

namespace App\Providers;

use App\Model\PolicySetting;
use App\Model\Widget;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        if (env('APP_ENV') === 'production') {
            $this->app['url']->forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Schema::defaultStringLength(191);
        View::share('policy_setting_share', PolicySetting::where('active', 1)->get());
        View::composer('pages.front_end.index', function($view) {
            $widgets = Widget::where([
                    'active'    => 1,
                    'deleted'   => 0
                ])->get();

            $view->with('widget_share', $widgets);
        });
    }
}
