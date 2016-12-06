<style lang="stylus">

@import "~semantic-ui-css/components/reset.css"
@import "~semantic-ui-css/components/site.css"

html, body, main
    height: 100%

body
    background-color: #f5f5f5

main
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden

</style>

<template>

<main>

    <view v-ref:view></view>
    <plugins v-ref:plugins :view="$refs.view"></plugins>

</main>

</template>

<script>

import THREE from 'three';
import Defaults from 'awv3/core/defaults';
import Object3 from 'awv3/three/object3';
import Sketch from './plugs/sketch.js';
import Measure from './plugs/measure.js';
import view from './components/view.vue';
import plugins from './components/plugins.vue';
import Presentation from 'awv3/misc/presentation';

export default {

    data: () => ({}),
    components: { view, plugins },

    async ready() {

        // Register plugins
        this.$refs.plugins.use(
            new Sketch(),
            new Measure()
        );

        // Fetch view, set up vec
        let view = this.$refs.view.getView();
        view.camera.near = 10;
        view.camera.far = 2000;
        view.camera.updateProjectionMatrix();
        view.controls.minDistance = 100;
        view.controls.maxDistance = view.camera.far * 0.75;
        view.controls.up = new THREE.Vector3(0, 1, 0);

        // Feed models
        console.log("app:ready")
        let { models } = await view.canvas.parser.stream('/assets/model.txt');
        view.scene.add(new Presentation(models));
        view.controls.focus().zoom();

    }
}

</script>
