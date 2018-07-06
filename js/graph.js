var scoreData = JSON.parse(window.localStorage.getItem('scoresRecord'));

var ndx = crossfilter(scoreData);

var name_dim = ndx.dimension(dc.pluck('name'));
var score_dim = ndx.dimension(dc.pluck('score'));
var date_dim = ndx.dimension(dc.pluck('date'));

dc.barChart("#chart")
    .width(300)
    .height(150)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(name_dim)
    .group  (score_dim)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Name")
    .yAxisLabel("Score");

dc.renderAll();