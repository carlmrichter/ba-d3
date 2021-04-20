import * as d3 from 'd3'

export function lesson04Functions () {
    const width = 600, height = 600
    const padding = { top: 15, bottom: 40, left: 15, right: 15 }
    const innerWidth = width - padding.left - padding.right
    const innerHeight = height - padding.top - padding.bottom

    const f = x => (Math.pow(x, 3) - (3 * Math.pow(x, 2)) - x + 3)

    const step = 0.1
    const xInterval = [-2, 4]
    const yInterval = [f(xInterval[0]), f(xInterval[1])]

    const data = d3.range(xInterval[0], xInterval[1] + step, step).map(f)

    const xScale = d3.scaleLinear().domain(xInterval).range([0, innerWidth]).nice()
    const yScale = d3.scaleLinear().domain(yInterval).range([innerHeight, 0]).nice()

    const line = d3.line()
                   .x((d, i) => xScale(i * step) - xScale(0))
                   .y(d => yScale(d))

    const svg = d3.select('#lesson04').append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', '#f8f8f8')
                  .style('border-radius', '8px')

    const graph = svg.append('g')
                     .attr('transform', `translate(${padding.left}, ${padding.top})`)

    // x axis
    graph.append('g')
         .attr('transform', `translate(0, ${yScale(0)})`)
         .call(d3.axisBottom(xScale))

    // y axis
    graph.append('g')
         .attr('transform', `translate(${xScale(0)}, 0)`)
         .call(d3.axisLeft(yScale))

    // path
    graph.append('path')
         .data([data])
         .attr('d', line)
         .style('fill', 'none')
         .style('stroke', 'darkblue')

    // function as text
    svg.append('text')
       .text(f.toString())
       .attr('text-anchor', 'middle')
       .attr('x', width / 2)
       .attr('y', height - 10)
       .style('font-size', '14px')
       .style('font-family', 'sans-serif')
       .style('font-weight', '700')
       .style('fill', '#555555')
}
