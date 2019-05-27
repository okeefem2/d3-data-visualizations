<script>
  import { db } from "../firebase";
  import { collectionData } from "rxfire/firestore";
  import * as d3 from "d3";
  import { onDestroy, onMount } from "svelte";
  import { startWith } from "rxjs/operators";
  let expensesSub;
  const chartDims = { height: 300, width: 300, radius: 150 };
  const center = { x: chartDims.width / 2 + 5, y: chartDims.height / 2 + 5 };
  let svg;
  let arcPath;
  let graph;
  let pie;
  let ordinalScale;
  let chartLegend;
  let legendGroup;
  let expensesQuery;

  // TODO anything more specific than just showing a pie chart should be moved up and passed in

  onMount(() => {
    expensesQuery = db.collection("expenses");
    const expenses$ = collectionData(expensesQuery, "id").pipe(startWith([]));
    expensesSub = expenses$.subscribe(expenses => {
      draw(expenses);
    });
    initChart();
  });
  onDestroy(() => expensesSub && expensesSub.unsubscribe());

  function initChart() {
    svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", chartDims.width + 150)
      .attr("height", chartDims.height + 150);
    graph = svg
      .append("g")
      .attr("transform", `translate(${center.x}, ${center.y})`);
    pie = d3
      .pie()
      .sort(null) // do not sort
      .value(d => d.cost);
    // const angles = pie([])

    arcPath = d3
      .arc() // create an arc generator with outer radius
      .outerRadius(chartDims.radius)
      .innerRadius(chartDims.radius / 2); // Creates a donut chart
    // Created with https://color.adobe.com/create
    // Analogous
    // ordinalScale = d3.scaleOrdinal([
    //   "#26a69a",
    //   "#A49BE8",
    //   "##FFB8CF",
    //   "##E8C79B",
    //   "##F5FFAB"
    // ]);
    // Triad
    ordinalScale = d3.scaleOrdinal([
      "#78A6B3",
      "#7EBCCC",
      "#FFB8CF",
      "#FFFBD1",
      "#B36F85"
    ]);
  }

  function draw(data) {
    if (graph) {
      // Create virtual elements
      const paths = graph.selectAll("path").data(pie(data));
      ordinalScale.domain(data.map(d => d.name));
      if (chartLegend) {
        legendGroup.call(chartLegend);
      }
      paths
        .exit()
        .transition()
        .duration(750)
        .attrTween("d", tweenExit)
        .remove();
      paths
        .transition()
        .duration(750)
        .attrTween("d", tweenUpdate);
      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("fill", d => ordinalScale(d.data.name))
        .each(function(d) {
          this._current = d; // reference the current data
        }) // Using function syntax to get access to the path element associated with the data using this
        .transition()
        .duration(750)
        .attrTween("d", tweenEnter);

      applyEventListeners();
    }
  }
  // Interpolate a pie wedge start angle over time (as a decimal of the animation time between 0-1) between the start and end
  // angle of a Pie wedge (see pie function above)
  // This will give an animation of the wedge growing from it's start
  function tweenEnter(data) {
    let i = d3.interpolate(data.endAngle, data.startAngle);
    return t => {
      data.startAngle = i(t);
      return arcPath(data);
    };
  }

  function tweenExit(data) {
    let i = d3.interpolate(data.startAngle, data.endAngle);
    return t => {
      data.startAngle = i(t);
      return arcPath(data);
    };
  }

  function tweenUpdate(data) {
    // New data that will be entered to the dom
    // this references the path element
    let i = d3.interpolate(this._current, data);
    this._current = i(1); // same as data, since 1 is the end of the interpolation, and data is set to be the end
    return t => {
      return arcPath(i(t));
    };
  }

  function applyEventListeners() {
    graph
      .selectAll("path")
      .on("mouseover", pieMouseOver)
      .on("mouseout", pieMouseOut)
      .on("click", pieClick);
  }

  // function pieMouseover() {} // If done this way you access the path element with this
  const pieMouseOver = (d, i, n) => {
    // console.log(n[i]); // n is all of the elements (paths), i is the index that is interacted with
    d3.select(n[i])
      .transition("transSliceFill")
      .duration(500)
      .attr("opacity", "0.4"); // I like this better
    //.attr("fill", "#fff"); // wrap the element in a d3 object for d3 specific interaction
  }; // using an es6 arrow function we are passed the data separately

  const pieMouseOut = (d, i, n) => {
    d3.select(n[i])
      .transition("transSliceFill")
      .duration(500)
      .attr("opacity", "1.0"); // I like this better
    //   .attr("fill", ordinalScale(d.data.name))
  };

  const pieClick = d => {
    // not a great ux to just delete on click, but w.e not willing to make changes
    // right now
    // Don't need i and n so just omit
    expensesQuery.doc(d.data.id).delete();
  };
</script>

<style>
  :global(path.arc) {
    cursor: pointer;
  }
</style>

<div class="canvas" />
