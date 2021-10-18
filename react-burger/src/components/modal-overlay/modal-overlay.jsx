import React from 'react';
import s from "./modal-overlay.module.css"
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
    return (
        <div className={s.modalOverlay} onClick={props.onClick}>  </div>);
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
};
export default ModalOverlay;
