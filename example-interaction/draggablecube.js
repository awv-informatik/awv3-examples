import THREE from 'three';
import { Object3, easing, MeshPhongMaterial, Raycaster } from 'awv3';

export default class extends THREE.Mesh {

    constructor() {
        super();

        this.geometry = new THREE.BoxGeometry( 40, 40, 40 );
        this.material =  new MeshPhongMaterial({ color: Math.random() * 0xffffff, opacity: 0.9, transparent: true});

        this.castShadow = true;
		this.receiveShadow = true;
        this.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 500);
		this.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
        this.originalScale = new THREE.Vector3(Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1);
		this.scale.copy(this.originalScale);
        this.updateBounds();

        // Create CSS overlay, append whenever ready ...
        this.node = document.createElement('div');
        this.node.setAttribute('style',
            'position: absolute; display: inline-block; top: 0; left: 0; color: black; font-size: 12px; pointer-events:none;');
        this.node.innerHTML = this.id;
        this.viewFound().then(view => this.view.dom.appendChild(this.node));

        // Enable interaction, listen to lifecycle events, update overlay
        this.createInteraction({ first: false, approach: Raycaster.Approach.First }).on({

            // Object hovered
            [Object3.Events.Interaction.Hovered]: data => {
                this.view.setCursor('grab');
                this.animate({ material: { emissive: new THREE.Color('#373737') } }).start(0);
            },

            // Object unhovered
            [Object3.Events.Interaction.Unhovered]: data => {
                this.animate({ material: { emissive: new THREE.Color('black') } }).start(500);
            },

            // Object picked up
            [Object3.Events.Interaction.Picked]: data => {
                this.view.controls.enabled = false;
                this.animate({ scale: this.originalScale.clone().multiplyScalar(1.5) }).easing(easing.exponential.out).start(200);
            },

            // Object dropped
            [Object3.Events.Interaction.Dropped]: data => {
                this.view.controls.enabled = true;
                this.view.setCursor('grab');
                this.animate({ scale: this.originalScale }).easing(easing.bounce.out).start(1000);
            },

            // Object dragged
            [Object3.Events.Interaction.Dragged]: data => {
                this.position.copy(data.drag);
                this.view.setCursor('grabbing');
            },

            // Object clicked
            [Object3.Events.Interaction.Clicked]: async data => {
                console.log("---click", this.id)
                await this.animate({ rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI) }).easing(easing.bounce.out).start(1000).wait();
                this.destroyAsync();
            },

            // Object destroyed
            [Object3.Events.Lifecycle.Destroyed]: async data => {
                console.log("---destroyed", this.id)
                this.view.dom.removeChild(this.node)
                await this.animate({
                    material: { opacity: 0 },
                    scale: new THREE.Vector3(0.1, 0.1, 0.1)
                }).easing(easing.exponential.out).start(1000).wait();
            },

            // Object rendered
            [Object3.Events.Lifecycle.Rendered]: () => {
                let coordinates = this.view.getPoint2(this.position.clone());
                if (!!!this.oldCoords || coordinates.x != this.oldCoords.x || coordinates.y != this.oldCoords.y) {
                    this.oldCoords = coordinates;
                    this.node.style.transform = `translate3d(calc(-50% + ${coordinates.x}px), calc(-50% + ${coordinates.y}px), 0)`;
                }
            }
        });

    }
}
