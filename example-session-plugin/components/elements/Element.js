import React from 'react';
import { connect } from 'react-redux';
import SelectionElement from './SelectionElement';
import CheckboxElement from './CheckboxElement';
import LabelElement from './LabelElement';
import InputElement from './InputElement';
import ButtonElement from './ButtonElement';
import DropdownElement from './DropdownElement';
import GroupElement from './GroupElement';
import ConsoleElement from './ConsoleElement';
import SpacerElement from './SpacerElement';
import DividerElement from './DividerElement';
import SliderElement from './SliderElement';
import LinkElement from './LinkElement';
import CustomElement from './CustomElement';

export const elements = {
    Console: ConsoleElement,
    Selection: SelectionElement,
    Checkbox: CheckboxElement,
    Dropdown: DropdownElement,
    Label: LabelElement,
    Input: InputElement,
    Button: ButtonElement,
    Group: GroupElement,
    Spacer: SpacerElement,
    Divider: DividerElement,
    Slider: SliderElement,
    Link: LinkElement,
    Custom: CustomElement
};

@connect((state, props) => ({ item: state.elements[props.id] }))
export default class Element extends React.PureComponent {
    render() {
        let { item, elementStyle } = this.props;
        let { id, name, type, visible, flex } = item;
        let Component = elements[type] || SpacerElement;
        return (
            <Component
                style={{ ...elementStyle, display: visible ? 'block' : 'none', flex }}
                id={id}
                elementStyle={elementStyle}
            />
        );
    }
}
