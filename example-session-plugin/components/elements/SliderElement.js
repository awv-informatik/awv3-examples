import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';
import { actions } from 'awv3/session/store/elements';

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class SliderElement extends React.PureComponent {
    handleChange = value => this.props.update(this.props.id, { value });
    render() {
        let { item } = this.props;
        return (
            <div style={{ ...this.props.style, marginLeft: 10, marginRight: 10, fontSize: '0.5em' }}>
                <Slider
                    marks={item.positions}
                    value={item.value}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
