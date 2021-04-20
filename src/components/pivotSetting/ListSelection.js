import { IcoCount } from '../../icons/IcoCount'
import { IcoSum } from '../../icons/IcoSum'
import { IcoAvg } from '../../icons/IcoAvg'
import { useContext } from 'react'
import { PtSetCtx } from '../../contexts/PtSetCtx'

export const ListSelection = ({
    height, resize, title,
    list, id, backgroundColor,
    hasNumber, hasValueParams }) => {
    const {
        onDragStart,
        onDragEnter,
        onReorder,
        onDragDrop,
        setValueParam
    } = useContext(PtSetCtx)

    return (
        <fieldset
            onDrop={onDragDrop}
            htmlFor={id}
            onDragEnter={onDragEnter}
            onDragOver={(ev) => ev.preventDefault()}
            style={{ height: height, resize: resize }}
            className="select-tile-container"
        >
            <legend>{title}</legend>
            <ul>
                {list && list.map((col, i) => {
                    return <li
                        style={{ backgroundColor: backgroundColor }}
                        data-position={i}
                        draggable="true"
                        onDragStart={onDragStart}
                        onDragOver={onReorder}
                        onDragEnd={(ev) => ev.target.style.opacity = ""}
                        className='select-tile'
                        htmlFor={id}
                        key={col.value}>
                        <p>{col.text}</p>
                        {hasNumber &&
                            <p className='select-tile-number'>{i + 1}</p>}
                        {hasValueParams &&
                            <div style={{ display: 'flex' }}>
                                <ul >
                                    {col.valueParam && col.valueParam.includes('COUNT') && <span style={{ fontSize: '0.6rem', marginRight: '1rem' }}>Count</span>}
                                    {col.valueParam && col.valueParam.includes('SUM') && <span style={{ fontSize: '0.6rem', marginRight: '1rem' }}>Sum</span>}
                                    {col.valueParam && col.valueParam.includes('AVG') && <span style={{ fontSize: '0.6rem', marginRight: '1rem' }}>Average</span>}
                                </ul>
                                <div>
                                    <div
                                        onClick={() => setValueParam(col, 'COUNT')}
                                        className={col.valueParam && col.valueParam.includes('COUNT') ? 'select-tile-value-ico-selected' : 'select-tile-value-ico'}
                                    ><IcoCount /></div>
                                    <div
                                        onClick={() => setValueParam(col, 'SUM')}
                                        className={col.valueParam && col.valueParam.includes('SUM') ? 'select-tile-value-ico-selected' : col.colType === 'string' ? 'select-tile-value-ico-disabled' : 'select-tile-value-ico'}
                                    ><IcoSum /></div>
                                    <div
                                        onClick={() => setValueParam(col, 'AVG')}
                                        className={col.valueParam && col.valueParam.includes('AVG') ? 'select-tile-value-ico-selected' : col.colType === 'string' ? 'select-tile-value-ico-disabled' : 'select-tile-value-ico'}
                                    ><IcoAvg /></div>
                                </div>
                            </div>}
                    </li>

                })}
            </ul>
        </fieldset>)

}

