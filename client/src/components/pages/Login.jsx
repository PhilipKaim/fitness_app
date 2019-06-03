import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from '../presentational/Footer';


class Login extends Component {

    componentDidMount() {
        if (window.localStorage.getItem('jwt')) {
            this.props.history.push('/home');
        }
    }

    render() {
        const { visability, modal } = this.props.modal;

        const backgroundImage = require('../../images/home-hero.jpg')

        return (
            <div className='login'>                
                <main>
                    <section style={{backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center -420px', height: '487px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10% 5%'}}>
                        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{maxWidth: '960px', backgroundColor: '#FFFFFF', opacity: '0.9', borderRadius: '6px', padding: '36px 5%'}}>
                                <h1 style={{fontSize: '40px', fontWeight: '700', color: '#465A52', textTransform: 'uppercase', textAlign: 'center'}}>know where you stand with your nutrition</h1>
                                <h2 style={{fontWeight: '400', fontSize: '40px', color: '#0B0B0D', textTransform: 'uppercase', textAlign: 'center'}}>get to your goals <span style={{fontWeight: 'bolder'}}>faster</span></h2>
                            </div>
                        </div>
                    </section>
                    <section style={{display: 'flex', flexWrap: 'wrap', padding: '120px 0'}} className='container'>
                        <div className='col-md-8 col-sm-12'>
                            <h3 style={{color: '#0B0B0D', fontStyle: 'italic', fontSize: '33px'}}>HAVING TROUBLE LOSING OR GAINING WEIGHT?</h3>
                            <p style={{color: '#465A52', fontSize: '26px'}}>NutriTrack allows you to keep track of the foods you eat and gives you a personalized dashboard, so you know you are on track to meet your nutrition goals.</p>
                            <p style={{color: '#465A52', fontSize: '26px'}}><span style={{fontStyle: 'italic'}}>Login</span> or <span style={{fontStyle: 'italic'}}>signup</span> today to get to your <span style={{fontWeight: '600'}}>nutrition goals faster</span>.</p>
                        </div>
                        <div className='col-md-4 col-sm-12'>
                            <img style={{width: '100%', height: 'auto'}} src={require('../../images/dashboard.svg')} alt="dashboard svg image"/>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      modal: state.modals,
      sideDrawer: state.sideDrawer
    };
};

export default connect(mapStateToProps)(Login);