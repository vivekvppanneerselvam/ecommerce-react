import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { editProduct, addProduct, fetchDepartments, fetchCategories } from '../action'

function ProductForm(props) {
    const [state, setState] = useState({
        image: "",
        title: "",
        description: "",
        department: "",
        category: "",
        price: "",
        color: "",
        size: "",
        quantity: 0
    })
    const [departments, setDepartments] = useState([])
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState([]);



    useEffect(() => {
        console.log("haha", props.isCreate, props.defaults)
        if (props.isCreate !== undefined) {
            if (!props.isCreate) {
                console.log("haha", props.isCreate, props.defaults)
                setState(props.defaults)
            }
        }
        props.fetchDepartments()
        props.fetchCategories()
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

    const onFileChange = event => {
        setImage(event.target.files[0]);
    };

    function onSaveHandler() {
        if (!props.isCreate) {
            props.editProduct(state)
        } else {
            const formData = new FormData();
            formData.set("image", image, image.name);
            for (let key in state) {
                console.log(key + ',' + state[key])
                if (key !== 'image') {
                    formData.set(key, state[key])
                }
            }
            props.addProduct(formData)
        }
    }
    return (
        <div className='container'>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Title</label>
                <div className={'col-md-8'}>
                    <input type="text" id={'title'} value={state.title} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Description</label>
                <div className={'col-md-8'}>
                    <textarea type="text" id={'description'} value={state.description} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div><br />
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Department</label>
                <div className={'col-md-8'}>
                    <select className={'form-control rounded-0'} id={'department'} value={state.department} onChange={(e) => onChangeHandler(e)}>
                        <option value={''}>Select</option>
                        {departments.map(item => <option value={item.departmentName}>{item.departmentName}</option>)}
                    </select>
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Category</label>
                <div className={'col-md-8'}>
                    <select className={'form-control rounded-0'} id={'category'} value={state.category} onChange={(e) => onChangeHandler(e)}>
                        <option value={''}>Select</option>
                        {categories.map(item => <option value={item.categoryName}>{item.categoryName}</option>)}
                    </select>
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Price</label>
                <div className={'col-md-8'}>
                    <input type="text" className="form-control rounded-0" id={'price'} value={state.price} maxLength={10} onChange={(e) => {
                        if (isNaN(Number(e.target.value))) {
                            return;
                        } else onChangeHandler(e)
                    }} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Color</label>
                <div className={'col-md-8'}>
                    <input type="text" id={'color'} value={state.color} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Size</label>
                <div className={'col-md-8'}>
                    <input type="text" id={'size'} value={state.size} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Quantity</label>
                <div className={'col-md-8'}>
                    <input type="text" id={'quantity'} value={state.quantity} className={'form-control rounded-0'} onChange={(e) => {
                        if (isNaN(Number(e.target.value))) {
                            return;
                        } else onChangeHandler(e)
                    }} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'}>Image Upload</label>
                <div className={'col-md-8'}>
                    {props.isCreate ? <input type="file" id={'imagePath'} onChange={(e) => onFileChange(e)} /> : <span>{state.imagePath}</span>}
                </div>
            </div>
            <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => onSaveHandler()}>Save</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        departments_loading: state.AdminReducer.getIn(['departments', 'loading'], true),
        departments: state.AdminReducer.getIn(['departments'], Map),
        categories_loading: state.AdminReducer.getIn(['categories', 'loading'], true),
        categories: state.AdminReducer.getIn(['categories'], Map),
    }
}

export default connect(mapStateToProps, { editProduct, addProduct, fetchDepartments, fetchCategories })(ProductForm)