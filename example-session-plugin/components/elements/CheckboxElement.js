import React from 'react';
import { connect } from 'react-redux';
import { Switch, Checkbox as AntCheckbox } from 'antd';
import { actions } from 'awv3/session/store/elements';
import Checkbox from 'awv3/session/elements/checkbox';

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class CheckboxElement extends React.PureComponent {
    handleChange = value => this.props.update(this.props.id, { value });
    render() {
        let { value, format, name } = this.props.item;
        return format === Checkbox.Format.Default
            ? <Switch
                  style={{ ...this.props.style, flex: 0 }}
                  checked={this.props.item.value}
                  onChange={this.handleChange}
              />
            : <AntCheckbox
                  style={{ ...this.props.style, whiteSpace: 'nowrap' }}
                  checked={this.props.item.value}
                  onChange={this.handleChange}>
                  {this.props.item.name}
              </AntCheckbox>;
    }
}
