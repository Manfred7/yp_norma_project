import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {TAppDispatch, TAppThunk, TRootState} from "../utils/types";

// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();
