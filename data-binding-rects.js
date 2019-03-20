const buildRects = function (rects) {
    return rects.attr('width', (d, i, n) => d.width) // Function can be passed the data object, index and the selected element(s)
                .attr('height', d => d.height)
                .attr('fill', d => d.fill);
}
const data = [
    { width: 200, height: 100, fill: 'purple' },
    { width: 100, height: 60, fill: 'cyan' },
    { width: 50, height: 30, fill: 'lime' },
];

const svg = d3.select('svg');
const rects = svg.selectAll('rect').data(data);

buildRects(rects);

buildRects(rects.enter().append('rect'))

// When using the function () syntax, in the function scope
// this would refer to the rectangle
// In the arrow diagram, ir refers to window (global this)
// but i and n can be used to combat this difference... n[i]

