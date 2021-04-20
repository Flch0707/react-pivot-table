import { ListSelection } from './ListSelection'
import Button from '../Button'
import { useContext, useEffect } from 'react'
import { PtSetCtx } from '../../contexts/PtSetCtx'
const SettingModal = ({ headings, showModal }) => {
    const { state, onLoadColumns } = useContext(PtSetCtx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { onLoadColumns(headings) }, [])

    return (
        <div className="setting-modal">
            <div className="setting-modal-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', maxHeight: '10vh' }}>
                    <h2>{"Pivot table setting:"}</h2>
                    <div>
                        <Button
                            onClick={showModal}
                            icoName='FiPlay'></Button>
                        <Button
                            onClick={showModal}
                            icoName='FiX'></Button>
                    </div>
                </div>
                <div
                    className="setting-modal-body">
                    <div
                        style={{ overflow: 'hidden' }}
                        className="select-tile-selection">
                        <ListSelection
                            id={'colCollection'}
                            height={'70vh'}
                            title={'Selection'}
                            list={state && state.colCollection} />
                    </div>

                    <div
                        style={{ overflow: 'auto' }}
                        className="select-tile-selection">
                        <ListSelection
                            id={'rowSelection'}
                            height={'23vh'}
                            resize={'vertical'}
                            title={'Rows'}
                            hasNumber={true}
                            list={state && state.rowSelection} />
                        <ListSelection
                            id={'colSelection'}
                            height={'23vh'}
                            resize={'vertical'}
                            title={'Columns'}
                            hasNumber={true}
                            list={state && state.colSelection} />
                        <ListSelection
                            id={'valueSelection'}
                            height={'21vh'}
                            resize={'vertical'}
                            title={'Values'}
                            hasNumber={false}
                            hasValueParams={true}
                            list={state && state.valueSelection} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingModal
