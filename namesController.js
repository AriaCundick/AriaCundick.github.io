angular.module('myApp', []).controller('namesCtrl', function($scope) {
	
	$scope.items = [
		{name: "Peanut Butter", quantity: 24, price: 4.29},
		{name: "Jelly", quantity: 14, price: 3.29},
		{name: "Pickles", quantity: 54, price: 2.50},
		{name: "Bananas", quantity: 7, price: 2.10},
		{name: "Apples", quantity: 32, price: 1.50},
		{name: "Peaches", quantity: 19, price: 1.25},
		{name: "Ice cream", quantity: 36, price: 1.89},
	];

	createBarChart($scope.items);
		
	$scope.addItem = function() {
		$scope.items.push({name: $scope.addName, quantity: $scope.addQuantity, price: $scope.addPrice});
		$scope.addName="";
		$scope.addQuantity="";
		$scope.addPrice="";
		createBarChart($scope.items);
	}
	
	
});

function createBarChart(items) {
	AmCharts.ready(function() {
		 	var chart = new AmCharts.AmSerialChart();
		 	chart.dataProvider = items;
		 	chart.categoryField = "name";
		 	var graph = new AmCharts.AmGraph();
			graph.valueField = "quantity";
			graph.type = "column";
			chart.angle = 30;
			chart.depth3D = 15;
			chart.addGraph(graph);
			chart.write('chartdiv');
		 });
}//angular.element($("div[ng-controller='namesCtrl']")).scope().items;
//angular.element(document.getElementById('#angDiv')).scope().items;