import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tag, Icon } from 'antd';
import { actions as elementActions } from 'awv3/session/store/elements';
import { actions as globalActions } from 'awv3/session/store/globals';

@connect(
    (state, props) => ({
        activeSelection: state.globals.activeSelection,
        item: state.elements[props.id]
    }),
    dispatch => ({
        element: bindActionCreators(elementActions, dispatch),
        global: bindActionCreators(globalActions, dispatch)
    })
)
export default class SelectionElement extends React.PureComponent {
    stopPropagation = event => event.stopPropagation();
    onClick = item => this.props.element.removeChild(this.props.id, item);
    handleChange = event => {
        this.props.global.setActiveSelection(this.props.activeSelection !== this.props.id ? this.props.id : undefined);
    };
    render() {
        let { item, activeSelection, id } = this.props;
        let children = item.children || [];
        let active = activeSelection === id;

        let activeStyle = {};
        if (active) {
            activeStyle = {
                ...activeStyle,
                border: '1px solid #57c5f7',
                outline: 0,
                boxShadow: '0 0 0 2px rgba(45, 183, 245, 0.2)'
            };
        }

        return (
            <div
                onClick={this.handleChange}
                style={{
                    ...this.props.style,
                    cursor: 'pointer',
                    border: '1px solid #d9d9d9',
                    borderRadius: 6,
                    padding: '4px 8px 4px 8px',
                    backgroundColor: 'white',
                    ...activeStyle
                }}
                className="ant-pick">
                {!active && children.length === 0 && <span style={{ color: '#666' }}>Click here to select</span>}
                {active && children.length === 0 && <span style={{ color: '#666' }}>Select items in the view</span>}
                <div>
                    {children.map(item => (
                        <Tag
                            style={{ margin: 1 }}
                            closable={true}
                            color="#2db7f5"
                            key={item}
                            onClick={this.stopPropagation}
                            onClose={event => this.onClick(item)}>
                            {item}
                        </Tag>
                    ))}
                </div>
            </div>
        );
    }
}
