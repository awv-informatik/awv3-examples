import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { actions } from 'awv3/session/store/elements';
import InputImpl from 'awv3/session/elements/input';

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class InputElement extends React.PureComponent {
    handleChange = event => this.props.update(this.props.id, { value: event.target.value });
    handleChangeX = e => this.props.update(this.props.id, {
        value: e.target.value + ',' + this.refs.y.props.value + ',' + this.refs.z.props.value
    });
    handleChangeY = e => this.props.update(this.props.id, {
        value: this.refs.x.props.value + ',' + e.target.value + ',' + this.refs.z.props.value
    });
    handleChangeZ = e => this.props.update(this.props.id, {
        value: this.refs.x.props.value + ',' + this.refs.y.props.value + ',' + e.target.value
    });
    handleKeyPress = event => this.props.event(this.props.id, event);
    render() {
        let { item, style } = this.props;
        let vector = [];
        if (item.format === InputImpl.Format.Vector) {
            vector = item.value.split(',');
        }
        return (
            <div style={{ ...style }}>
                <Choose>
                    <When condition={item.format === InputImpl.Format.Vector}>
                        <Input.Group style={{ display: 'flex' }}>
                            <Input ref="x" value={vector[0]} onChange={this.handleChangeX} />
                            <Input ref="y" value={vector[1]} onChange={this.handleChangeY} />
                            <Input ref="z" value={vector[2]} onChange={this.handleChangeZ} />
                        </Input.Group>
                    </When>
                    <Otherwise>
                        <Input
                            value={item.value}
                            style={item.style}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            type={item.format === InputImpl.Format.MultiLine ? 'textarea' : 'text'}
                            autosize={item.format === InputImpl.Format.MultiLine ? { minRows: 5 } : false}
                            disabled={item.readonly}
                        />
                    </Otherwise>
                </Choose>
            </div>
        );
    }
}
