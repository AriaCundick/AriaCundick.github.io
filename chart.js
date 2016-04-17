AmCharts.ready(function() {
		 	var chart = new AmCharts.AmSerialChart();
		 	chart.dataProvider = angular.element($("div[ng-controller='namesCtrl']")).scope().items;//angular.element(document.getElementById('#angDiv')).scope().items;
		 	chart.categoryField = "name";
		 	var graph = new AmCharts.AmGraph();
			graph.valueField = "quantity";
			graph.type = "column";
			chart.angle = 30;
			chart.depth3D = 15;
			chart.addGraph(graph);
			chart.write('chartdiv');
		 });