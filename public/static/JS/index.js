var app = angular.module('chatbot', []);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

app.controller('cb_controller', function($scope, $http) {

    $scope.items = [];

    $scope.question = "";

    $scope.temp_question = "";

    $scope.activeTabIndex = 3;

    $scope.algos = ['quiz', 'forum', 'synthetic', 'aibot'];

    $scope.get_answer = function() {
        $scope.temp_question = $scope.question;
        if ($scope.activeTabIndex == 3) {
            var al = 3;
            console.log("get_aibot");
            $http.post('/search_class', JSON.stringify({'question': $scope.question})).then(
                function(response) {
                    console.log(response);
                    // question
                    var item_right = {};
                    item_right.uid = 1;
                    item_right.class = "right " + $scope.algos[al];
                    item_right.index = al;
                    item_right.message = [$scope.temp_question];
                    $scope.items.push(item_right);
                    // answer
                    var item_left = {};
                    item_left.uid = 0;
                    item_left.class = "left " + $scope.algos[al];
                    item_left.index = al;
                    item_left.message = [response.data.msg];
                    $scope.items.push(item_left);
                }
            );
        }
        else {
            console.log("get_answer");
            $http.post('/search', JSON.stringify({'question':$scope.question})).then(
                function(response) {
                    console.log(response);
                    for (var al = 0; al < 3; al++) {
                        // var response = JSON.parse(res);
                        // question
                        var item_right = {};
                        item_right.uid = 1;
                        item_right.class = "right " + $scope.algos[al];
                        item_right.index = al;
                        item_right.message = [$scope.temp_question];
                        $scope.items.push(item_right);
                        // answer
                        var hits = response.data[al].total;
                        if (hits == 0) {
                            var item_left = {};
                            item_left.uid = 0;
                            item_left.class = "left " + $scope.algos[al];
                            item_left.index = al;
                            item_left.message = ["抱歉这个问题我回答不了，请尝试别的问题，谢谢！"];
                            $scope.items.push(item_left);
                        }
                        else
                            for (let i = 0; i < hits; i++) {
                                var temp_message = response.data[al].hits[i];
                                var item_left = {};
                                item_left.uid = 0;
                                item_left.class = "left " + $scope.algos[al];
                                item_left.index = al;
                                item_left.message = [];
                                if (al == 0) {
                                    item_left.message.push("题目：");
                                    item_left.message.push(temp_message._source.question);
                                    item_left.message.push("答案: ");
                                }
                                if (al == 1) {
                                    item_left.message.push("主题：");
                                    item_left.message.push(temp_message._source.question);
                                    item_left.message.push("展开讨论: ");
                                    item_left.fold = true;
                                }
                                if (al == 2) {
                                    item_left.message.push(temp_message._source.question);
                                }
                                item_left.message.push(temp_message._source.answer);
                                $scope.items.push(item_left);

                            }
                    //msgend.scrollTop(div.scrollHeight);
                    //content.scrollTop(content[0].scrollHeight*5);
                    }
                    console.log($scope.items)
                }
            );
        }
        $scope.question = "";
    };

    $scope.press_enter = function(keyEvent) {
      if (keyEvent.which === 13)
          $scope.get_answer();
    }

    $scope.folder = function(index, item) {
        if (index == 2) {
            if (item.fold)
                return 'fa fa-plus-circle';
            else
                return 'fa fa-minus-circle';
        }
        else
            return '';
    }

    $scope.get_folder = function(message, item) {
        if (message.$index == 2) {
            if (!item.fold) {
                message.message = '展开讨论：';
                item.fold = true;
            } else {
                message.message = '收起讨论：';
                item.fold = false;
            };
            //item.$$nextSibling
        }
    }
});
