myApp.factory('Test', function($http) {
		var testFactory = {}; // Create the test object

		//service to list all tests
		testFactory.getAllTests = function() {
			return $http.get('/test/all'); // Return data from end point to controller
		};
		
		//service to get details of a single test
		testFactory.getOneTest = function(test_id){
			return $http.get('/test/'+test_id);
		};

		//service to enter details of a test
		testFactory.createTest = function(testDetails){
			return $http.post('/test/create',testDetails);
		};

		//service to create new question
		testFactory.createQuestion = function(test_id,QuestionData){
			return $http.post('/test/'+test_id+'/question/create',QuestionData);
		};

		//service to edit details of a test
		testFactory.editTest = function(test_id,updatedTest){
			return $http.post('/test/edit/'+test_id,updatedTest);
		};
		
		//service to edit questions of a test
		testFactory.editQuestion = function(question_id){
			return $http.post('/test/question/edit/'+question_id,updatedQuestion);
		};

		//service to delete a test
		testFactory.deleteTest = function(test_id){
			return $http.post('/test/delete/'+test_id);
		};

		testFactory.deleteQuestion = function(question_id){
			return $http.post('/test/question/delete/'+question_id);
		};

		return testFactory;
	});

