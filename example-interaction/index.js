import 'requestidlecallback';
import THREE from 'three';
import { Canvas, View, Object3, Orbit, MeshPhongMaterial, Events } from 'awv3';
import DraggableCube from './draggablecube';

// Create new canvas
const canvas = new Canvas({ dom: '#main' });

// Create a view, defaults into the same dom as the canvas
const view = new View(canvas, { ambient: 0x909090 });
view.showStats = true;
view.controls.zoomMode = Orbit.ZoomMode.Mouse;

// Start once the browser has calmed down a bit
requestIdleCallback(async() => {

    let light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 1200, 2500 ) );
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    view.scene.add(light);

    for (var i = 0; i < 100; i++) {
        let cube = new DraggableCube();
        view.scene.add(cube);
    }

    view.updateBounds().controls.rotate(Math.PI / 3, Math.PI / 3).focus(view.bounds.sphere.center).zoom(view.bounds.sphere.radius * 2);

});
