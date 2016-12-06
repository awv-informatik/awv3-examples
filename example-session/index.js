import * as THREE from 'three';
import { Canvas, View, Object3, Presentation, easing, Tween } from 'awv3';
import Session from 'awv3/session';

const canvas = new Canvas({ dom: '#main' });
const view = new View(canvas, {
    up: new THREE.Vector3(0, 1, 0),
    near: 10,
    far: 2000,
    minDistance: 100,
    maxDistance: 1500,
    ambientIntensity: 1.2
});

const session = window.session = new Session({
    material: 'multi',
    updateMaterials: false,
    pool: Presentation
});

view.scene.add(session.pool);
session.stream('/model.txt');
