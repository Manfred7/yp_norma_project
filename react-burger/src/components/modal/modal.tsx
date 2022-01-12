import React, {FC} from 'react';
import s from "./modal.module.css"
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TFunc} from "../../utils/types";

const ESCAPE = 'Escape';
const modalRoot: Element = document.getElementById("react-modals") as Element;

interface IModalProps {
    header?: string;
    onClose: TFunc;
    isOpen: boolean;
}

const Modal: FC<IModalProps> = (props) => {

    const {children, header, onClose, isOpen} = props;

    const handleKeyDown = React.useCallback((evt) => {
        if (evt.key === ESCAPE) {
            onClose();
            evt.preventDefault();
        }
    }, [onClose]);

    React.useEffect(() => {

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {

            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);


    if (!props.isOpen)
        return null

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose}/>
            <div className={s.modal}>
                <div className={s.header + ' mt-10 mr-10 ml-10'}>
                    <h3 className={s.caption + ' text text_type_main-large'}>
                        {header}
                    </h3>
                    <CloseIcon type={"primary"} onClick={onClose}/>
                </div>
                <div className={s.children}>{children}</div>
            </div>
        </>
        , modalRoot)
}


export default Modal;
