import React, { useState } from 'react';
import styles from './component.module.scss';

const Tooltip = ({ children, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.tooltipContainer}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className={styles.tooltip}>
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
