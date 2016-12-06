import { Plugin, Elements } from 'awv3/plugin';

export default class Sketch extends Plugin {
    constructor() {
        super({ name: 'Sketch', icon: 'write' });
    }

    onEnabled(integration) {
        // this.apply simply applies object.keys to this.data
        this.apply({
            title: 'Fill out details ...',
            elements: [
                new Elements.Selection({ name: 'Plane', limit: 1, active: true }),
                new Elements.DropDown({ name: 'Direction', items: ['Pointing up', 'Pointing down'], error: "This is an error message!" }),
                new Elements.Input({ class: Elements.Input.String, name: 'Offset', value: "default", Tooltip: 'This is a tooltip', onChange(value) { console.log(value)} }),
                new Elements.Input({ class: Elements.Input.Number, name: 'Angle', label: "Label", optional: true }),
                new Elements.CheckBox({ name: 'Solve', value: true })
            ],
            toolbar: [
                new Elements.ButtonGroup({ name: 'abc', items: [
                    new Elements.Button({ tooltip: '1', icon: 'align left', enabled: false }),
                    new Elements.Button({ tooltip: '2', icon: 'align center', onClick: () => { console.log(this.test)} }),
                    new Elements.Button({ tooltip: '3', icon: 'align right' }),
                    new Elements.Button({ tooltip: '4', icon: 'align justify' }),
                    new Elements.Button({ tooltip: '5', icon: 'bold' }),
                    new Elements.Button({ tooltip: '6', icon: 'underline' }),
                    new Elements.Button({ tooltip: '7', icon: 'text width' }),
                    new Elements.Button({ tooltip: '8', icon: 'align right' }),
                    new Elements.Button({ tooltip: '9', icon: 'align justify' }),
                    new Elements.Button({ tooltip: '10', icon: 'align left' })
                ]}),
                new Elements.ButtonGroup({ name: 'abc', items: [
                    new Elements.Button({ icon: 'align left', enabled: false }),
                    new Elements.Button({ tooltip: '2', icon: 'align center', enabled: false }),
                    new Elements.Button({ tooltip: '3', icon: 'align right', enabled: false }),
                    new Elements.Button({ tooltip: '4', icon: 'align justify' }),
                    new Elements.Button({ tooltip: '5', icon: 'bold' }),
                    new Elements.Button({ tooltip: '6', icon: 'underline' }),
                    new Elements.Button({ tooltip: '7', icon: 'text width' }),
                    new Elements.Button({ tooltip: '8', icon: 'align right' }),
                    new Elements.Button({ tooltip: '9', icon: 'align justify', visible: false }),
                    new Elements.Button({ tooltip: '10', icon: 'align left', visible: false })
                ]})
            ],
            console: new Elements.Console({
                onChange: ({ value }) => {
                    if (value.length === 0) {
                        this.data.console.labels = [];
                        return;
                    }

                    let array = value.split(/,| /);
                    let first = array[0];

                    this.data.console.labels = [
                        new Elements.Label({ name: "Angle", value: `${first} <span class="text teal">°</span>` }),
                        new Elements.Label({ name: "Dist", value: `${first} <span class="text teal">unit</span>` }),
                        new Elements.Label({ name: "Start", value: `<span class="text teal">[</span>${array[0]}, ${array[1]}<span class="text teal">]</span>` })
                    ];
                },
                onExecute: () => {

                }
            }),
            labels: [
                new Elements.Label({ name: "Angle", value: "45 °" }),
                new Elements.Label({ name: "Dist" }),
                new Elements.Label({ name: "Pos" })
            ]
        });
    }
}
