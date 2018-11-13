import React from 'react';
import PropTypes from 'prop-types';
import ReactCollapse from 'react-collapse';

/** `<Collapse/>` component is used for hideable content.
 *
 * Easily create accordions or within `<Card/>` to collapse its `<Card.Content/>`.
 */
const Collapse = ({children, open, dataHook}) => (
  <ReactCollapse data-hook={dataHook} isOpened={open} children={children}/>
);

Collapse.displayName = 'Collapse';

Collapse.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  dataHook: PropTypes.string
};

Collapse.defaultProps = {
  open: true
};

export default Collapse;
