import React from 'react';
import { connect } from 'react-redux';
import { Input, Dropdown, Menu, Button, Icon } from 'antd';
import { actions as pluginActions } from 'awv3/session/store/plugins';

@connect((state, props) => ({ item: state.plugins[props.id] }))
class ControlPlugin extends React.PureComponent {
    render() {
        let { name, type, icon, enabled, resources } = this.props.item;
        return (
            <div>
                <Icon type={`check-square${enabled ? '' : '-o'}`} style={{ marginRight: '1.5em' }} />
                <img style={{ width: 20, marginRight: '1.5em', verticalAlign: 'middle' }} src={resources[icon]} />
                {!!name ? name : type}
            </div>
        );
    }
}

@connect(state => ({ globalPlugins: state.globals.plugins }), pluginActions)
export default class Controls extends React.PureComponent {
    static contextTypes = { session: React.PropTypes.object };
    onClickPlugins = ({ key }) => {
        this.props.toggle(key);
        this.props.collapse(key, false);
    };
    render() {
        console.log('render Controls');
        let { globalPlugins } = this.props;
        return (
            <div style={{ position: 'absolute', top: 15, right: 15 }}>
                <Dropdown
                    trigger={['click']}
                    overlay={
                        (
                            <Menu style={{ minWith: 250 }} onClick={this.onClickPlugins}>
                                {globalPlugins.map(id => (
                                    <Menu.Item key={id}>
                                        <ControlPlugin id={id} />
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )
                    }>
                    <Button type="ghost" icon="down">Plugins</Button>
                </Dropdown>
            </div>
        );
    }
}
