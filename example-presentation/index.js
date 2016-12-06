import THREE from 'three';
import Canvas from 'awv3/core/canvas';
import View from 'awv3/core/view';
import Parser from 'awv3/core/parser';
import easing from 'awv3/animation/easing';
import Orbit from 'awv3/controls/orbit';
import Object3 from 'awv3/three/object3';
import Raycaster from 'awv3/three/raycaster';
import Perspective from 'awv3/three/perspective';
import Presentation from 'awv3/misc/presentation';
import { url } from 'awv3/core/helpers';

// Environmentmap
const reflectionCube = new THREE.CubeTextureLoader()
    .setPath( 'generated/textures/cube/SwedishRoyalCastle/')
    .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
reflectionCube.format = THREE.RGBFormat;

// Canvas, view and container
const canvas = new Canvas({ dom: '#main' });
const view = new View(canvas, { ambientIntensity: 1 });
view.camera.near = 10;
view.camera.far = 2000;
view.camera.updateProjectionMatrix();
view.controls.minDistance = 100;
view.controls.maxDistance = view.camera.far * 0.75;
view.showStats = true;

const container = new Object3().setRotation(Math.PI / 2, 0, 0);
view.scene.add(container);

// Parse {Cutter, Olympus, Suspension}
canvas.parser.stream(`generated/${url('file') || 'cutter'}.txt`).then(context => {

    // Present model
    let object = new Presentation(context.models, { edges: 0.2, ambient: 1 }, (props, values) => {
        if (props.radius < 7) {
            // Objects smaller than 7 are bright
            values.color = new THREE.Color('#d0d0d0');
        } else if (props.radius > 7 && props.radius < 10) {
            // Objects between 7 and 10 are golden with light emissive tones
            values.color = new THREE.Color('#c5b358');
            values.emissive = new THREE.Color('#695e24');
        } else if (props.radius > 40) {
            // Large objects are very dark
            values.color = new THREE.Color('#272727');
        }

        // Bright objects should be metal-like, dark objects matte
        let metal = ((values.color.r > 0.5 && values.color.g > 0.5 && values.color.b > 0.5) ||
            (values.color.r + values.color.g + values.color.b > 1.5));

        // Distribute new values to physical shader
        values.metalness = metal ? 0.9 : 0.8;
        values.roughness = metal ? 0.4 : 0.8;
        values.clearCoat = metal ? 0.5 : 1.0;
        values.clearCoatRoughness = metal ? 0.4 : 0.5;

        // Add environment map as well
        values.envMap = reflectionCube;

        // Export values back to caller
        return values;
    });

    object.getModels().createInteraction({ recursive: true, approach: Raycaster.Approach.First }).on({
        [Object3.Lifecycle.Hovered](data) {
            view.setCursor('pointer');
            if(!data.object.color)
                data.object.color = data.object.material.color.clone();
            data.object.animate({ material: { color: new THREE.Color('#c23369') }}).start(0);
        },
        [Object3.Lifecycle.Unhovered](data) {
            data.object.animate({ material: { color: data.object.color }}).start(1000);
        }
    });

    container.add(object);
    view.controls.focus().zoom().rotate(Math.PI / 3, Math.PI / 3).now();

});
