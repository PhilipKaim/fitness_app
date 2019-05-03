import React, { useState, useEffect } from 'react';
import Aside from '../presentational/Aside';
import NavBar from '../presentational/NavBar';
import Alert from '../presentational/Alert.jsx';

import axios from 'axios'
import { connect } from 'react-redux';

import { showAlert } from '../../actions/user';

const Settings = (props) => {

    let [image, setImage] = useState(null)
    let [goal, setGoal] = useState(props.user.goal)

    useEffect(() => {
        // document.querySelector('#goal').value = props.user.goal

        // console.log(document.querySelector('#goal').value);
        
        
    }, [image, goal])

    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()

        formData.append('upload-image', image, image.name)
        formData.append('goal', goal)

        axios.post(`/api/upload-image/${props.user.token}`, formData).then(res => {
            return props.dispatch(showAlert(res.data));
        }).catch(err => console.log(err))
        
    }

    let message = props.user.message

    return (
        <div>
            <NavBar signout={ true } />
            <div className='row'>
                <Aside />
                <div className="col-md-9">

                    { message && <Alert message={message} /> }

                    <form onSubmit={handleSubmit}>
                        <input name='profileImage' id='uploadImage' type="file" onChange={(e) => {
                            setImage(e.target.files[0])
                        }}/>

                        <label htmlFor="goal">Goal:
                            <select name="goal" id="goal" onChange={(e) => { setGoal(e.target.value) }}>
                                <option value="lose weight">Lose Weight</option>
                                <option value="Gain Muscle">Gain Muscle</option>
                            </select>
                        </label>
                        
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Settings);