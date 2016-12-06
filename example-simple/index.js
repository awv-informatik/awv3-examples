import THREE from 'three';
import { Canvas, View, Object3, easing } from 'awv3';

(async () => {

    // Create new canvas
    const canvas = new Canvas({ dom: '#main' });

    // Create a view, defaults into the same dom-node as the canvas
    const view = new View(canvas);

    // Parse meshes, collect materials, activate interaction
    const model = new Object3((await canvas.parser.stream('model.txt')).models).updateMaterials().createInteraction();

    // Add to scene
    view.scene.add(model);

    // Fade in
    model.animate({ materials: { all: [{ opacity: 0.8 }] } })
        .from({ materials: { all: [{ opacity: 0 }] } })
        .easing(easing.exponential.in)
        .start(500);

    // Move cam
    view.updateBounds().controls
        .focus({ easing: easing.bounce.out, duration: 2500 })
        .zoom({ level: view.bounds.sphere.radius, duration: 2000, easing: easing.exponential.out })
        .rotate({ angle: Math.PI / 3, duration: 6000, easing: easing.exponential.out }, Math.PI / 3)
        .fov({ level: 120, duration: 2000, easing: easing.cubic.out });

    // Create interaction by listeneing to lifecycle events
    model.on({

        // Hover In/Out
        [Object3.Lifecycle.Hovered]: (type, data) => {
            let hoverIn = type === Object3.Hovered.In;
            model.animateLines({ color: new THREE.Color( hoverIn ? 0xc23369 : 0 ) }).start(500);
            if (hoverIn) view.setCursor('grab');
        },

        // Drag Start/Pull/End
        [Object3.Lifecycle.Dragged]: (type, data) => {
            switch (type) {
                case Object3.Dragged.Start:
                    view.controls.enabled = false;
                    break;
                case Object3.Dragged.Pull:
                    model.position.copy(data.drag);
                    view.invalidate().setCursor('grabbing');
                    break;
                case Object3.Dragged.End:
                    view.controls.enabled = true;
                    view.setCursor('grab');
                    break;
            }
        }
    });

})();
