import React, {FC} from 'react';
import s from "./modal-overlay.module.css"
import {TFunc} from "../../utils/types";

interface IModalOverlayProps {
    onClick: TFunc;
}

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
    return (
        <div className={s.modalOverlay} onClick={props.onClick}></div>);
}

export default ModalOverlay;
