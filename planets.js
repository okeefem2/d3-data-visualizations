
function applyPlanetAttributes(circs) {
    return circs.attr('cy', 200).attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill);
}

async function buildPlanets() { 
    const svg = d3.select('svg');

    const planetsData = await d3.json('./planets.json');

    const circs = svg.selectAll('circle')
                     .data(planetsData);

    applyPlanetAttributes(circs);

    // Append the enters to the dom 
    const vcircs = circs.enter().append('circle');
    applyPlanetAttributes(vcircs);  
};

buildPlanets();
