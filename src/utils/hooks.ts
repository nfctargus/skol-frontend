import { Dispatch, useEffect } from "react";

export const useContextMenuToggler = (ref:React.MutableRefObject<null | HTMLDivElement>,setShowModal:Dispatch<React.SetStateAction<boolean>>) => {
    useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (ref.current && !ref.current.contains(event.target)) setShowModal(false);  
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
}

