import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'
import { Map, List } from 'immutable'
import Modal from '../../../components/modal'
import Confirmation from '../../../components/confirmation'
import ProductForm from './productform'
import { fetchProducts } from '../action'


function ProductGrid(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    const [popupData, setPopupData] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            { headerName: 'sno', field: 'content_id', width: 50, filter: false },
            { headerName: "Title", field: "title", width: 100 },
            { headerName: "Description", field: "description", width: 150 },
            { headerName: "department", field: "department", width: 150 },
            { headerName: "category", field: "category", width: 100 },
            { headerName: "price", field: "price", width: 150 },
            { headerName: "color", field: "color", filter: false, width: 50 },
            { headerName: "size", field: "size", filter: false, width: 50 },
            { headerName: "quantity", field: "quantity", filter: false, width: 75 },
            { headerName: "", field: "edit", filter: false, width: 70, cellRendererFramework: clickableField },
            { headerName: "", field: "delete", filter: false, width: 70, cellRendererFramework: clickableField }
        ],
        rowSelection: 'single',
        rowData: [],
        defaultColDef: {
            editable: false,
            resizable: true,
            filter: true
        },
        context: { componentParent: this }
    }

    function clickableField(gridProps) {
        let { data, colDef } = gridProps
        if (colDef.field === "edit") {
            return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { editClickHandler(data) }}><i className={'fa fa-edit'}></i></button>
        } else if (colDef.field === "delete") {
            return <button className={'btn btn-sm btn-secondary rounded-0'} onClick={() => { deleteClickHandler(data) }}><i className={'fa fa-trash'}></i></button>
        }
    }
    const onGridReady = (params) => {
        const { api, columnApi } = params
        api.sizeColumnsToFit();
        api.refreshCells()
        setGridApi(api);
    }
    useEffect(() => {
        props.fetchProducts()
    }, [])
    useEffect(() => {
        if (!props.products_loading) {
            setRowData(props.products.toJS().data)
        }
    }, [props.products_loading])


    const editClickHandler = (data) => {
        setIsCreate(false)
        setIsModalOpen(!isModalOpen)
        setPopupData(data)
    }
    const deleteClickHandler = () => {
        setModalDeleteFlg(true)
    }
    function closeHandler() {
        setIsModalOpen(false)
        setModalDeleteFlg(false)
    }

    function confirmationHandler(value, data) {
        if (value === 'yes') {

        } else {
            setModalDeleteFlg(false)
        }
    }
    return (
        <div onClick={e => e.stopPropagation()}>
            {isModalOpen && <Modal
            contentStyle={{height:'65%'}}
                showModal={isModalOpen}
                handleClose={(e) => {
                    closeHandler()
                }}>
                <ProductForm type={''} isCreate={false} defaults={popupData} />
            </Modal>}
            {modalDeleteFlg && <Confirmation
                showModal={modalDeleteFlg}
                handleClose={(e) => closeHandler()}
                handleConfirmationMessage={(e) => confirmationHandler(e)}
                title={'confirmation'}
            > <span>Are you sure you want to delete the record</span>

            </Confirmation>}
            <div className="ag-theme-balham" style={{ height: '450px' }}>
                <AgGridReact
                    modules={AllCommunityModules}
                    columnDefs={gridOptions.columnDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                    pagination={true}
                    context={gridOptions.context}
                    defaultColDef={gridOptions.defaultColDef}
                    gridOptions={gridOptions}
                    rowSelection={gridOptions.rowSelection}
                    floatingFilter={true}
                >
                </AgGridReact>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        products_loading: state.AdminReducer.getIn(['products', 'loading'], true),
        products: state.AdminReducer.getIn(['products'], List())
    }
}

const mapDispatchToProps = {
    fetchProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid)