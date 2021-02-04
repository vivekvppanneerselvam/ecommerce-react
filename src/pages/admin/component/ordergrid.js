import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'
import { Map, List } from 'immutable'
import Modal from '../../../components/modal'
import Confirmation from '../../../components/confirmation'
import { fetchOrders } from '../action'
import jumpTo from '../../../modules/Navigation';


function OrderGrid(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    const [popupData, setPopupData] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            { headerName: 'Order Id', field: '_id', width: 150, filter: false },
            { headerName: "Priority", field: "priority", width: 75 },
            { headerName: "Total Amount", field: "totalAmount", width: 120, filter: false },
            { headerName: "Payment Method", field: "paymentMethod", width: 75 },
            { headerName: "Payment Status", field: "paymentStatus", width: 75 },
            { headerName: "Order Status", field: "orderStatus", width: 100 },
            { headerName: "Shipping Type", field: "shippingType", width: 100 },
            { headerName: "Create Date", field: "createDate", width: 125 },            
            { headerName: "", field: "view", filter: false, width: 70, cellRendererFramework: clickableField },            
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
        if (colDef.field === "view") {
            return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { viewClickHandler(data) }}><i className={'fa fa-file'}></i></button>
        } else if (colDef.field === "cancel") {
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
        props.fetchOrders()
    }, [])
    useEffect(() => {
        if (!props.orders_loading) {
            setRowData(props.orders.toJS().data)
        }
    }, [props.orders_loading])


    const viewClickHandler = (data) => {
            jumpTo('/order/'+data._id)       
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
                showModal={isModalOpen}
                handleClose={(e) => {
                    closeHandler()
                }}>
                {/* <Form type={''} isCreate={false} defaults={popupData} /> */}
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
        orders_loading: state.AdminReducer.getIn(['orders', 'loading'], true),
        orders: state.AdminReducer.getIn(['orders'], Map())
    }
}

const mapDispatchToProps = {
    fetchOrders    
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderGrid)