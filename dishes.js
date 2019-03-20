class Dishes {
    applyPlanetAttributes(rects, y) {
        return rects.attr('width', 50)
            .attr('height', d => y(d.orders)) // Set the height to be the number of orders per menu item
            .attr('fill', 'orange')
            .attr('x', (d, i) => i * 70); // Position each item 70 pixels from the last -- temp solution

    }
    
    async buildDishes() {
        const svg = d3.select('svg');
    
        const menuData = await d3.json('./menu.json');

        const domain = menuData.reduce((agg, value, i, array) => {
            if (value.orders < agg[0]) agg[0] = value.orders;
            if (value.orders > agg[1]) agg[1] = value.orders;
            return agg;
        }, [0,0])

        const y = d3.scaleLinear().domain(domain).range([
            domain[0], domain[1] / 2
        ]);
    
        // Join the data to rectangles
    
        const rects = svg.selectAll('rect').data(menuData);
        this.applyPlanetAttributes(rects, y)

        // Now do the virtual elementes too
        const vrects = rects.enter().append('rect'); // append a rect to each enter selection
        this.applyPlanetAttributes(vrects, y);
    }
}

const dishes = new Dishes();
dishes.buildDishes();
