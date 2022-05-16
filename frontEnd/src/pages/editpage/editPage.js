import React, { useEffect } from 'react'
import { Box, Container } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import './editePage.css'
import { reset, updateUser } from '../../store/graphqlUser/graphqlUserSlice';
import { useNavigate } from 'react-router-dom';
const EditPage=()=>{
    const { user, isSuccess, isError, isLoading } = useSelector((state) => state.user||localStorage.user);

    const dispatch = useDispatch()
    const navigate =useNavigate()
    const validationSchema = Yup.object({
        username: Yup.string().required('Please Enter your username'),
        phone: Yup.string().required('Please Enter your phone'),
        bio: Yup.string().required('Please Enter your bio'),
        email: Yup.string().required('Please Enter your email'),
        password: Yup.string().required('Please Enter your password'),
        
    })

    const formik = useFormik({
        initialValues: {
            username:user.username,
            phone:user.phone,
            bio:user.bio,
            email:user.email,
            password:user.password,
        },
        onSubmit: values => {
           
           
           
            let formData = new FormData();
            formData.append('username', values.username)
            formData.append('phone', values.phone)
            formData.append('email', values.email)
            formData.append('bio', values.bio)
            formData.append('password', values.password)
           
            dispatch(updateUser({values,email:user.email}))

            if (isError) {
                console.log("error mesage")
            }
            if ( user) {
                // dispatch(reset())
                // navigate('/edit')
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
                                                    <label htmlFor="username" className="form-label">username </label>
                                                    <input className='form-control' placeholder='Enter Your fullname' type="text" name='username'
                                                        {...formik.getFieldProps('username')} />
                                                </div>
                                                {formik.touched.username && formik.errors.username ? <div className='errorForm'>{formik.errors.username}</div> : null}
                                            </div>
                                            {/* mobil input */}
                                            <div className="mb-3 col-sm-12 col-md-12 ">
                                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                                <input className='form-control' type="text" placeholder='Enter Your Phonenumber' name='phone'
                                                    {...formik.getFieldProps('phone')} />
                                                {formik.touched.phone && formik.errors.phone ? <div className='errorForm'>{formik.errors.phone}</div> : null}
                                            </div>

                                            <div className="mb-3 col-sm-12 col-md-12 ">
                                                <label htmlFor="bio" className="form-label">Phone Number</label>
                                                <input className='form-control' type="text" placeholder='Enter Your Phonenumber' name='bio'
                                                    {...formik.getFieldProps('bio')} />
                                                {formik.touched.bio && formik.errors.bio ? <div className='errorForm'>{formik.errors.bio}</div> : null}
                                            </div>

                                            <div className="mb-3 col-sm-12 col-md-12 ">
                                                <label htmlFor="bio" className="form-label">password</label>
                                                <input className='form-control' type="text" placeholder='Enter Your Phonenumber' name='bio'
                                                    {...formik.getFieldProps('password')} />
                                                {formik.touched.password && formik.errors.password ? <div className='errorForm'>{formik.errors.password}</div> : null}
                                            </div>

                                            <button type="submit" className="btn font-weight-bold-1 w-100 mb-3">Save and continue</button>
                                        </form>

    </Container>
    </Box>
)

}
export default EditPage;