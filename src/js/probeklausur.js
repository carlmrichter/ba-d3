import * as d3 from 'd3'
import 'd3-graphviz'

export function probeklausur05() {
    const timestring ="3:15:45 PM"
    const timeobject = d3.timeParse('%I:%M:%S %p')(timestring)
    d3.select('#probeklausur-05')
        .append('p').text(`a) ${timestring} → ${timeobject}`)
        .append('p').text('b) 45 Sekunden davor: ' + d3.timeSecond.offset(timeobject, -45))
}

export function probeklausur08() {
    d3.select('#probeklausur-08').graphviz()
        .renderDot(`
            graph {
                node [style="filled" fillcolor=darkgreen]
                Elefant -- {Maus, Armin} 
                Maus -- {Armin, Ente}
                Armin -- Ente
            }
        `)
}



