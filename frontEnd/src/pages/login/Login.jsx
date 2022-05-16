import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Capture from '../../assets/Capture.PNG'
import * as Yup from 'yup';
//import "./login.css"
import style from './Login.module.css';
import { loginUser, reset } from '../../store/graphqlUser/graphqlUserSlice';

const validationSchema = Yup.object({
    email: Yup.string().required('Please Enter your Email').email('Invalid email format'),
    password: Yup.string().required('Please Enter your Password')
})

const Login = ({ handleChange }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, user, isSuccess, isError, message } = useSelector((state) => state.user)
    


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        
        onSubmit: values => {
            console.log(values)
            const userData = {
                email: values.email,
                password: values.password
            }
            dispatch(loginUser(userData))
            if (isError) {
                console.log("error mesage")
            }
            if (isSuccess || user) {
                navigate('/home')
            }
             dispatch(reset())
        },
        validationSchema,
    })



    useEffect(() => {

        if (isSuccess || user) {
            // dispatch(reset())
            navigate('/home')
        }

    }, [user, isSuccess, isError, message, navigate, dispatch])
    

    return (<>
    <div className={style.container}>
        <div className={style.formContainer}>
            <div><p className={style.titleLogo}>devchallanges</p></div>
            <div><img src={Capture} alt=""  className={style.imageLogo}/>  </div>
        
             <div>
             <p className={style.mainTitle}>Join thousands of learners from around the world </p>   
            </div>
            <div>
             <p className={style.subTitle}>Master web development by making real-life projects. There are multiple paths for you to choose</p>   
            </div>      
        <form className={style.form}  onSubmit={formik.handleSubmit}>
           
            <div>
                <label htmlFor="email">
                <i className="fa-solid border p-2 rounded-circle fa-user"></i></label>
                <input placeholder='Email' className={style.email}
                    type="email" name='email'
                    {...formik.getFieldProps('email')} />
            </div>
            {formik.touched.email && formik.errors.email ? <div style={{color:"red",marginLeft:"20px"}} className='error'>{formik.errors.email}</div> : null}
            <div>
                <label htmlFor="Password"><i className="fa-solid fa-unlock-keyhole border p-2 rounded-circle"></i></label>
                <input placeholder='Password' className={style.password}
                    type="password" name='password'
                    {...formik.getFieldProps('password')}
                />
            </div>
            {formik.touched.password && formik.errors.password ? <div style={{color:"red",marginLeft:"20px"}} className='error'>{formik.errors.password}</div> : null}
           <div className={style.btnLogin}>
           <button className={style.btnSubmit}  type="submit">Start Coding Now <i className="fa-solid fa-right-to-bracket"></i></button><br />
           </div>
           
            {isError &&<div><span style={{color:"red"}}>userName or password is inCorrect</span></div> }
        </form>
            <div>
             <p className={style.bottomTitle}>or continue with these social profile</p>   
            </div>   
            <div className={style.iconsdiv}>
            <i style={{fontSize:"40px",marginLeft:"14px",color:"#828282",cursor:"pointer"}} className="fa-brands fa-github"></i>
            <i style={{fontSize:"40px",marginLeft:"14px",color:"#828282",cursor:"pointer"}} className="fa-brands fa-facebook"></i>
            <i style={{fontSize:"40px",marginLeft:"14px",color:"#828282",cursor:"pointer"}} className="fa-brands fa-twitter"></i>
            <i style={{fontSize:"38px",marginLeft:"14px",color:"#828282",cursor:"pointer"}} className="fa-brands fa-google"></i>
            </div>

            <div>
             <p className={style.finallTitle}>Already a member? <span style={{color:"#2F80ED",cursor:"pointer"}}>Login</span></p>   
            </div> 
        </div>
        </div>
    </>);
}


export default Login;
