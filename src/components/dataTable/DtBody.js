import DtRows from './DtRows'
const dtBody = ({ rows, headings }) => {
    return (
        <tbody>
            {rows && rows.map((row, i) =>
                <DtRows
                    key={i}
                    row={row}
                    headings={headings} />
            )}
        </tbody>
    )
}
export default dtBody
