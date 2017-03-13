import React from 'react';
import { connect } from 'react-redux';
import { Upload, Button, Icon, Tooltip } from 'antd';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import classNames from 'classnames';
import { actions } from 'awv3/session/store/elements';
import ButtonImpl from 'awv3/session/elements/button';
import { pack } from 'awv3/session/helpers';

const ColorButton = ({ onClick, item }) => (
    <ColorPicker animation="slide-up" defaultColor={item.color} placement="bottomLeft" onChange={onClick} />
);

const UploadButton = ({ onClick }) => (
    <div
        className="ant-upload ant-upload-select ant-upload-select-text"
        style={{ position: 'relative', width: '100%', height: 28 }}>
        <label className="ant-btn" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <i className="anticon anticon-upload " />
            <span> Click to Upload</span>
            <input type="file" accept="" style={{ display: 'none' }} onChange={onClick} />
        </label>
    </div>
);

const RegularButton = ({ onClick, style, elementStyle, item, session } = {}) => {
    let { name, color, icon, format, value, plugin, active, visible } = item;
    let isIcon = icon && visible ? { paddingTop: 0, paddingBottom: 0, display: 'flex', justifyContent: 'center' } : {};
    let hex = color && (color.startsWith('#') || color.startsWith('rgb'));
    let imgActive = !active ? { opacity: 0.4 } : {};
    return (
        <Tooltip title={icon ? name : ''}>
            <Button
                onClick={onClick}
                className={classNames({
                    ['bg-' + color]: !hex,
                    active: format === ButtonImpl.Format.Toggle && value
                })}
                style={{ ...elementStyle, ...style, ...isIcon, height: 28, backgroundColor: hex ? color : '' }}>
                {icon
                    ? <img style={{ width: 24, ...imgActive }} src={session.resolveResource(icon, plugin)} />
                    : <div>{name}</div>}
            </Button>
        </Tooltip>
    );
};

@connect((state, props) => ({ item: state.elements[props.id] }), actions)
export default class ButtonElement extends React.PureComponent {
    static contextTypes = { session: React.PropTypes.object };
    onClick = event => {
        if (event.type === 'change') {
            let file = event.target.files[0];
            let name = file.name.substr(0, file.name.lastIndexOf('.'));
            var reader = new FileReader();
            reader.onload = event => {
                event.result = pack(event.target.result);
                event.filename = name;
                this.props.event(this.props.id, event);
            };
            reader.readAsArrayBuffer(file);
        } else {
            this.props.event(this.props.id, event);
            if (this.props.item.format === ButtonImpl.Format.Toggle)
                this.props.update(this.props.id, { value: !this.props.item.value });
        }
    };
    render() {
        let { name, icon, format } = this.props.item;
        let Component = RegularButton;
        switch (format) {
            case 'Upload':
                Component = UploadButton;
                break;
            case 'Color':
                Component = ColorButton;
                break;
        }
        return (
            <Component
                onClick={this.onClick}
                session={this.context.session}
                style={this.props.style}
                elementStyle={this.props.elementStyle}
                item={this.props.item}
            />
        );
    }
}
