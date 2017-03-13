import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapse, Icon } from 'antd';
import { actions as connectionActions } from 'awv3/session/store/connections';
import { actions as pluginActions } from 'awv3/session/store/plugins';
import { actions as globalActions } from 'awv3/session/store/globals';
import Element from '../components/elements/Element';

class Header extends React.PureComponent {
    state = { name: this.props.name };
    handleChange = ({ name }) => this.props.connection.setName(this.props.activeConnection, this.props.feature, name);
    render() {
        console.log('render Header');
        let { active, session, name, type, closeable, classes, onClose, icon, id, feature } = this.props;
        return (
            <span style={{ fontWeight: 500, color: active ? '#2db7f5' : '#666' }}>
                <img
                    style={{
                        width: 20,
                        marginLeft: '0.5em',
                        marginRight: '1em',
                        verticalAlign: 'middle'
                    }}
                    src={session.resolveResource(icon, id)}
                />
                <span>{name || type}</span>
                {closeable &&
                    <Icon
                        type="close"
                        style={{
                            width: 20,
                            marginLeft: '0.5em',
                            marginRight: '1em',
                            verticalAlign: 'middle'
                        }}
                        onClick={onClose}
                    />}
            </span>
        );
    }
}

@connect((state, props) => ({ item: state.plugins[props.id] }))
export class PluginBareBones extends React.PureComponent {
    static contextTypes = { session: React.PropTypes.object };
    render() {
        let session = this.context.session;
        return (
            <div>
                {this.props.item.elements
                    .sort((a, b) => session.elements[a].index > session.elements[b].index)
                    .map(key => <Element key={key} id={key} elementStyle={{ marginBottom: '0.25em' }} />)}
            </div>
        );
    }
}

@connect(
    (state, props) => {
        let connection = state.connections[state.globals.activeConnection];
        return {
            activeConnection: state.globals.activeConnection,
            activeFeature: connection ? connection.activeFeature : undefined,
            item: state.plugins[props.id]
        };
    },
    dispatch => ({
        connection: bindActionCreators(connectionActions, dispatch),
        plugin: bindActionCreators(pluginActions, dispatch),
        global: bindActionCreators(globalActions, dispatch)
    })
)
export default class Plugin extends React.PureComponent {
    static contextTypes = { session: React.PropTypes.object };
    onClick = event => this.props.plugin.toggleCollapse(this.props.id);
    onClose = event => {
        event.stopPropagation();
        let { item, activeFeature } = this.props;

        !!activeFeature && activeFeature === item.feature
            ? this.props.connection.setActiveFeature(this.props.activeConnection, undefined)
            : this.props.plugin.toggle(this.props.id);

        // If activeSelection is tied to `this` plugin we must reset it
        if (this.context.session.globals.activeSelection) {
            let selectionPlugin = this.context.session.elements[this.context.session.globals.activeSelection].plugin;
            if (selectionPlugin === this.props.id) this.props.global.setActiveSelection();
        }
    };
    render() {
        return this.props.item.enabled ? this.renderCollapse() : this.renderEmpty();
    }
    renderEmpty() {
        return <div />;
    }
    renderCollapse() {
        console.log('render Plugin');
        let { item, accordion, classes, activeFeature, activeConnection } = this.props;
        let { id, name, type, icon, closeable, collapsed, elements, feature, resources, enabled } = item;
        let session = this.context.session;
        let headerProps = {
            connection: this.props.connection,
            active: !!activeFeature && activeFeature === feature,
            onClose: this.onClose,
            activeConnection,
            session,
            name,
            type,
            closeable,
            classes,
            icon,
            id,
            feature
        };
        return (
            <Collapse
                style={{ ...this.props.style, marginBottom: '0.5em', pointerEvents: 'all' }}
                activeKey={!collapsed ? 'panel' : ''}
                onChange={this.onClick}>
                <Collapse.Panel key="panel" header={<Header {...headerProps} />}>
                    {elements
                        .sort((a, b) => session.elements[a].index > session.elements[b].index)
                        .map(key => <Element key={key} id={key} elementStyle={{ marginBottom: '0.25em' }} />)}
                </Collapse.Panel>
            </Collapse>
        );
    }
}
