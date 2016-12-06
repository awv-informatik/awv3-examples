import Canvas from 'awv3/core/canvas';
import View from 'awv3/core/view';
import Parser from 'awv3/core/parser';
import Object3 from 'awv3/three/object3';
import SocketIO from 'awv3/communication/socketio';
import delay from 'delay';
import alertify from 'alertify.js';

const canvas = new Canvas({ dom: '#main' });
const view = new View(canvas);

requestIdleCallback(async () => {

    alertify.log(`Trying to connect ...`);

    let connection = await (new SocketIO()).connect(
        document.location.hostname == 'localhost' ? 'http://localhost:8181' : 'http://awvr2.cloudapp.net')
        .catch(alertify.error);

    if (connection) {
        alertify.success(`Connected!`);

        // Run command
        addModels(await connection.execute(`
            _C.ToolDesigner3d.InitApplication("Drawings/3dToolDesigner/3dToolDesigner.of1");
            _O.ToolDesigner3d.LoadExistingTool("Drawings/ISO_Tool/Demo_Tool.of1");`));

        // Modify parameters
        addModels(await connection.execute(`
            _O.ToolDesigner3d.SetComponentParams("EXTENSION",["LB", "BD"],[90, 80]);`));

        // Save state locally
        let state = await connection.getState();

        alertify.log(`Disconneting ...`);

        // Clear Scene
        await delay(1000);
        connection.disconnect();
        view.scene.destroy();

        // Re-connect, uses previous url by default
        await connection.connect();

        // Set old state: .setState(blob, [recalc=false])
        addModels(await connection.setState(state, true));

        alertify.success(`State reloaded!`);
    }
});

function addModels(context) {
    let object = new Object3(context.models);
    view.scene.add(object);
    view.controls.zoom().focus();
}
