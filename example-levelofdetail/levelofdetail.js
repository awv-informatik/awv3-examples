import THREE from 'three';
import { Object3, MeshPhongMaterial, Parser, lastCreated } from 'awv3';

export default class LevelOfDetail extends THREE.Object3D {
    constructor() {
        super();

        this.parser = lastCreated ? lastCreated.parser : new Parser();

        this.viewFound().then(view => {
            this.createInteraction().on(Object3.Lifecycle.Updated, context => {
                for (let child of this.children)
                    child.update(view.camera);
            });
        });
    }

    async load(levels) {
        return new Promise(async resolve => {
            let map = new Map();
            let level = 0;
            for (let url of levels) {
                let { models } = await this.parser.stream(url, ({type, data}) => {
                    if (type === Parser.Factory.Mesh) {

                        data.material.color = new THREE.Color('#454545');
                        data.material.opacity = 1;
                        data.material.uniforms.crosslight.value = 1.3;
                        data.material.uniforms.contrast.value = 0.6;
                        data.material.uniforms.flatspot.value = 0.4;
                        data.castShadow = true;
                        data.receiveShadow = true;
                    } else if (type == Parser.Factory.Line)
                        data.material.color = new THREE.Color('#373737');
                });
                let radius = models.reduce((bounds, item) =>
                    bounds.union(item.children[0].geometry.boundingBox), new THREE.Box3()).getBoundingSphere().radius;

                for (let model of models) {

                    let wrap = new Object3(model).centerGeometry().updateMaterials();
                    let modelRadius = model.getRadius() / radius;

                    if (modelRadius < 0.2) {
                        wrap.materials.meshes[0].color = new THREE.Color(0xc23369);
                    }

                    if (!map.has(model.userData.id)) {
                        let lod = new THREE.LOD();
                        lod.position.copy(wrap.position);
                        map.set(model.userData.id, lod);
                        this.add(lod);
                    }

                    let lod = map.get(model.userData.id);
                    if (level == levels.length - 1 /*&& percentage < 0.25*/) {

                        let box = new THREE.BoundingBoxHelper(model);
                        box.material = new MeshPhongMaterial({
                            color: wrap.materials.meshes[0].color,
                            opacity: 1,
                            specular: wrap.materials.meshes[0].specular,
                            emissive: new THREE.Color(0),
                            shininess: 100
                        });
                        box.material.uniforms.crosslight.value = 1.3;
                        box.material.uniforms.contrast.value = 0.6;
                        box.castShadow = true;
                        box.receiveShadow = true;
                        box.update();

                        /*let wireframe = new THREE.BoxHelper();
                        wireframe.update(box.box);
                        wireframe.box = box.box;
                        wireframe.material.color = new THREE.Color(0x373737);*/

                        let factor = (radius * 2 * levels.length) + (radius * 10 * levels.length) * modelRadius;
                        let preview = new Object3([box/*, wireframe*/]);
                        lod.addLevel(preview, factor);
                    }

                    let factor = (radius * 2 * (levels.length - 1 - level)) + (radius * 10 * (levels.length - 1 - level)) * modelRadius;
                    lod.addLevel(model, factor);
                }

                level++;
            }

            resolve(this);

        });
    }

    wait() {
        return this.promise;
    }

    clone(recursive) {
        return new this.constructor().copy( this, recursive );
    }
}
