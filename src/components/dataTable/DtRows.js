const DtRows = ({ row, headings }) => {
    return (
        <tr>
            {headings && headings.map((heading, i) =>
                <td key={i}>
                    {row[heading.value] === undefined ? 0 : String(row[heading.value])}
                </td>
            )}
        </tr>
    )
}

export default DtRows
