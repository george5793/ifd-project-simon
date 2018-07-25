var scoreData = JSON.parse(window.localStorage.getItem('scoresRecord'));

var ndx = crossfilter(scoreData);

var name_dim = ndx.dimension(dc.pluck('name'));
var total_score_per_person = name_dim.group().reduceSum(dc.pluck('score'));
var date_dim = ndx.dimension(dc.pluck('date'));

dc.barChart("#chart")
    .width(500)
    .height(500)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .dimension(name_dim)
    .group(total_score_per_person)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .yAxisLabel("Total Score");

dc.renderAll();