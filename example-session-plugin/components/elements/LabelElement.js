import React from 'react';
import { connect } from 'react-redux';

@connect((state, props) => ({ item: state.elements[props.id] }))
export default class LabelElement extends React.PureComponent {
    render() {
        let { classes, item } = this.props;
        let additional = item.header
            ? {
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  padding: '0em 1em',
                  lineHeight: '28px',
                  height: 28,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: 6
              }
            : { padding: '0em 0.3em 0em 0.5em' };
        return (
            <div
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 28,
                    ...this.props.style,
                    ...additional
                }}>
                {item.value}
            </div>
        );
    }
}
