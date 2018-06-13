queue()
    .defer(d3.json, "scoresArray")
    .await(makeGraph)

function makeGraph(error, scoresData) {

    var ndx = crossfilter(scoresData);

    var name_dim = ndx.dimension(dc.pluck('name'));
    var score_dim = ndx.dimension(dc.pluck('score'));
    var date_dim = ndx.dimension(dc.pluck('date'));

    dc.barChart("#high-score-chart")
        .width(300)
        .height(150)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .group(score_dim)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Date")
        .yAxisLabel("Score");

    dc.renderAll();
}


// investigate queue()
