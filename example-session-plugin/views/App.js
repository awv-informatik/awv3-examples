import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Menu, Button, Icon } from 'antd';
import Canvas from '../components/Canvas';
import View from '../components/View';
import Csys from './Csys';
import Controls from './Controls';
import GlobalPlugins from './GlobalPlugins';

export default class App extends React.PureComponent {
    static childContextTypes = { session: React.PropTypes.object };
    getChildContext() {
        return { session: this.props.session };
    }
    componentDidMount() {
        // Get view and add the sessions pool into its scene
        this.view = this.refs.view.getInterface();
        this.view.scene.add(this.props.session.pool);
    }
    onDoubleClick = event => this.view.updateBounds().controls.focus().zoom();

    render() {
        return (
            <main>
                <Canvas
                    style={{ backgroundColor: '#d6e5ef', position: 'absolute', top: 0, left: 0 }}
                    resolution={1}
                    onDoubleClick={this.onDoubleClick}>
                    <View ref="view" up={[0, 1, 0]} />
                </Canvas>
                <Csys style={{ position: 'absolute', bottom: 0, left: 14, width: 90, height: 90 }} />
                <Controls />
                <GlobalPlugins />
            </main>
        );
    }
}
