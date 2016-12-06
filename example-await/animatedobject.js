import THREE from 'three';
import { Object3, Tween, easing } from 'awv3';

export default class AnimatedObject extends Object3 {
    constructor() {
        super();

        this.on({

            // Before children get added: blend them out
            // .setValues is a shortcut for .animate(...).start(0)
            [Object3.Lifecycle.ChildAdded]: event => {
                event.child.updateMaterials().setValues({ materials: { all: [ { opacity: 0.0 } ] } })
            },

            // After the model is done loading: center, collect materials, rotate
            [Object3.Lifecycle.Loaded]: () => this.centerGeometry().updateMaterials().setRotation(Math.PI, 0, -Math.PI / 2),

            // Before being destroyed: Flatten & fade out
            [Object3.Lifecycle.Destroyed]: async () => {
                await this.animate({
                    materials: { all: [ { opacity: 0.0 } ] },
                    scale: new THREE.Vector3(1, 0.1, 1)
                }).easing(easing.exponential.out).start(1000).wait();
            }

        });
    }

    async show() {

        // Focus
        this.updateBounds().view.controls.rotate(Math.PI / 3, Math.PI / 3).focus(this.bounds.sphere.center)
            .zoom(this.bounds.sphere.radius * 8).now();

        // Fade in and pop at the same time, but await both
        await Promise.all([
            // Pop/Bounce
            this.animate({
                scale: new THREE.Vector3(1, 2, 1),
            }).from({
                scale: new THREE.Vector3(0.1, 0.1, 0.1)
            }).easing(easing.elastic.out).start(1000).wait(),

            // Fade-in
            this.animate({
                materials: { meshes: [ { opacity: 0.7 } ], lines: [ { opacity: 0.5 } ] }
            }).start(500).wait()
        ]);

    }

    yoyo() {

        this.animate({
            scale: new THREE.Vector3(3, 5, 3),
        }).easing(easing.elastic.out).onUpdate((value, time) => {
            this.rotation.z += 0.01;
        }).repeat(Infinity, Tween.Repeat.Yoyo).start(1500).pause().toggle();

    }
}
