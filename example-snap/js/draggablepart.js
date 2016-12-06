import THREE from 'three';
import { lastCreated, Object3, Parser, easing } from 'awv3';
import Csys from './csys';

export default class extends THREE.Object3D {

    constructor(url, canvas = lastCreated) {
      super();

      // Stream part
      canvas.parser.stream(url, {

        groupInto: this,
        compressMaterials: true,
        callback: ({type, data, model}) => {
          if (type === Parser.Factory.Csys)
              model.add(new Csys(data))
          else if (type === Parser.Factory.Mesh) {
            data.material.uniforms.crosslight.value = 1.0;
            data.material.uniforms.contrast.value = 0.0;
            data.material.uniforms.flatspot.value = 0.4;
            data.castShadow = true;
            data.receiveShadow = true;
          }
        }

      }).then(_ => {

        this.csw = this.getObjectByMatch('CSW');
        this.mcs = this.getObjectByMatch('MCS');

        // Center part around the MCS coordinate system
        if (this.mcs) this.centerGeometry(this.mcs.children[0].origin);

        // Once it has been added to a scene/view fade in and focus
        this.updateMaterials().updateBounds().viewFound().then(_ => {
          this.animateMeshes({opacity: 0.8}).start(1000);
          this.animateLines({color: new THREE.Color(0x373737)}).start(1000);
          this.view.controls.focus().zoom();
        });

        // Define interaction
        this.createInteraction().on({

          // When hovered
          [Object3.Lifecycle.Hovered]: (type, data) => {
            let hoverIn = type === Object3.Hovered.In;
            if (hoverIn) this.view.setCursor('grab');

            this.animateLines({color: new THREE.Color(hoverIn ? 0xc23369 : 0x373737)}).start(0);
          },

          // ... dragged
          [Object3.Lifecycle.Dragged]: (type, data) => {
            switch (type) {
              case Object3.Dragged.Start:

                //this.view.controls.rotate(Math.PI / 3, Math.PI / 3)

                this.docked && this.docked.undock(this);
                this.view.controls.enabled = false;
                this.canvas.events.emit('Dragged', this, type);
                break;

              case Object3.Dragged.Pull:
                !!!this.docked && this.position.copy(this.parent.worldToLocal(data.drag));
                this.view.invalidate();
                this.view.setCursor('grabbing');
                break;

              case Object3.Dragged.End:
                this.view.controls.enabled = true;
                this.view.setCursor('grab');
                this.canvas.events.emit('Dragged', this, type);
                break;
            }
          }
        });
      });
    }

    pop() {
      /*this.animate({ scale: new THREE.Vector3(1, 1, 1) })
          .from({ scale: new THREE.Vector3(1.5, 1.5, 1) })
          .easing(easing.elastic.out)
          .start(1000);*/
    }
}
