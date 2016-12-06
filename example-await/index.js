import THREE from 'three';
import 'requestidlecallback';
import { Canvas, View, Object3 } from 'awv3';
import AnimatedObject from './animatedobject';

// Create new canvas
const canvas = new Canvas({ dom: '#main' });

// Create a view, defaults into the same dom as the canvas
const view = new View(canvas, { ambient: 0x909090 });
view.ambient.intensity = 10.0;
view.ambient.color = new THREE.Color('#fff');

// Start when the browser has calmed down a bit
requestIdleCallback(async () => {

    // Run a couple of urls, load them at the same time
    let count = 0;
    let models = await Promise.all([..."awv3"].map(async file => {
        // Create model, then load & compress url mesh data lazy, group it
        let model = new AnimatedObject();
        await canvas.parser.stream(`assets/model-${file}.txt`, { groupInto: model, compressMaterials: true, lazy: true });
        return model;
    }));

    // Process the loaded models
    for (var model of models) {

        // Add model to scene
        await view.scene.addAsync(model);

        // Trigger custom lifecycle event on the model (will add it to the view and fade in)
        await model.show();

        // If it's not the last one, remove it. This will call the objects 'Destroyed' lifecycle event
        if (++count < models.length) await model.destroyAsync();
    }

    // Custom method, prep model for interaction
    model.yoyo();

});
