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
		 	// SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = generateChartData();
    chart.categoryField = "name";
    chart.marginRight = 0;
    chart.marginTop = 0;
    chart.autoMarginOffset = 0;
    // the following two lines makes chart 3D
    chart.depth3D = 20;
    chart.angle = 30;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 90;
    categoryAxis.dashLength = 5;
    categoryAxis.gridPosition = "start";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.title = "Quantity";
    valueAxis.dashLength = 5;
    chart.addValueAxis(valueAxis);

    // GRAPH            
    var graph = new AmCharts.AmGraph();
    graph.valueField = "quantity";
    graph.colorField = "color";
    graph.balloonText = "[[name]]: [[quantity]]";
    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 1;
    chart.addGraph(graph);

    // WRITE
    chart.write("chartdiv");
});

function addRow() {
    jQuery('<div class="data-row"><input class="data-cell data-category"/><input class="data-cell data-value" type="number" step="10"/><input class="data-button delete-button" type="button" value="X"/></div>').appendTo('#data-table').each(function () {
        initRowEvents(jQuery(this));
    });
}

function generateChartData() {
    /*var chartData = [];
    jQuery('.data-row').each(function () {
        var category = jQuery(this).find('.data-category').val();
        var value = jQuery(this).find('.data-value').val();
        if (category != '') {
            chartData.push({
                category: category,
                value: value
            });
        }
    });*/
    return items;
}

function initRowEvents(scope) {
    scope.find('.data-cell')
        .attr('title', 'Click to edit')
        .on('keypress keyup change', function () {
            // re-generate chart data and reload it in chart
            chart.dataProvider = generateChartData();
            chart.validateData();
        }).end().find('.delete-button').click(function () {
            // remove the row
            $(this).parents('.data-row').remove();
            
            // re-generate chart data and reload it in chart
            chart.dataProvider = generateChartData();
            chart.validateData();
        });
}

jQuery(function () {
    // initialize the table
    initRowEvents(jQuery(document));
});
		 
}//angular.element($("div[ng-controller='namesCtrl']")).scope().items;
//angular.element(document.getElementById('#angDiv')).scope().items;