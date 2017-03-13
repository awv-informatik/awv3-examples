import React from 'react';
import { connect } from 'react-redux';

@connect((state, props) => ({ item: state.elements[props.id] }))
export default class LabelElement extends React.PureComponent {
    render() {
        return this.props.item.value;
    }
}
