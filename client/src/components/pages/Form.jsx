import React, { useEffect } from 'react';
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import queryString from 'query-string';

const InitForm = ({ errors, touched, isSubmitting }) => {

    useEffect(() => {
        let query = queryString.parse(window.location.search);
            
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
        }
    }, [])

    // SPINNER NOT VISABLE
    function loader() {
        return (
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh', width: '100vw'}}>
            <Form className='shadow p-5 d-flex flex-column'>
                <h1 className='text-center'>Hello John Doe</h1>
                
                <div className='form-group'>
                    { touched.weight && errors.weight & <p>{ errors.weight }</p> }
                    <label htmlFor='weight'>Your current weight(lbs):
                        <Field type='number' name='weight' autoFocus />
                    </label>
                </div>

                <div className='form-group'>  
                    <label htmlFor='goal'>Your current fitness goal:
                        <Field component='select' name='goal'>
                            <option value='loseWeight'>Lose Weight</option>
                            <option value='gainMuscle'>Gain Muscle</option>
                        </Field>
                    </label>
                </div>

                <button className='btn btn-primary' disabled={isSubmitting} type='submit' value='Submit'>{isSubmitting && loader()} Submit</button>
            </Form>
        </div>
    );
};

const FormikApp = withFormik({
    mapPropsToValues({weight, goal}) {
        return {
            weight: weight || '',
            goal: goal || 'Lose Weight'
        }
    },
    validationSchema: Yup.object().shape({
        // REQUIRED ERROR MESSAGE NOT SHOWING
        weight: Yup.number().min(2).required('Your current weight is required')
    }),
    async handleSubmit(values, { setSubmitting }) {
        const {weight, goal} = values

        try {
            await axios.post(`/api/form/${weight}/${goal}`)
            setSubmitting(false)
        } catch(e) {
            console.log(e);
            setSubmitting(false)
        } 
        
    }
})(InitForm)

export default FormikApp;