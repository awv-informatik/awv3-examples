<style lang="stylus" scoped>

.main
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
    user-select: none

</style>

<template>

<div class="main"></div>

</template>

<script>

import THREE from 'three';
import { Canvas, View } from 'awv3/core';
import Object3 from 'awv3/three/object3';

let currentView = undefined;

export default {
    data: () => ({}),
    beforeDestroy() {
        canvas.destroy();
    },
    ready() {
        let canvas = new Canvas({ dom: this.$el });
        currentView = new View(canvas);
        this.$nextTick(() => canvas.renderer.resize());
    },

    methods: {
        getView() {
            return currentView;
        }
    }
}

</script>
