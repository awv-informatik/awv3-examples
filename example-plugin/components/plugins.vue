<style lang="stylus">

@import "~semantic-ui-css/components/transition.css"
@import "~semantic-ui-css/components/icon.css"
@import "~semantic-ui-css/components/item.css"
@import "~semantic-ui-css/components/input.css"
@import "~semantic-ui-css/components/label.css"
@import "~semantic-ui-css/components/image.css"
@import "~semantic-ui-css/components/button.css"
@import "~semantic-ui-css/components/dropdown.css"
@import "~semantic-ui-css/components/segment.css"
@import "~semantic-ui-css/components/table.css"
@import "~semantic-ui-css/components/checkbox.css"
@import "~semantic-ui-css/components/popup.css"
@import "~semantic-ui-css/components/menu.css"

.text.white
  color: #FFFFFF

.text.grey
  color: #CCCCCC

.text.black
  color: #1B1C1D

.text.yellow
  color: #F2C61F

.text.teal
  color: #00B5AD

.text.red
  color: #D95C5C

.text.purple
  color: #564F8A

.text.pink
  color: #D9499A

.text.orange
  color: #E07B53

.text.green
  color: #5BBD72

.text.blue
  color: #3B83C0

[data-tooltip]:hover:after
    z-index: 100

[data-tooltip]:hover:before
    z-index: 200

div.main > .ui.icon.buttons
    position: absolute
    top: 0
    right: 0
    margin: 25px

.ui.modal
    transform: translateY(-50%)
    display: block

div.main
    opacity: 0.8

div.main .ui.segment
    position: absolute
    top: 0
    left: 0
    margin: 25px
    width: 30em

.ui.segment.lean
    padding: 0!important
    border: 0!important

.ui.menu.lean
    padding: 0!important
    margin: 0!important
    border: 0!important

.ui.label > .icon.lean
    margin: 0!important

.ui.segment.lean.attached .ui.label, .ui.segment.lean.attached input
    border-radius: 0!important

/*.ui.table tbody
    max-height: 1000px
    overflow: hidden
    display: block
    transition: max-height .5s*/

.ui.table tr > td:first-child
    border-left: 3px solid #9b9b9b!important

.ui.table tr > td:first-child.fulfilled
    border-left: 3px solid #21ba45!important

.ui.table tr.console
    background: #e0e1e2 !important
    color: #573A08 !important
    box-shadow: 0px 0px 0px #e0e1e2 inset

.ui.table tr.console.results
    background: #e0e1e2 !important
    color: #573A08 !important
    box-shadow: 0px 0px 0px #e0e1e2 inset

.ui.table tr.console td
    padding: 0.92857143em!important

.ui.label.error
    position: absolute
    display: inline-table
    top: 50%
    transform: translate3d(0, -50%, 0)
    left: 100%
    max-width: 200px
    max-height: 100%

.ui.table thead th
    position: relative
    background-color: #d7d8da
    color: initial

.ui.table thead th button
    background-color: transparent

.relative
    position: relative

.ui.very.compact.table .ui.ribbon.label
    left: calc( -1rem - 0.7em )

.ui.table tr
    height: 3.55em

tr.selection
    cursor: pointer

tr.selection.interaction
    background-color: #2185d0!important
    color: white!important

.ui.table tr.values > td:first-child
    width: 10em
    white-space: nowrap

div.ui.labels.model
    position: absolute
    bottom: 25px
    right: 25px

</style>

<template>

