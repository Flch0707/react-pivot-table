const PtTableCell = ({ cell }) => {
    return (
        <td
            className={cell.className && cell.className}
            colSpan={cell.colSpan && cell.colSpan}
            rowSpan={cell.rowSpan && cell.rowSpan}>{cell.text}
        </td>
    )
}

export default PtTableCell
