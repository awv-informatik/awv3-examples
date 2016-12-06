import { Plugin, Elements } from 'awv3/plugin';

export default class Measure extends Plugin {
    constructor() {
        super({ name: 'Measure', icon: 'expand' });
    }

    onEnabled(integration) {
        // this.apply simply applies object.keys to this.data
        // this is done in order to serve fresh data on the plugins start
        this.apply({
            title: 'Select items ...',
            elements: [
                new Elements.Selection({ name: 'Selection', active: true, types: ['Mesh', 'LineSegments'], onChange: data =>
                    this.data.results = Measure.solve(data.objects).map(item => new Elements.Label({ name: item.description, value: item.result }))
                })
            ],
            labels: []
        });
    }

    onDisabled(integration) {
        // Cleanup
    }

    // This function could be used without having to instanciate the plugin
    static solve(objects) {
        return objects.map(item => ({ result: item.object.getRadius(), description: `Radius [${item.object.id}]` }));
    }

}
