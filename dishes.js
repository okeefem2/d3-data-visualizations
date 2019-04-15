class Dishes {
    svg;
    graph;
    containerDimensions = { height: 600, width: 600 };
    // Create this.margins and dimensions
    margin = {
        top: 20, bottom: 100, right: 20, left: 100,
    };
    graphDimensions = {
        width: this.containerDimensions.width - this.margin.left - this.margin.right,
        height: this.containerDimensions.height - this.margin.top - this.margin.bottom,
    };

    y;
    x;
    range;
    xAxisGroup;
    yAxisGroup

    applyMenuAttributes(rects, y, x, graphHeight) {
        return rects.attr('width', 50)
            .attr('height', d => graphHeight - y(d.orders)) // Set the height to be the number of orders per menu item
            .attr('width', x.bandwidth) // Pass the band scale bandwidth function to use for determining width
            .attr('fill', 'orange')
            .attr('y', d => y(d.orders))
            .attr('x', d => x(d.name)); // Position each item 70 pixels from the last -- temp solution
    }

    applyDimensions(element, dimensions = {height: 1000, width: 1000}) {
        return element.attr('width', dimensions.height)
                      .attr('height', dimensions.width)
    }

    initGraph() {
        this.svg = this.applyDimensions(
            d3.select('.canvas').append('svg'),
            this.containerDimensions
            );
        ;
        this.graph = this.applyDimensions(
            this.svg.append('g'),
            this.graphDimensions
        ).attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.range = [this.graphDimensions.height, 0]; // Range goes from high to low from top to bottom of screen
        // When doing this, the bars look odd. They draw over the space from the actual value to the top of the graph
        // To fix this, change how the height of bar is calculated

        // Use a linear scale to be able to generate y values and axis dynamically
        this.y = d3.scaleLinear()
                    .range(this.range)
        ;

        // Create a band scale to generate x values and axis dynamically
        this.x = d3.scaleBand()
                    .range(this.range) // Range of x axis
                    .paddingInner(0.2)
                    .paddingOuter(0.2)
        ;

        this.xAxisGroup = this.graph.append('g').attr('transform', `translate(0, ${this.graphDimensions.height})`);
        this.yAxisGroup = this.graph.append('g');

        
        db.collection('dishes').onSnapshot(dishesSnap => {
            this.buildGraph(dishesSnap.docs.map(d => d.data()));
        });

    }
    
    buildGraph(menuData) {
        console.log(menuData);
        
        // const domain = menuData.reduce((agg, value, i, array) => {
        //     if (value.orders < agg[0]) agg[0] = value.orders;
        //     if (value.orders > agg[1]) agg[1] = value.orders;
        //     return agg;
        // }, [0,0]); // This is my home brewed method for finding min and max

        // Here is the d3 way!
        // const min = d3.min(menuData, d => d.orders);
        // const max = d3.max(menuData, d => d.orders);
        // const extent = d3.extent(menuData, d => d.orders); // Gets min and max into an array
        this.y.domain([0, d3.max(menuData, d => d.orders)]);

        this.x.domain(menuData.map(d => d.name)) // Array of each cateogory (bar) name
    
        // Join the data to rectangles
    
        const rects = this.graph.selectAll('rect').data(menuData);

        rects.exit().remove();
        this.applyMenuAttributes(rects, this.y, this.x, this.graphDimensions.height)
        // Now do the virtual elementes too
        const vrects = rects.enter().append('rect'); // append a rect to each enter selection
        this.applyMenuAttributes(vrects, this.y, this.x, this.graphDimensions.height);
        this.buildAxes(this.x, this.y);

    }

    buildAxes(xScale, yScale) {
        
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).tickFormat(d => `${d} Orders`);
        this.xAxisGroup.call(xAxis);
        this.yAxisGroup.call(yAxis);
        this.xAxisGroup.selectAll('text')
                  .attr('transform', 'rotate(-40)')
                  .attr('text-anchor', 'end')
        ;
    }
}

const dishes = new Dishes();
dishes.initGraph();
