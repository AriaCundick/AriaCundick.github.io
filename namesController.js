angular.module('myApp', []).controller('namesCtrl', function($scope) {
	document.getElementById("addBtn").disabled = true;
	$scope.items = [
		{name: "Peanut Butter", quantity: 24, price: 4.29},
		{name: "Jelly", quantity: 14, price: 3.29},
		{name: "Pickles", quantity: 54, price: 2.50},
		{name: "Bananas", quantity: 7, price: 2.10},
		{name: "Apples", quantity: 32, price: 1.50},
		{name: "Peaches", quantity: 19, price: 1.25},
		{name: "Ice cream", quantity: 36, price: 1.89},
	];

	$scope.enableAdd = function() {
		if($scope.addName === '')
			document.getElementById("addBtn").disabled = true;
		else
			document.getElementById("addBtn").disabled = false;
	}
	$scope.addItem = function() {
		$scope.items.push({name: $scope.addName, quantity: $scope.addQuantity, price: $scope.addPrice});
		$scope.addName="";
		$scope.addQuantity="";
		$scope.addPrice="";
		
	}
	
	
});