import '../scss/app.scss'
import * as d3 from 'd3'
import {lesson03BarCharts, lesson03PieCharts} from './03'
import { lesson04Functions } from './04'
import { probeklausur05, probeklausur07, probeklausur08 } from './probeklausur'
import { importCsv, importJson, importXML } from './importData'

function test() {
    const padding = { top: 50, bottom: 50, left: 50, right: 50 }
    const width = 600, height = 400
    // innere Breite, für scale-Funktionen etc. verwenden
    const innerWidth = width - padding.left - padding.right
    // innere Höhe, für scale-Funktionen etc. verwenden
    const innerHeight = height - padding.top - padding.bottom

    const svg = d3.select('main').insert('svg', ':first-child')
                  .attr('height', 400).attr('width', 400)
        .style('background', '#f0f0f0')
    const group = svg.append('g').attr('x', padding.left).attr('y', padding.top)

    group.append('rect').attr('x', 10).attr('y', 10).attr('width', 30).attr('height', 30).attr('fill', 'black')
}


document.addEventListener('DOMContentLoaded', () => {
    test()

    console.log(d3.timeFormat('%X')(new Date()))

    console.log(d3.schemeBrBG[9])

    importCsv()
    importJson()
    importXML()
    lesson03BarCharts()
    lesson03PieCharts()
    lesson04Functions()
    probeklausur05()
    probeklausur07()
    probeklausur08()
})
