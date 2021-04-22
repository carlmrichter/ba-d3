import * as d3 from 'd3'
import X2JS from 'x2js'

export function importCsv() {
    d3.csv('../samples/freshman_kgs.csv').then(data => {
        const parsed = data.map(item => {
            item.weight = parseInt(item.weight)
            item.bmi = parseFloat(item.bmi)
            return item
        })
        console.log('data from csv: ', data, parsed)
    })
}

export function importJson() {
    d3.json('../samples/freshman_kgs.json').then(data => {
        console.log('data from json: ', data)
    })
}

export function importXML() {
    d3.xml('../samples/freshman_kgs.xml').then(data => {
        const xmlString = new XMLSerializer().serializeToString(data)
        const x2js = new X2JS()
        const parsedData = x2js.xml2js(xmlString).root.data
        console.log(parsedData)
        // do something
    })
}
