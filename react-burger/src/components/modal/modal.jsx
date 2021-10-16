import React from 'react';
import s from "./modal.module.css"
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const ESCAPE = 'Escape';
const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    const {children, header, onClose, isOpen} = props;

    const handleKeyDown = React.useCallback( (evt) => {
        if (evt.key === ESCAPE) {
            onClose();
            evt.preventDefault();
        }
    },[onClose]);

    React.useEffect(() => {

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (isOpen) {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [isOpen,handleKeyDown]);


    if (!props.isOpen)
        return '';

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose}/>
            <div className={s.modal}>
                <div className={s.header + ' mt-10 mr-10 ml-10'}>
                    <h3 className={s.caption + ' text text_type_main-large'}>
                        {header}
                    </h3>
                    <button className={s.btnClose}
                            onClick={onClose}
                    />
                </div>
                <div className={s.children}>{children}</div>
            </div>
        </>
        , modalRoot)
}

Modal.propTypes = {
    children : PropTypes.element.isRequired,
    header:PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;
