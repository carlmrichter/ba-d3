import * as d3 from 'd3'

export function lesson03BarCharts () {
    let data = [
        { country: 'United States', value: 12394 },
        { country: 'Russia', value: 6148 },
        { country: 'Germany (FRG)', value: 1653 },
        { country: 'France', value: 2162 },
        { country: 'United Kingdom', value: 1214 },
        { country: 'China', value: 1131 },
        { country: 'Spain', value: 814 },
        { country: 'Netherlands', value: 1167 },
        { country: 'Italy', value: 660 },
        { country: 'Israel', value: 1263 },
    ]

    const padding = { top: 20, right: 30, bottom: 100, left: 100 }
    const innerHeight = 400
    const innerWidth = 600
    const height = innerHeight + padding.top + padding.bottom
    const width = innerWidth + padding.left + padding.right

    const svg = d3.select('#lesson03').
        append('svg').
        attr('width', width).
        attr('height', height).
        append('g').
        attr('transform', `translate(${padding.left}, ${padding.top})`)

    const x = d3.scaleLinear().domain([0, 13000]).range([0, innerWidth])
    const y = d3.scaleBand().domain(data.map(d => d.country)).range([0, innerHeight]).padding(.1)

    // bars
    svg.selectAll().
        data(data).
        enter().
        append('rect').
        attr('x', x(0)).
        attr('y', d => y(d.country)).
        attr('width', d => x(d.value)).
        attr('height', y.bandwidth()).
        attr('fill', 'lightblue')

    // x axis
    svg.append('g').
        attr('transform', `translate(0, ${innerHeight})`).
        call(d3.axisBottom(x)).
        selectAll('text').
        attr('text-anchor', 'end').
        attr('transform', `translate(-10, 0) rotate(-45)`)

    // y axis
    svg.append('g').call(d3.axisLeft(y))

    ////////////////////////////////////////
    // Second bar chart
    ////////////////////////////////////////
    const svg2 = d3.select('#lesson03').
        append('svg').
        attr('width', width).
        attr('height', height).
        attr('style', 'background: ivory').
        append('g').
        attr('transform', `translate(${padding.left}, ${padding.right})`)

    const x2 = d3.scaleBand().domain(data.map(d => d.country)).range([0, innerWidth]).padding(.1)
    const y2 = d3.scaleLinear().domain([0, 13000]).range([innerHeight, 0])

    svg2.selectAll().
        data(data).
        enter().
        append('rect').
        attr('x', d => x2(d.country)).
        attr('y', d => y2(d.value)).
        attr('width', x2.bandwidth()).
        attr('height', d => y2(0) - y2(d.value)).
        attr('fill', 'lightblue')

    svg2.selectAll().
        data(data).
        enter().
        append('text').
        text(d => d.value).
        attr('x', d => x2(d.country) + x2.bandwidth() / 2).
        attr('y', d => y2(d.value) + 14).
        attr('font-family', 'sans-serif').
        attr('font-size', '11px').
        attr('text-anchor', 'middle')

    // x axis
    svg2.append('g').
        attr('transform', `translate(0, ${innerHeight})`).
        call(d3.axisBottom(x2)).
        selectAll('text').
        attr('text-anchor', 'end').
        attr('transform', 'translate(-10, 0) rotate(-45)')

    // y axis
    svg2.append('g').call(d3.axisLeft(y2))
}

export function lesson03PieCharts () {
    const data = [
        { name: 'Jim', votes: 12 },
        { name: 'Sue', votes: 5 },
        { name: 'Bob', votes: 21 },
        { name: 'Ann', votes: 17 },
        { name: 'Dan', votes: 3 }
    ]

    const width = 400
    const height = 400
    const svg = d3.select('#lesson03').append('svg').attr('width', width).attr('height', height)
        .append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)


    const pie = d3.pie().value(d => d.votes).padAngle(.025)(data)
    const colors = d3.scaleOrdinal()
        .domain(pie.map(d => d.index))
        .range(d3.schemeCategory10)
    const arcMaker = d3.arc().innerRadius(30).outerRadius(175).cornerRadius(4)

    svg.selectAll().data(pie).enter().append('path')
        .attr('d', arcMaker)
        .attr('fill', d => colors(d.index))

    svg.selectAll('text').data(pie).enter().append('text')
        .text(d => d.data.name)
        .attr('x', d => arcMaker.innerRadius(120).centroid(d)[0])
        .attr('y', d => arcMaker.innerRadius(120).centroid(d)[1])
        .attr('font-family', 'sans-serif').attr('font-size', 11)
        .attr('text-anchor', 'middle').attr('fill', 'white')
}
