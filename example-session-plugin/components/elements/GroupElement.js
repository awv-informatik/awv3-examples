import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from 'antd';
import Group from 'awv3/session/elements/group';
import StoreElement from 'awv3/session/element';
import Element from './Element';

@connect((state, props) => ({ item: state.elements[props.id] }))
class Row extends React.PureComponent {
    render() {
        let { item, elementStyle = {} } = this.props;
        let { id, name, type, visible } = item;
        return (
            <div
                style={{
                    ...elementStyle,
                    marginBottom: item.margin ? elementStyle.marginBottom : 0,
                    display: visible ? 'flex' : 'none',
                    minHeight: 32
                }}>
                <div
                    style={{
                        flex: 1,
                        textTransform: 'capitalize',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        padding: '0em 1em 0em 1em',
                        lineHeight: '28px',
                        height: 28,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: 6,
                        marginTop: 2
                    }}>
                    {name}
                </div>
                <div style={{ flex: 3, display: 'flex', alignItems: 'center', overflow: 'hidden', marginLeft: 5 }}>
                    <Element id={id} />
                </div>
            </div>
        );
    }
}

const Accordion = ({ item, elementStyle = {} } = {}) => (
    <Collapse style={elementStyle} defaultActiveKey={!item.collapsed ? 'panel' : ''}>
        <Collapse.Panel header={item.name} key="panel">
            {item.children && item.children.map(item => <Element key={item} id={item} elementStyle={elementStyle} />)}
        </Collapse.Panel>
    </Collapse>
);

const Rows = ({ item, elementStyle = {} } = {}) => (
    <div
        style={{
            width: '100%',
            display: item.visible ? 'flex' : 'none',
            flexDirection: item.flexDirection || 'row',
            ...elementStyle
        }}>
        {item.children && item.children.map(item => <Element key={item} id={item} elementStyle={{ marginRight: 5 }} />)}
    </div>
);

const Fields = ({ item, elementStyle = {} } = {}) => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', ...elementStyle }}>
        {item.children && item.children.map(item => <Row key={item} id={item} elementStyle={elementStyle} />)}
    </div>
);

const Buttons = ({ item, style, session, elementStyle = {} } = {}) => {
    if (!item.children) return null;
    let { limit = item.children.length, children, margin, visible } = item;

    let rows = [];
    for (let count = 0; count < children.length / limit; count++) {
        let items = children
            .filter(item => session.elements[item].visible)
            .slice(count * limit, Math.min(count * limit + limit, children.length))
        rows.push(
            <Button.Group key={count}
                style={{
                    ...elementStyle,
                    marginBottom: margin ? elementStyle.marginBottom : 0
                }}>
                {items.map(item => <Element key={item} id={item} elementStyle={{ padding: 0 }} />)}
            </Button.Group>
        )
    }

    return (
        <div style={{ display: visible ? 'block' : 'none', flex: style.flex }}>
            {rows}
        </div>
    );
}

const Default = ({ item, elementStyle = {} } = {}) => (
    <div>
        {item.children && item.children.map(item => <Element key={item} id={item} elementStyle={elementStyle} />)}
    </div>
);

@connect((state, props) => ({ item: state.elements[props.id] }))
export default class GroupElement extends React.Component {
    static contextTypes = { session: React.PropTypes.object };
    render() {
        let { elements } = this.context.session;
        let { children, visible, format } = this.props.item;

        let Component = Default;
        switch (format) {
            case Group.Format.Buttons:
                Component = Buttons;
                break;
            case Group.Format.Table:
                Component = Fields;
                break;
            case Group.Format.Rows:
                Component = Rows;
                break;
            case Group.Format.Collapse:
                Component = Accordion;
                break;
        }

        return <Component {...this.props} session={this.context.session} />;
    }
}
