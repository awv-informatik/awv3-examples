import * as THREE from 'three';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Session from 'awv3/session';
import { actions as globalActions } from 'awv3/session/store/globals';
import pool from 'awv3/misc/presentation';
import App from './views/App';

let path = "resources/textures/viewcube/";
let paths = ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map((item, index) => path + item + ".jpg");
let env = new THREE.CubeTextureLoader().load( paths );

// Create session
const session = window.session = new Session({
    materials: { lazy: true, multi: false, edgeColor: new THREE.Color(0), envMap: env, edgeOpacity: 0.5, shadows: false },
    pool,
    async defaultConnection(connection) {
        let tree = await fetch('models/lastExport.json');
        let asm = await tree.json();
        asm.root = 3;
        connection.init(asm);
        connection.pool.view.controls.focus().zoom().rotate(Math.PI / 3, Math.PI / 3);

        let toLoads = Object.keys(asm)
            .map(k => asm[k])
            .filter(o => o.solids)
            .map(o => {
                let a = o.max[0] - o.min[0];
                let b = o.max[1] - o.min[1];
                let c = o.max[2] - o.min[2];
                return {
                    size: Math.sqrt(a * a + b * b + c * c),
                    file: o.name
                };
            })
            .sort((a, b) => b.size - a.size)
            .reduce((a, b) => a.concat(b.file), []);

        toLoads.forEach(async file => {
            //await delay(2000); //todo: remove
            let primitives = await connection.stream(`models/${file}.json`);
            console.log('primitives loaded...');
        });
    }
});



// This should be abstracted into session somehow
Promise.all([System.import('awv3/plugins/shader/')])
    .then(imports => imports.map(({ default: Plugin }) => new Plugin(session).id))
    .then(imports => session.dispatch(globalActions.linkPlugins(imports)));

const load = Component => {
    render(
        <AppContainer>
            <Provider store={session.store}>
                <Component session={session} />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

load(App);
process.env.NODE_ENV !== 'production' && module.hot && module.hot.accept('./views/App', () => load(App));
