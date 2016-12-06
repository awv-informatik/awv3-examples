import THREE from 'three';
import { Object3, easing, MeshPhongMaterial } from 'awv3';

export default class extends THREE.Object3D {

    constructor(data) {

        super();
        this.origin = new THREE.Vector3(...data.origin);
        this.xAxis = new THREE.Vector3(...data.xAxis).normalize();
        this.yAxis = new THREE.Vector3(...data.yAxis).normalize();
        this.zAxis = new THREE.Vector3(...data.zAxis).normalize();
        this.matrix = new THREE.Matrix4().set(
            this.xAxis.x, this.yAxis.x, this.zAxis.x, 0,
            this.xAxis.y, this.yAxis.y, this.zAxis.y, 0,
            this.xAxis.z, this.yAxis.z, this.zAxis.z, 0,
            this.origin.x, this.origin.y, this.origin.z, 1 );
        this.matrixRotation = new THREE.Euler().setFromRotationMatrix(this.matrix);
        //this.updateParentMaterials = false;

        if (data.designator !== 'CSW') return;

        this.viewFound().then( _ => {

            this.rootParent = this.root();
            this.canvas.events.on("Dragged", (parent, type) => {
                let start = type === Object3.Dragged.Start;
                if (!!!this.docked && parent != this.rootParent) {
                    let start = type === Object3.Dragged.Start;
                    this.plane.animate({ scale: new THREE.Vector3(...Array(3).fill(start ? 1 : .01)) })
                        .easing(easing.cubic.out).start(100);
                }
                this.rootParent.animateMeshes({ opacity: start ? 0.6 : 0.8 }).start(500);
            });

            this.plane = new THREE.Mesh();
            this.add(this.plane);
            let size = 70;
            this.plane.geometry = new THREE.PlaneGeometry( size, size, 32 );
            this.plane.material = new THREE.MeshBasicMaterial({ transparent: true, opacity: .5, color: 0x28d79f, side: THREE.DoubleSide });
            this.plane.position.copy(this.origin);
            this.plane.scale.set(.01, .01, .01);

            addLine(this.plane, this.xAxis, 5 * 3);
            addLine(this.plane, this.yAxis, 5 * 3);
            addLine(this.plane, this.zAxis, 5 * 3);

            const line = new THREE.Geometry();
            line.vertices.push(new THREE.Vector3(-size / 2, -size / 2, 0));
            line.vertices.push(new THREE.Vector3(size / 2, -size / 2, 0));
            line.vertices.push(new THREE.Vector3(size / 2, size / 2, 0));
            line.vertices.push(new THREE.Vector3(-size / 2, size / 2, 0));
            line.vertices.push(new THREE.Vector3(-size / 2, -size / 2, 0));
            line.computeLineDistances();
            const mesh = new THREE.Line(line, new THREE.LineDashedMaterial({ color: 0x000000, transparent: true, opacity: 1 }));
            this.plane.add(mesh);

            this.plane.createInteraction({ priority: 1000, recursive: false });
            this.plane.on({

                // When hovered
                [Object3.Lifecycle.Hovered]: (type, data) => {

                    let hoverIn = type === Object3.Hovered.In;
                    hoverIn && this.view.setCursor('grab');

                    let action = this.view.interaction.getActionTarget();
                    if (action && action.receiver !== this.rootParent) {
                        if (hoverIn && !!!this.docked && !!!action.receiver.docked)
                            this.dock(action.receiver);
                        else if(!hoverIn && this.docked && action.receiver.docked)
                            this.undock(action.receiver);
                    }

                },

                [Object3.Lifecycle.MouseUp]: _ => {
                    this.plane.animate({ scale: new THREE.Vector3(...Array(3).fill( .01 )) }).start(500);
                    if (this.docked) {
                        // ...
                    }
                }

            });
        });

    }

    dock(child) {
        child.docked = this;
        this.docked = child;

        child.oldParent = child.parent;
        child.oldRotation = child.rotation.clone();
        this.rootParent.add(child);

        // Set position + rotation
        child.position.copy(this.origin.clone());
        var mcs = child.getObjectByMatch('MCS').children[0].matrixRotation.clone();
        var csw = this.matrixRotation.clone();
        child.rotation.set(mcs.x + csw.x, mcs.y + csw.y, mcs.z + csw.z);

        child.pop();
        this.pop();
    }

    undock(child) {
        child.oldParent.add(child);
        child.position.copy(child.parent.worldToLocal(this.parent.localToWorld(this.origin.clone())));
        child.rotation.copy(child.oldRotation);
        child.docked = undefined;
        this.docked = undefined;
        child.pop();
    }

    pop() {
        this.plane.animate({ scale: new THREE.Vector3(...Array(3).fill(1)), material: { color: new THREE.Color(0x28d79f) } })
            .from({ scale: new THREE.Vector3(...Array(3).fill(1.25)), material: { color: new THREE.Color(0xffffff) } })
            .start(1000);
    }
}

function addLine(target, axis, length) {
    const line = new THREE.Geometry();
    line.vertices.push(new THREE.Vector3(0, 0, 0));
    line.vertices.push(new THREE.Vector3(0, 0, 0).add(axis.clone().multiplyScalar(length)));
    const mesh = new THREE.Line(line, new THREE.LineBasicMaterial({ color: new THREE.Color(0), transparent: false, opacity: 1 }));
    target.add(mesh);
}
