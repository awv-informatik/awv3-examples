import THREE from 'three';
import { Canvas, View, Object3, Parser, Orbit } from 'awv3';
import LevelOfDetail from './levelofdetail';

const canvas = new Canvas({ dom: '#main', ambientIntensity: 1.5 });
const view = new View(canvas);
view.interaction.enabled = false;
view.controls.zoomMode = Orbit.ZoomMode.Mouse;

view.scene.add(new THREE.SpotLight(0xffffff, .02).setPosition(-2000, 0, 0));
view.scene.add(new THREE.SpotLight(0xffffff, .02).setPosition(2000, 0, 0));
view.scene.add(new THREE.SpotLight(0xffffff, .02).setPosition(0, 500, 2000));
view.scene.add(new THREE.SpotLight(0xffffff, .02).setPosition(0, -500, -2000));

let light = new THREE.SpotLight(0xa5a5a5, 1);
light.position.set(-2000, 2000, 2000);
light.target.position.set( 0, 0, 0 );
light.castShadow = true;
light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 1200, 5500 ) );
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
view.scene.add(light);

const promise = new LevelOfDetail().load(['model.txt']);
const button = document.querySelector('#start');
button.classList.toggle('show');
button.addEventListener('click', async () => {
    button.parentNode.removeChild(button);
    let lod = await promise;
    view.scene.add(lod.setRotation(Math.PI / 2, 0, 0));
    view.controls.rotate(Math.PI * 1.3, Math.PI / 2.5).focus(lod.getCenter()).zoom(lod.getRadius() * 2.75).now();
});
