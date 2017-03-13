import React from 'react';
import { connect } from 'react-redux';
import Plugin from './Plugin';

@connect(state => ({ globalPlugins: state.globals.plugins }))
export default class GlobalPlugins extends React.PureComponent {
    render() {
        let { globalPlugins } = this.props;
        return (
            <div style={{ position: 'absolute', top: 60, right: 15, width: 400 }}>
                {globalPlugins.map(id => <Plugin key={id} id={id} />)}
            </div>
        );
    }
}
