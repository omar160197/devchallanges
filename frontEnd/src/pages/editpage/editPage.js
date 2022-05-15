import React, { useEffect } from 'react'
import { Box, Container } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer } from '../../store/user/userSlice';
// import "./editPage.css"
import './editePage.css'
const EditPage=()=>{
    const { user, isSuccess, isError, isLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Please Enter your Fullname'),
        customerPhone: Yup.string().required('Please Enter your Phone'),
        customerEmail: Yup.string().required('Please Enter your Email').email('Invalid email format'),
        role: Yup.string().required('Please Enter your Role'),
        customerCountry: Yup.string().required('Please Enter your Role'),
        customerCity: Yup.string().required('Please Enter your Role'),
        customerStreet: Yup.string().required('Please Enter your Role'),
        customerBuilding: Yup.string().required('Please Enter your Role'),
        customerFloor: Yup.string().required('Please Enter your Role'),
    })


    const formik = useFormik({
        initialValues: {
            fullName: user.customer.fullName,
            customerPhone: user.customer.customerPhone,
            customerEmail: user.customer.customerEmail,
            role: user.customer.role,
            image: user.customer.image,
            customerCountry: user.customer.customerAddress.country,
            customerCity: user.customer.customerAddress.city,
            customerStreet: user.customer.customerAddress.streetName,
            customerBuilding: user.customer.customerAddress.buildingNumber,
            customerFloor: user.customer.customerAddress.floorNumber,
        },
        onSubmit: values => {
           
           
            console.log(values)
            let formData = new FormData();
            formData.append('fullName', values.fullName)
            formData.append('customerPhone', values.customerPhone)
            formData.append('customerEmail', values.customerEmail)
            formData.append('role', values.role)
            formData.append('image', values.image)
            formData.append('customerAddress',
                JSON.stringify(
                    {
                        country: values.customerCountry,
                        city: values.customerCity,
                        streetName: values.customerStreet,
                        buildingNumber: values.customerBuilding,
                        floorNumber: values.customerFloor,
                    }
                ))

            dispatch(editCustomer({formData,id:user.customer._id}))

            if (isError) {
                console.log("error mesage")
            }
            if (isSuccess || user) {
                // navigate('/')
            }
        },
        validationSchema,
    })
return(
    <Box
          sx={{
            borderRadius: "16px",
            border: "2px solid #E0E0E0",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >       
    <Container>
         <form onSubmit={formik.handleSubmit}>
                                            {/* ------------nameinput-------------- */}
                                            <div className="name d-flex form-recipts justify-content-between">
                                                <div className="mb-3 col-sm-12 col-md-12">
                                                    <label htmlFor="fullName" className="form-label">Customer Name</label>
                                                    <input className='form-control' placeholder='Enter Your fullname' type="text" name='fullName'
                                                        {...formik.getFieldProps('fullName')} />
                                                </div>
                                                {formik.touched.fullName && formik.errors.fullName ? <div className='errorForm'>{formik.errors.fullName}</div> : null}
                                            </div>
                                            {/* mobil input */}
                                            <div className="mb-3 col-sm-12 col-md-12 ">
                                                <label htmlFor="customerPhone" className="form-label">Phone Number</label>
                                                <input className='form-control' type="text" placeholder='Enter Your Phonenumber' name='customerPhone'
                                                    {...formik.getFieldProps('customerPhone')} />
                                                {formik.touched.customerPhone && formik.errors.customerPhone ? <div className='errorForm'>{formik.errors.customerPhone}</div> : null}
                                            </div>

                                            {/* -----------------addredss--------------------- */}
                                            <div className="name d-flex form-recipts justify-content-between">
                                                <div className="mb-3 divinput col-sm-12 col-md-5  ">
                                                    <label htmlFor="customerCountry" className="form-label"> Country</label>
                                                    <input type="text" className="form-control" name='customerCountry'
                                                        {...formik.getFieldProps('customerCountry')} />
                                        {formik.touched.customerCountry && formik.errors.customerCountry ? <div className='errorForm'>{formik.errors.customerCountry}</div> : null}
                                                </div>
                                               
                                                <div className="mb-3 divinput col-sm-12 col-md-5 ">
                                                    <label htmlFor="customerCity" className="form-label">City</label>
                                                    <input type="taxt" className="form-control " id="exampleInputlname" name="customerCity"
                                                    {...formik.getFieldProps('customerCity')}
                                                    />
                                        {formik.touched.customerCity && formik.errors.customerCity ? <div className='errorForm'>{formik.errors.customerCity}</div> : null}
                                                </div>
                                            </div>
                                            <div className="name d-flex form-recipts justify-content-between">
                                                <div className="mb-3 divinput col-sm-12 col-md-5  ">
                                                    <label htmlFor="customerStreet" className="form-label"> Street</label>
                                                    <input type="text" className="form-control" name='customerStreet'
                                                        {...formik.getFieldProps('customerStreet')} />
                                        {formik.touched.customerStreet && formik.errors.customerStreet ? <div className='errorForm'>{formik.errors.customerStreet}</div> : null}
                                                </div>
                                               
                                                <div className="mb-3 divinput col-sm-12 col-md-5 ">
                                                    <label htmlFor="customerBuilding" className="form-label">Building Number</label>
                                                    <input type="taxt" className="form-control " id="exampleInputlname" name="customerBuilding"
                                                    {...formik.getFieldProps('customerBuilding')}
                                                    />
                                        {formik.touched.customerBuilding && formik.errors.customerBuilding ? <div className='errorForm'>{formik.errors.customerBuilding}</div> : null}
                                                </div>
                                            </div>
                                            <div className="name d-flex form-recipts justify-content-between">
                                                <div className="mb-3 divinput col-sm-12 col-md-5  ">
                                                    <label htmlFor="customerFloor" className="form-label"> Floor Number</label>
                                                    <input type="text" className="form-control" name='customerFloor'
                                                        {...formik.getFieldProps('customerFloor')} />
                                        {formik.touched.customerFloor && formik.errors.customerFloor ? <div className='errorForm'>{formik.errors.customerFloor}</div> : null}
                                                </div>
                                               
                                            </div>

                                            <button type="submit" className="btn font-weight-bold-1 w-100 mb-3">Save and continue</button>
                                        </form>

    </Container>
    </Box>
)

}
export default EditPage;