import THREE from 'three';
import 'requestidlecallback';
import delay from 'delay'
import { Canvas, View, Parser, Object3, SignalR } from 'awv3';

const canvas = new Canvas({ dom: '#main' });
const indicator = canvas.dom.querySelector('.circle');
const view = new View(canvas, { ambient: 0x909090 });
const container = new Object3().setRotation(Math.PI / 2, 0, 0);
view.scene.add(container);

function factory({ type, context }) {
    switch (type) {
        case Parser.Factory.Started:
            // Fade out indicator
            indicator.classList.add('visible');
            break;
        case Parser.Factory.Finished:
            // Fade out indicator
            indicator.classList.remove('visible');
            container.add(context.models);
            container.updateBounds();
            view.controls.rotate(Math.PI / 2, Math.PI / 2).focus(container).now().zoom(container);
            break;
    }
}

// Start once the browser has calmed down a bit
requestIdleCallback(async _ => {

    // Create new connection
    let server = await new SignalR().connect('https://tooldesignercad-dev.io.tools:10100');

    // Run commands, add models
    await server.execute(`
        _C.ToolDesigner3d.InitApplication("3dToolDesigner.of1");
        _O.ToolDesigner3d.CreateTool("Test_Tool","Drill");
        _O.ToolDesigner3d.AddComponent("adapter", "Drawings/ISO_Comp/HSKA63.of1");
        _O.ToolDesigner3d.AddComponent("extension","Drawings/ISO_Comp/EXTC.of1",[["Lmax","Dstart"],[10,90]]);
        _O.ToolDesigner3d.AddComponent("nocut","Drawings/ISO_Comp/NOCUTC.of1",[["Lmax","Dstart"],[27,30]]);
        _O.ToolDesigner3d.AddComponent("cut1","Drawings/ISO_Comp/milcutc.of1",[["Lmax","Dstart"],[180,30]]);`, factory);

    // Get values
    let { firstResult: length } = await server.result(`_O.ToolDesigner3d.GetMaxLength();`);
    console.log(`maxLength: ${length}`);
    let { firstResult: [{CF0: b1}, {CF1: b2}] } = await server.result(`_O.ToolDesigner3d.GetBlendPoints("extension");`);
    console.log(`extension CF0: ${b1}, CF1: ${b2}`);
    let { firstResult: [{ dimensionType: d1 }, { dimensionType: d2 }] } = await server.result(`_O.ToolDesigner3d.GetComponentParams("extension");`);
    console.log(`extension dimType: ${d1}, ${d2}`);

    // Add components
    await server.execute(`
        _O.ToolDesigner3d.AddComponent("cut2", "Drawings/ISO_Comp/milcutinsoctagonal.of1", [["RE","KAPR","IC","DC","LF0","LF1"],[1,30,10,60,10,10]]);`, factory);

    // Disconnect server
    server.disconnect();

    // Remove indicator & disconnect
    await delay(1000);
    canvas.dom.removeChild(indicator);
});
