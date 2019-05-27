<script>
  import { db } from "../firebase";
  import { collectionData } from "rxfire/firestore";
  import * as d3 from "d3";
  import { onDestroy, onMount } from "svelte";
  import { startWith, map } from "rxjs/operators";
  import { activity } from "../store/activity.js";

  const margin = { top: 40, right: 20, bottom: 50, left: 100 };
  const chartDims = {
    height: 400 - margin.left - margin.right,
    width: 560 - margin.left - margin.right
  };
  let svg;
  let graph;
  let xScale;
  let yScale;
  let xAxisGroup;
  let yAxisGroup;
  let ordinalScale;
  let chartLegend;
  let legendGroup;
  let activitiesQuery;
  let activitySub;
  let activitiesSub;
  let lineGenerator;
  let linePath;
  let dottedLineGroup;
  let xDottedLine;
  let yDottedLine;

  onMount(() => {
    activitiesQuery = db.collection("activities");
    activitySub = activity.subscribe(a => {
      const filteredActivitiesQuery = activitiesQuery.where(
        "activity",
        "==",
        a
      );
      const activities$ = collectionData(filteredActivitiesQuery, "id").pipe(
        startWith([]),
        map(data =>
          data
            .map(d => ({ ...d, date: new Date(d.date) }))
            .sort((a, b) => b.date - a.date)
        )
      );
      activitiesSub && activitiesSub.unsubscribe();
      activitiesSub = activities$.subscribe(activities => {
        draw(activities);
      });
    });

    initChart();
  });
  onDestroy(() => {
    activitySub && activitySub.unsubscribe();
    activitiesSub && activitiesSub.unsubscribe();
  });

  function initChart() {
    svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", chartDims.width + margin.left + margin.right)
      .attr("height", chartDims.height + margin.top + margin.bottom);
    graph = svg
      .append("g")
      .attr("width", chartDims.width)
      .attr("height", chartDims.height)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScale = d3.scaleTime().range([0, chartDims.width]);
    yScale = d3.scaleLinear().range([chartDims.height, 0]);

    xAxisGroup = graph
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartDims.height})`);
    yAxisGroup = graph
      .append("g")
      .append("g")
      .attr("class", "y-axis");

    // Init line paths
    lineGenerator = d3
      .line()
      .x(function(d) {
        return xScale(d.date);
      })
      .y(function(d) {
        return yScale(d.time);
      });
    linePath = graph.append("path");

    // Create a group for the dotted lines that is hidden by default
    dottedLineGroup = graph
      .append("g")
      .attr("class", "dotted-line")
      .style("opacity", 0);

    // Create an x and y dotted line
    xDottedLine = dottedLineGroup
      .append("line")
      .attr("stroke", "#000000")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    yDottedLine = dottedLineGroup
      .append("line")
      .attr("stroke", "#000000")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);
  }

  function draw(data) {
    console.log(data);
    if (graph) {
      // Set scale domains
      xScale.domain(d3.extent(data, d => new Date(d.date)));
      yScale.domain([0, d3.max(data, d => d.time)]);

      // Create graph points

      const circles = graph.selectAll("circle").data(data);

      circles.attr("cx", d => xScale(d.date)).attr("cy", d => yScale(d.time));

      circles.exit().remove();

      circles
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.time))
        .attr("fill", "#26a69a");

      // Create actual axes

      const xAxis = d3
        .axisBottom(xScale)
        .ticks(4)
        .tickFormat(d3.timeFormat("%b %d"));
      const yAxis = d3.axisLeft(yScale).ticks(4);

      // Call axes to build the svg
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);

      xAxisGroup
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end");

      // Update line path

      linePath
        .data([data])
        .attr("fill", "none")
        .attr("stroke", "#78A6B3")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

      applyEventListeners();
    }
  }

  function applyEventListeners() {
    graph
      .selectAll("circle")
      .on("mouseover", circleMouseOver)
      .on("mouseleave", circleMouseOut);
  }

  const circleMouseOver = (d, i, n) => {
    d3.select(n[i])
      .transition(100)
      .attr("r", 8)
      .attr("fill", "#FFB8CF");

    xDottedLine
      .attr("x1", xScale(d.date))
      .attr("x2", xScale(d.date))
      .attr("y1", chartDims.height)
      .attr("y2", yScale(d.time));
    yDottedLine
      .attr("x1", 0)
      .attr("x2", xScale(d.date))
      .attr("y1", yScale(d.time))
      .attr("y2", yScale(d.time));
    dottedLineGroup.style("opacity", 1);
  };

  const circleMouseOut = (d, i, n) => {
    d3.select(n[i])
      .transition(100)
      .attr("r", 4)
      .attr("fill", "#26a69a");
    dottedLineGroup.style("opacity", 0);
  };
</script>

<style>
  :global(path.arc) {
    cursor: pointer;
  }
</style>

<div class="canvas" />
