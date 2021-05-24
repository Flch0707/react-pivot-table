
import Dt from "./dataTable/Dt"
import Pt from './pivotTable/Pt'
import PtSetBar from './pivotSetting/PtSetBar'

const Dashboard = ({ items }) => {
    // return the list of headers
    const getHeadings = (items, headings) => {
        const arr = []
        if (headings && headings.length > 0) { return headings }
        else {
            items.forEach((item) => {
                for (const prop in item) {
                    if (!arr.map(i => i && i.value).includes(prop)) {
                        arr.push({ text: prop, value: prop })
                    }
                }
            })
            return getColType(arr, items)
        }
    }

    var filterFloat = function (value) {
        // eslint-disable-next-line no-useless-escape
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
            return Number(value);
        return NaN;
    }

    // flag headers as number/other
    const getColType = (arr, items) => {
        return arr.map((el) => {
            return {
                ...el,
                colType: items.map(col => {
                    return col[el.value] === undefined ? col[el.value] = 0 : filterFloat(col[el.value])
                }).includes(NaN) ? "string" : "number"
            }
        })
    }
    const headings = getHeadings(items)

    return (
        <div className="App">
            <div className="container">
                <PtSetBar
                    headings={headings} />
                <Pt
                    items={items} />
                <Dt
                    headings={headings}
                    items={items} />
            </div>
        </div>


    )
}

export default Dashboard
