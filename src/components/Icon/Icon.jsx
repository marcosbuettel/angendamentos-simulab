import { CIcon } from '@coreui/icons-react';
import { icons } from './AllIcons';

const Icon = ({ name, iconSize, cursor, onClick, color }) => {
  return (
    <>
      <CIcon
        icon={icons[name]}
        onClick={onClick}
        style={{
          display: 'block',
          width: iconSize,
          cursor: cursor,
          color: color
        }}
      />
    </>
  );
};

export default Icon;