<div class="main">

    <div class="ui icon buttons" :class="[size]">
        <button class="ui button" v-for="plugin in model.plugins" :class="{ blue: plugin.enabled }" @click="model.toggle(plugin)"
            data-tooltip="{{ plugin.name }}" data-position="bottom right">
            <i :class="[plugin.icon, 'icon']"></i>
        </button>
    </div>

    <template v-if="model.active">
        <div class="ui blue model labels" :class="[size]">
            <div class="ui label" v-for="label in model.active.labels">
                <i v-if="label.icon" :class="[label.icon, 'icon']"></i>
                {{ label.name }} {{ label.value }}
                <i class="delete icon" @click="label.onReject({ element: label })"></i>
            </div>
        </div>
    </template>

    <div v-if="model.active" class="ui raised lean segment" :class="[size]">

        <table class="ui very compact celled table">
            <thead>
                <tr>
                    <th colspan="2">
                        <a class="ui blue ribbon label" :class="[size]">{{ model.active.name }}</a> {{ model.active.title }}
                        <div class="ui attached buttons" :class="[size]" style="right: 0; top: 0; height: 100%; position: absolute;">
                            <button class="ui icon button" @click="model.active.collapsed = !model.active.collapsed"><i class="chevron down icon"></i></button>
                            <button class="ui icon button" @click="model.disable(model.active)"><i class="cancel icon"></i></button>
                            <button class="ui disabled icon button"><i class="green checkmark icon"></i></button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody v-show="!model.active.collapsed">

                <tr v-if="model.active.toolbar.length > 0">
                    <td colspan="2" style="border-left: initial!important; background-color: #e0e1e2;">
                        <div class="ui icon buttons" :class="[size]" v-for="group in model.active.toolbar">
                            <button class="ui button" v-for="item in group.items" data-tooltip="{{ item.tooltip }}" :class="{disabled: !item.enabled}" v-show="item.visible"
                                @click="item.onClick({ element: item })">
                                <i :class="[item.icon, 'icon']"></i>
                            </button>
                        </div>
                    </td>
                </tr>

                <tr class="values" v-for="element in model.active.elements"
                    :class="{ error: !!element.error, interaction: element.active, selection: element.type === 'Selection' }"
                    @click="element.type === 'Selection' && element.canToggle && model.toggleSelection(element, true)">
                    <td :class="{ fulfilled: element.fulfilled }">
                        <i class="disabled asterisk icon"></i>
                        {{ element.name }}
                    </td>
                    <td :class="{ relative: !!element.error }">

                        <template v-if="element.type === 'Input'">
                            <div class="ui labeled fluid input" :class="[size]">
                                <div v-if="element.label" class="ui label">
                                    {{ element.label }}
                                </div>
                                <input class="value" type="text" placeholder="" v-model="element.value"
                                    @keyup="element.onChange({ element: element, value: element.value })"
                                    @keyup.13="element.onEnter({ element: element, value: element.value })">
                            </div>
                        </template>

                        <template v-if="element.type === 'CheckBox'">
                            <div class="ui toggle checkbox" :class="[size]">
                                <input class="value" type="checkbox" name="public" v-model="element.value"
                                    @change="element.onChange({ element: element, value: element.value })">
                                <label style="text-transform: capitalize;">{{ element.value }}</label>
                            </div>
                        </template>

                        <template v-if="element.type === 'DropDown'">
                            <div class="ui simple fluid dropdown button" :class="[size]">
                                <i class="dropdown icon"></i>
                                {{ element.value || element.items[0] }}
                                <div class="menu">
                                    <div class="item" v-for="item in element.items"
                                        @click="element.value = item; element.onChange({ element: element, value: element.value })">
                                        {{ item }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="element.type === 'Selection'">

                            <span v-if="!!!element.items || element.items.length === 0">Click to select...</span>

                            <div class="ui grey labels" :class="[size]">
                                <div class="ui label" v-for="item in element.items">
                                    <i class="asterisk icon"></i>
                                    {{ item }}
                                    <i class="delete icon"></i>
                                </div>
                            </div>

                        </template>

                        <div v-if="element.error" class="ui left pointing red error label">
                            {{ element.error }}
                        </div>

                    </td>
                </tr>

                <tr v-if="model.active.results" v-for="label in model.active.results" style="border-left: initial!important; background-color: #e0e1e2;">
                    <td>{{ label.name }}</td>
                    <td>{{ label.value }}</td>
                </tr>

                <tr v-if="model.active.console" class="console">
                    <td colspan="2" style="border-left: initial!important;" class="relative">
                        <div class="ui transparent fluid left icon large input">
                            <i class="notched circle loading icon"></i>
                            <input class="console value" type="text" placeholder="{{ model.active.console.tooltip }}" v-model="model.active.console.value"
                                @keyup="model.active.console.onChange({ element: model.active.console, value: model.active.console.value })"
                                @keyup.13="model.active.console.onEnter({ element: model.active.console, value: model.active.console.value })">
                        </div>
                    </td>
                </tr>

                <tr v-if="model.active.console && model.active.console.labels.length > 0" class="console results">
                    <td colspan="2" style="border-left: initial!important;" class="relative">

                        <div class="ui fluid secondary lean vertical menu" :class="[size]">
                            <a class="item" v-for="label in model.active.console.labels" :class="{ active: $index === model.active.console.index }">
                                {{{ label.value }}}
                                <div class="ui label" :class="[size, { teal: $index === model.active.console.index }]">{{ label.name }}</div>
                                <div v-show="$index === model.active.console.index" class="ui blue label" :class="[size]">
                                    <i class="checkmark icon"></i>
                                    Apply
                                </div>
                            </a>
                        </div>

                    </td>
                </tr>

            </tbody>
        </table>

    </div>

</div>

</template>

<script>

import { Integration, Element, Elements } from 'awv3/plugin';

let integration;

export default {
    data: () => ({ size: 'small', model: null }),
    ready() {
        let view = this.view.getView();
        integration = new Integration({ view });
        this.model = integration.data;

    },
    props: ['view'],
    methods: {
        use(...plugin) {
            integration.use(...plugin);
        }
    }
}

</script>
