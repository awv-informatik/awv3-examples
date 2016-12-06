import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/es6/promise';

import Vue from 'vue';
import App from './app.vue';

Vue.config.warnExpressionErrors = false;
Vue.config.debug = false;

new Vue({ el: 'body', components: { App } });
