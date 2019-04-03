import React from 'react';
import { connect } from 'react-redux';

import { addFoodModal } from '../../actions/modals';

import '../../styles/components/ListItems.css';

const ListItem = (props) => (
            <div className='search__items'>
                <li className='search__item' onClick={() => {
                    props.setSelectedFood(props.item);
                    props.dispatch(addFoodModal(true, 'add'));
                }}>{ props.item }</li>
            </div>
);

export default connect()(ListItem);