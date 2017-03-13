import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AutoComplete, Icon, Input } from 'antd';
import { actions } from 'awv3/session/store/elements';

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class ConsoleElement extends React.PureComponent {
    componentWillReceiveProps({ item }) {
        item.focus && ReactDOM.findDOMNode(this.refs.input).querySelector('input').focus();
    }
    handleChange = event => this.props.update(this.props.id, { value: event });
    handleKeyPress = value => this.props.update(this.props.id, { lastEvent: { key: 'Enter', target: { value } } });
    render() {
        let { value, children } = this.props.item;
        return (
            <AutoComplete
                ref="input"
                placeholder="Just type ..."
                style={{ ...this.props.style }}
                value={value}
                dataSource={children}
                onChange={this.handleChange}
                onSelect={this.handleKeyPress}
            />
        );
    }
}
