import React from 'react';

const Footer = (props) => {
        return (
            <footer style={{backgroundColor: '#A4B0AC'}}>
                <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <div>
                        <img style={{height: '72px', width: 'auto'}} src={require('../../images/leaf.svg')} alt="footer leaf logo"/>
                    </div>
                    <div>
                        <p style={{textAlign: 'center', margin: '0'}}>Nutrition data supplied by nutritionix.com</p>
                    </div>
                </div>
            </footer>
        );
}

export default Footer;