import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ProductForm from './component/productform'
import OrderGrid from './component/ordergrid'
import ProductGrid from './component/productgrid'
import { fetchDepartments, fetchCategories, addDepartment, addCategory, editDepartment, fetchUsersCount, fetchPendingOrdersCount } from './action'

function Admin(props) {
    const [departments, setDepartments] = useState([])
    const [categories, setCategories] = useState([])
    const [state, setState] = useState({
        department: '',
        category: '',
        inputDepartment: '',
        inputCategory: ''
    })

    const [widget, setWidget] = useState({
        users: 0,
        orders: 0,
        monthlyIncome: 0,
        annualIncome: 0
    })

    useEffect(() => {
        props.fetchDepartments()
        props.fetchCategories()
        fetchUsersCount.then(data => {
            setWidget(prevState => {
                prevState.users = data.count
                return ({ ...prevState })
            })
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
        fetchPendingOrdersCount.then(data => {
            setWidget(prevState => {
                prevState.orders = data.count
                return ({ ...prevState })
            })
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (!props.departments_loading) {
            if (!props.departments.toJS().error) {
                setDepartments(props.departments.toJS().data)
            }
        }
        if (!props.categories_loading) {
            if (!props.categories.toJS().error) {
                setCategories(props.categories.toJS().data)
            }
        }
    }, [props.departments_loading, props.categories_loading])

    function onChangeHandler(e) {
        let key = e.target.id, value = e.target.value
        setState(prevState => {
            prevState[key] = value
            return ({ ...prevState })
        })
    }

    function handleCloseTag(department, category) {
        if (state.department) {
            let arr = departments.filter(c =>
                c.departmentName === state.department
            ).map(item => {
                let arr = item.categories.split(',').filter(n => {
                    return n !== category
                })
                item.categories = arr.join();
                return item
            })
            if (arr.length > 0) props.editDepartment(arr[0])
        }
    }

    function addDepartment() {
        props.addDepartment({ departmentName: state.inputDepartment, categories: '' })
    }

    function addCategory() {
        props.addCategory({ categoryName: state.inputCategory })
    }

    function editDepartment() {
        if (state.department) {
            let arr = departments.filter(c =>
                c.departmentName === state.department
            ).map(item => {
                let catArr = item.categories.split(',').filter(n => {
                    return (n === state.category)
                })
                let dumArr = item.categories.split(',')
                if (catArr <= 0) dumArr.push(state.category)
                item.categories = dumArr.join();
                return item
            })
            console.log(arr)
            if (arr.length > 0) props.editDepartment(arr[0])
        } else {
            alert('select department to add category')
        }
    }
    return (<div><br />
        <div className="jumbotron">
            <div className="container">
                <div class="row">

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Earnings (Monthly)</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{widget.monthlyIncome}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fa fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Earnings (Annual)</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{widget.annualIncome}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fa fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Earnings (Monthly) Card Example --> */}
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">No. of Users
                    </div>
                                        <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{widget.users}</div>
                                            </div>
                                            <div class="col">
                                                <div class="progress progress-sm mr-2">
                                                    <div class="progress-bar bg-info" role="progressbar" style={{ width: "50%" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fa fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Pending Requests Card Example --> */}
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            No. of Pending Orders</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{widget.orders}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fa fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <fieldset>
                    <div className={'tabbable-panel'}>
                        <div className={'tabbable-line'}>
                            <ul className={'nav nav-tabs'}>
                                <li><a href="#tab_default_1" data-toggle="tab" className={'active'}>Orders</a></li>
                                <li><a href="#tab_default_2" data-toggle="tab" >View / Edit Product</a></li>
                                <li><a href="#tab_default_3" data-toggle="tab" >Add Product</a></li>
                                <li><a href="#tab_default_4" data-toggle="tab" >Add Department / Category</a></li>
                            </ul>
                            <div className={'tab-content'}>
                                <div className={'tab-pane active'} id="tab_default_1"><OrderGrid /></div>
                                <div className={'tab-pane '} id="tab_default_2"><ProductGrid /></div>
                                <div className={'tab-pane '} id="tab_default_3"><ProductForm isCreate={true} /></div>
                                <div className={'tab-pane '} id="tab_default_4">
                                    <div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className={'form-group row'}>
                                                    <label className={'col-sm-4 col-form-label'}>Department</label>
                                                    <div className={'col-md-8'}>
                                                        <div class="input-group">
                                                            <input type="text" id={'inputDepartment'} value={state.inputDepartment} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                                                            <span class="input-group-addon rounded-0" onClick={() => addDepartment()}><i className={'fa fa-plus'}></i></span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className={'form-group row'}>
                                                    <label className={'col-sm-4 col-form-label'}>Category</label>
                                                    <div className={'col-md-8'}>
                                                        <div class="input-group">
                                                            <input type="text" id={'inputCategory'} value={state.inputCategory} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                                                            <span class="input-group-addon rounded-0" onClick={() => addCategory()} >
                                                                <i className={'fa fa-plus'}></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><br />
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                &nbsp;&nbsp;<strong>Edit Department Categories</strong><br /><br />
                                                <div className={'form-group row'}>
                                                    <label className={'col-sm-4 col-form-label'}>Select a Department</label>
                                                    <div className={'col-md-8'}>
                                                        <select className={'form-control rounded-0'} id={'department'} value={state.department} onChange={(e) => onChangeHandler(e)}>
                                                            <option></option>
                                                            {departments.map(item => <option value={item.departmentName}>{item.departmentName}</option>)}
                                                        </select>
                                                    </div>
                                                </div><br />
                                                <div style={{ border: '1px solid grey', height: '170px' }}>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '12px' }}>   {state.department && departments.filter(c =>
                                                        c.departmentName === state.department
                                                    ).map(item => {
                                                        return item.categories.split(',').map(n => (
                                                            <div key={n} style={{
                                                                background: 'rgba(0,0,0,.1)',
                                                                display: 'flex',
                                                                flexWrap: 'nowrap',
                                                                marginLeft: '2px'
                                                            }}>
                                                                <div className={{ margin: '0 .2rem' }}> {n} </div>
                                                                <div style={{ padding: '0 .2rem', borderLeft: '1px solid white' }} onClick={() => handleCloseTag(state.department, n)}> x</div>
                                                            </div>
                                                        ))
                                                    })}</div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'><br /><br />
                                                <div className={'form-group row'}>
                                                    <label className={'col-sm-4 col-form-label'}>Select a Category</label>
                                                    <div className={'col-md-8'}>
                                                        <div class="input-group">
                                                            <select className={'form-control rounded-0'} id={'category'} value={state.category} onChange={(e) => onChangeHandler(e)}>
                                                                <option value={''}>Select</option>
                                                                {categories.map(item => <option value={item.categoryName}>{item.categoryName}</option>)}
                                                            </select>
                                                            <span class="input-group-addon rounded-0" onClick={(e) => editDepartment(e)} ><i className={'fa fa-plus'}></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div >
        </div ></div>)
}
const mapStateToProps = (state) => {
    return {
        departments_loading: state.AdminReducer.getIn(['departments', 'loading'], true),
        departments: state.AdminReducer.getIn(['departments'], Map),
        categories_loading: state.AdminReducer.getIn(['categories', 'loading'], true),
        categories: state.AdminReducer.getIn(['categories'], Map),
    }
}
export default connect(mapStateToProps, { fetchDepartments, fetchCategories, addDepartment, addCategory, editDepartment })(Admin)