// const firstDiv = document.querySelector('div'); // Get first div on the page
// const firstDivD3 = d3.select('div') // Does the same as ^
// ^ wraps the select in a d3 wrapper with methods etc.

// const allDivs = document.querySelectorAll('div'); // Select all divs as nodelist
// const allDivsD3 = d3.selectAll('div'); // A d3 Selection of NodeLists

const canvas = d3.select('.canvas');
console.log(canvas);

const svg = canvas.append('svg')
                  .attr('height', 600)
                  .attr('width', 600); // Append an element to canvas
// ^ returns the appended element

const group = svg.append('g')
    .attr('transform', 'translate(0, 100)'); // Append a group, perform css translation

// Append shapes

group.append('rect')
   .attr('width', 200)
   .attr('height', 100)
   .attr('fill', 'blue')
   .attr('x', 20)
   .attr('y', 20)
   ;

group.append('circle')
    .attr('r', 50).attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink')
    ;

group.append('line')
    .attr('x1', 370)
    .attr('x2', 400)
    .attr('y1', 20)
    .attr('y2', 120)
    .attr('stroke', 'red')
    ;

group.append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text('Creepy')
    .style('font-family', 'Arial')
    ;
