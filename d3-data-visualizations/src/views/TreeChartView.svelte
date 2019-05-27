<script>
  import { db } from "../firebase";
  import { collectionData } from "rxfire/firestore";
  import * as d3 from "d3";
  import { onDestroy, onMount } from "svelte";
  import { startWith, map } from "rxjs/operators";
  import { activity } from "../store/activity.js";

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const chartDims = {
    height: 500,
    width: 1100
  };
  let svg;
  let graph;
  let stratify;

  let tree;
  let employeesQuery;
  let employeesSub;
  let rootNode;
  let ordinalScale;

  onMount(() => {
    employeesQuery = db.collection("employees");
    const employees$ = collectionData(employeesQuery, "id").pipe(
      startWith([]),
      map(data =>
        data
          .map(d => ({ ...d, date: new Date(d.date) }))
          .sort((a, b) => b.date - a.date)
      )
    );
    employeesSub && employeesSub.unsubscribe();
    employeesSub = employees$.subscribe(employees => {
      draw(employees);
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
      .attr("transform", `translate(${-margin.left}, ${margin.top})`);

    stratify = d3
      .stratify()
      .id(d => d.name)
      .parentId(d => d.parent);

    ordinalScale = d3.scaleOrdinal([
      "#78A6B3",
      "#7EBCCC",
      "#FFB8CF",
      "#FFFBD1",
      "#B36F85",
      "#26a69a",
      "#A49BE8",
      "##FFB8CF",
      "##E8C79B",
      "##F5FFAB"
    ]);

    tree = d3.tree().size([chartDims.width, chartDims.height]);
  }

  function draw(data) {
    console.log(data);
    if (graph) {
      ordinalScale.domain(data.map(d => d.department));
      graph.selectAll(".node").remove();
      graph.selectAll(".link").remove();
      rootNode = stratify(data);
      const treeData = tree(rootNode);

      const links = graph.selectAll(".link").data(treeData.links());
      links
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .linkVertical()
            .x(d => d.x)
            .y(d => d.y)
        );
      const nodes = graph.selectAll(".node").data(treeData.descendants());

      const nodeEnter = nodes
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
      nodeEnter
        .append("rect")
        .attr("fill", d => ordinalScale(d.data.department))
        .attr("stroke", "#555")
        .attr("stroke-width", 2)
        .attr("height", 50)
        .attr("width", d => 20 * d.data.name.length)
        .attr("transform", d => {
          const xTrans = -(20 * d.data.name.length) / 2;
          return `translate(${xTrans}, -25)`;
        });

      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text(d => d.data.name);

      applyEventListeners();
    }
  }
  function applyEventListeners() {}
</script>

<style>
  :global(path.arc) {
    cursor: pointer;
  }
</style>

<div class="canvas" />
