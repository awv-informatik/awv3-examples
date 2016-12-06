import THREE from 'three';
import { Canvas, View, Object3, easing } from 'awv3';

(async () => {

    // Create new canvas
    const canvas = new Canvas({ dom: '#main', place: 'last' });

    // Create a view, defaults into the same dom-node as the canvas
    const view1 = new View(canvas, { dom: '.view1' });
    const view2 = new View(canvas, { dom: '.view2' });

    // Parse meshes, collect materials, activate interaction
    let { models } = await canvas.parser.stream('model.txt');
    let model = new Object3(models).centerGeometry();

    // Add to scene
    view1.scene.add(model);
    view1.controls.focus().zoom().rotate(0, Math.PI / 2);

    view2.scene.add(model.clone());
    view2.controls.focus().zoom().rotate(0, Math.PI / 2);

})();
