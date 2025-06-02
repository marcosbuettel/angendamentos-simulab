import './Modal.css';
import Icon from '../Icon/Icon';

const Modal = ({ title, visible, setVisible }) => {
  return (
    <>
      {visible && (
        <div className="modalOverlay">
          <div className="modalContainer">
            <div className="modalHeader">
              {title}
              <Icon
                name={'cilX'}
                iconSize={'20px'}
                cursor="pointer"
                onClick={() => setVisible(!visible)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
