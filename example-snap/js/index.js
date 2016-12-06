import THREE from 'three';
import 'requestidlecallback';
import { Canvas, View } from 'awv3';
import DraggablePart from './draggablepart';

const canvas = new Canvas({ dom: '#main' });
const view = new View(canvas, { ambient: 0xffffff, ambientIntensity: 1.5 });
view.scene.setRotation(Math.PI / 2, Math.PI / 2, 0);

// Start once the browser has calmed down a bit
requestIdleCallback(async _ => {

    console.log(THREE)

    view.scene.add(new THREE.SpotLight(0xffffff, .05).setPosition(-2000, 0, 0));
    view.scene.add(new THREE.SpotLight(0xffffff, .05).setPosition(2000, 0, 0));
    view.scene.add(new THREE.SpotLight(0xffffff, .05).setPosition(0, 500, 2000));
    view.scene.add(new THREE.SpotLight(0xffffff, .05).setPosition(0, -500, -2000));

    let light = new THREE.SpotLight(0xa5a5a5, 1);
    light.position.set(500, 500, 500);
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 20, 1, 100, 5500 ) );
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    view.scene.add(light);


    //var spotLightHelper = new THREE.SpotLightHelper( light );
    //view.scene.add( spotLightHelper );

    view.scene.add(new DraggablePart('assets/GENERATOR02.txt'));
    view.scene.add(new DraggablePart('assets/CLGR-D0007.txt'));
    view.scene.add(new DraggablePart('assets/CLGR-HR0025.txt'));

    view.controls.rotate(-Math.PI / 3, Math.PI / 3);

});
