import FloatingActionButton from 'material-ui/FloatingActionButton';
import React, { PropTypes } from 'react';
const FabStyle = {
  position:'fixed',
  bottom: 30,
  right: 30,
  zIndex: 100
};

const Button = (props) => {
  const { secondary, clickFab, disabled, Icon, style, backgroundColor } = props;
    return(
      <div>
      <FloatingActionButton backgroundColor={backgroundColor}  className="FAB" style={style} onTouchTap={clickFab} disabled={disabled} secondary={secondary}>
          {Icon}
      </FloatingActionButton>
      </div>
    )
}

Button.defaultProps = {
  disabled: false,
  secondary: false,
  style: FabStyle
}

Button.propTypes = {
  secondary: PropTypes.bool,
  clickFab: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  Icon: PropTypes.node.isRequired,
  style: PropTypes.object,
  backgroundColor: PropTypes.string,
}

export default Button;