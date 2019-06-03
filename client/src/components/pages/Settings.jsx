import React, { useState, useEffect } from 'react';
import Alert from '../presentational/Alert.jsx';

import axios from 'axios'
import { connect } from 'react-redux';

import { showAlert } from '../../actions/user';
import Layout from './Layout/Layout';

const Settings = (props) => {

    let [image, setImage] = useState(props.user.image)
    let [goal, setGoal] = useState(props.user.goal)
    let [weight, setWeight] = useState(props.user.weight)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()

        formData.append('upload-image', image, image.name)
        formData.append('goal', goal)
        formData.append('weight', weight)

        axios.post(`/api/upload-image/${props.user.token}`, formData).then(res => {
            return props.dispatch(showAlert(res.data));
        }).catch(err => console.log(err))
        
    }

    let message = props.user.message

    return (
        <Layout>
            <div>
                <div>
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

                        <label htmlFor="weight">
                            <input type="number" name="weight" id="weight" onChange={(e) => { setWeight(e.target.value) }} />
                        </label>
                        
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Settings);