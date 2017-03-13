import React from 'react';
import { connect } from 'react-redux';
import Plugin, { PluginBareBones } from '../../views/Plugin';

@connect((state, props) => ({ item: state.elements[props.id] }))
export default class Link extends React.PureComponent {
    render() {
        let { item } = this.props;
        let { value, parent, collapsable } = item;
        return collapsable
            ? <Plugin id={value} />
            : <PluginBareBones id={value} />;
    }
}
