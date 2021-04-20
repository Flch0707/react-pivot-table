import DtRows from './DtRows'
const dtBody = ({ rows }) => {
    return (
        <tbody>
            {rows && rows.map((row, i) =>
                <DtRows
                    key={i}
                    row={row} />
            )}
        </tbody>
    )
}
export default dtBody
