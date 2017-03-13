import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { actions } from 'awv3/session/store/elements';

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class CheckboxElement extends React.PureComponent {
    handleChange = value => this.props.update(this.props.id, { value });
    render() {
        let { item } = this.props;
        return (
            <Select style={{ ...this.props.style }} defaultValue={item.value} onChange={this.handleChange}>
                {item.children.map(item => (
                    <Select.Option key={item} value={item} style={{ textTransform: 'capitalize' }}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
        );
    }
}
