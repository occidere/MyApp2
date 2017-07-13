angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $state, $http,$window) {
    $scope.goto=function(toState,params){
     $state.go(toState,params)
    }

    var empUser = {};
    //LoginService.setCredential(false, empUser);
    //console.log(LoginService.credential);


    $scope.login = function(){
      $http({
        method: 'POST',
        url: 'http://localhost:8080/login',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {email:$scope.email, password:$scope.pw}

    })
      .success(function(data, status, headers, config) {
        if (data.response == false){
            console.log($scope.email);
            console.log($scope.pw);
            console.log(data);
        }
        else {
            //LoginService.setCredential(true, data);
            //console.log(LoginService.credential)
            //console.log(LoginService.user)
            $window.location.href=('#/app/login');

        }
      })
      .error(function(data, status, headers, config) {
        console.log($scope.email);
        console.log($scope.pw);
        console.log(data);
        console.log(headers);
        console.log('cannot reach user-service');
      });
    }
})

/* request getFolderByCreatorId to 210.121.158.166:8081 using creatorId */
.controller('ReqCtrl', function($scope, $ionicModal, $timeout, $state, $http, $window){

  /* Folder 정보를 받아오는 외부 요청부분 */
  $http({
    method: 'GET',
    //http://210.121.158.166:8081/getFolderByCreatorId?creatorId=593bfb8d16f0d70006cdeac3
    url: 'http://210.121.158.166:8081/getFolderByCreatorId?creatorId=593bfb8d16f0d70006cdeac3',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
  })
  .success(function(data, status, headers, config) {
    console.log(status);
    if (data.response == false){
        console.log(data);
    }
    else {
      /*
      $scope.result 처럼 스코프를 지정해 넘겨주면 폼에서는 아래처럼 받음
      <div ng-repeat="item in result">
        <p> {{item.folderName}}
      */
      $scope.result = data;

      var documentList = [], latestDocId = -1, len = -1;
      for(i=0;i<data.length;i++){
        documentList[i] = data[i]['documentList'];
        len = documentList[i].length;
        latestDocId = documentList[i][len - 1];

        /* documetIdList의 마지막(최신버전)을 가지고 문서 정보를 가져오는 내부 요청부분 */
        $http({
          method: 'GET',
          //http://210.121.158.167:8080/getDocument?documentId=593c0b34e4b011a8a12bf7ac
          url: 'http://210.121.158.167:8080/getDocument?documentId=' + latestDocId,
          headers: {
              'Content-type': 'application/x-www-form-urlencoded'
          }
        })
        .success(function(data, status, headers, config) {
          if (data.response == false){
            console.log("fail");
            console.log(data);
          }
          else {
            $scope.latestDocId = data;
          }
        });

      } //end of for
    }//end of else
  });

  $scope.request = function(){ //request() 랑 동일한 의미
    console.log("did = ", $scope.did);

  }

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  var userInfo = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function($http) {
    var inputEmail = $scope.email;
    var inputPw = $scope.pw;
    var isCorrect = false;
    console.log('Doing login');
    console.log('email = %s, pw = %s', inputEmail, inputPw);


    for(var key in userInfo){
      if(email === key && userInfo[key] === pw){
        isCorrect = true;
        break;
      }
    }W
    console.log("%s", isCorrect ? "correct" : "wrong");

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doSignUp = function(){
    var email = $scope.email;
    var pw = $scope.pw;
    console.log('Doing SignUp');
    userInfo[email] = pw;
    console.log('email = %s, pw = %s', email, userInfo[email]);
  };
})



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
;
