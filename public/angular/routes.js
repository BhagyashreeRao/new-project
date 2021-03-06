myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: './views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainCtrl',
            // what is the alias of that controller.
        	controllerAs 	: 'main',

            authenticated   :  false
        })

        .when('/user/dashboard',{
            templateUrl     : './views/dashboard-view.html',

            controller      :  'dashboardCtrl',

            controllerAs    :  'dashboard',

            authenticated   :   true

        })
        .when('/test/create',{
            templateUrl     : './views/create-test-view.html',

            controller      :  'testCtrl',

            controllerAs    :  'test',

            authenticated   :   true

        })
        .when('/test/:test_id',{
            templateUrl     : './views/single-test-view.html',

            controller      :  'singleTestCtrl',

            controllerAs    :  'singleTest',

            authenticated   :   true

        })        
        .when('/user/tests',{
            templateUrl     : './views/test-menu-view.html',

            controller      :  'dashboardCtrl',

            controllerAs    :  'dashboard',

            authenticated   :   true

        })   
        .when('/user/test/:test_id',{
            templateUrl     : './views/test-instruction-view.html',

            controller      :  'takeTestCtrl',

            controllerAs    :  'takeTest',

            authenticated   :   true

        })
        .when('/:user_id/take-test/:test_id',{
            templateUrl     : './views/take-test-view.html',

            controller      :  'takeTestCtrl',

            controllerAs    :  'takeTest',

            authenticated   :   true
        })      
        .when('/show-result/:result_id',{
            templateUrl     : './views/result-view.html',
            controller      : 'resultCtrl',
            controllerAs    : 'result',
            authenticated   :  true
        })

        .when('/user/performance/:user_id',{
            templateUrl     : './views/user-performance-view.html',
            controller      : 'performanceCtrl',
            controllerAs    : 'performance',
            authenticated   :  true
        })

        .when('/logout',{
            templateUrl     : './views/logout-view.html',

            authenticated   :   false

        })

        .when('/facebook/:token',{
            templateUrl     : './views/facebook-view.html',
            controller      :  'facebookCtrl',
            controllerAs    :  'facebook',

        })

        .when('/google/:token',{
            templateUrl     : './views/gmail-view.html',
            controller      :  'googleCtrl',
            controllerAs    :  'google',
      
        })
        .when('/facebookerror',{
            templateUrl     : './views/facebook-error-view.html',
            controller      :  'facebookCtrl',
            controllerAs    :  'facebook',
        })        
        .when('/googleerror',{
            templateUrl     : './views/google-error-view.html',
            controller      :  'googleCtrl',
            controllerAs    :  'google',
        })
        .when('/resetpassword',{
            templateUrl     : './views/reset-password-view.html',
            controller      :  'resetCtrl',
            controllerAs    :  'reset',
        })
        .when('/reset/:token',{
            templateUrl     : './views/new-password-view.html',
            controller      : 'setPasswordCtrl',
            controllerAs    : 'setPassword'
        })
        .otherwise({
            //redirectTo:'/'
            template   : '<h2>404 page not found</h2>'

        });

/*        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false,
        }).hashPrefix('');
*/
}]);



//Avoid unauthorized access to routes
myApp.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
    $rootScope.$on('$routeChangeStart',function(event,next,current){

        if(next.hasOwnProperty('$$route')){
            //If logged In
            if(next.$$route.authenticated==true){

                if(Auth.isLoggedIn()){
                    //Call authService to get User
                    Auth.getUser().then(function(data){
                        //If error
                        if(data.data.error){
                            event.preventDefault();
                            $location.path('/');
                        }          
                    });
                }
                else
                {
                    event.preventDefault();
                    $location.path('/');
                }
                
            }
            //If not logged in
            if(next.$$route.authenticated==false){

                if(Auth.isLoggedIn()){
                    //Call authService to get User
                    Auth.getUser().then(function(data){

                        //If error
                            if(!data.data.error){
                            event.preventDefault();
                            $location.path('/user/dashboard');
                        }          
                    });
                }
                
            }
        }

    });
}]);
