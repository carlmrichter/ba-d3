import * as d3 from 'd3'
import 'd3-graphviz'

export function probeklausur05 () {
    const timestring = '3:15:45 PM'
    const timeobject = d3.timeParse('%I:%M:%S %p')(timestring)
    d3.select('#probeklausur-05').
        append('p').
        text(`a) ${timestring} → ${timeobject}`).
        append('p').
        text(`a) ${timestring} → ${d3.timeParse('%X')(timestring)}`).
        append('p').
        text('b) 45 Sekunden davor: ' + d3.timeSecond.offset(timeobject, -45))
}

export function probeklausur07 () {
    const points = [
        { xpoint: 50, ypoint: 100 },
        { xpoint: 70, ypoint: 200 },
        { xpoint: 100, ypoint: 300 },
        { xpoint: 150, ypoint: 250 }]
    const width = 600, height = 350
    const svg = d3.select('#probeklausur-07').append('svg').attr('width', width).attr('height', height).append('g')
    const Gen = d3.line().x((p) => p.xpoint).y((p) => p.ypoint).curve(d3.curveStepAfter)
    svg.append('path').attr('d', Gen(points)).attr('fill', 'none').attr('stroke', 'green')
    svg.selectAll('dot').
        data(points).
        enter().
        append('circle').
        attr('r', 3.5).
        attr('cx', function (d) {return d.xpoint}).
        attr('cy', function (d) {return d.ypoint})

}

export function probeklausur08 () {
    d3.select('#probeklausur-08').graphviz().renderDot(`
            graph {
                node [style="filled" fillcolor=darkgreen]
                Elefant -- {Maus, Armin} 
                Maus -- {Armin, Ente}
                Armin -- Ente
            }
        `)
}



