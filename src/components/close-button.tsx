import React, { useState } from "react"
import { ActionType, dispatch } from "../core/store"
import { Toast } from "../headless"
import { motion } from 'framer-motion';

interface CloseButtonProps {
    toast: Toast
}

const CloseButton: React.FC<CloseButtonProps> = React.memo(({ toast }) => {
    const [isHovered, setIsHovered] = useState(false);
    const close = () => { dispatch({ type: ActionType.DISMISS_TOAST, toastId: toast.id }) }

    if(!toast.closeButton) return null;

    const color = toast.type === "success" || toast.type === "error" ? "bg-white" : "bg-gray-600";

    return (
        <button 
            onClick={close}
            className="absolute right-1 top-1 cursor-pointer w-6 h-6 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-3 h-3"
                animate={{
                    rotate: isHovered ? 0 : 45,
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px rounded-full ${color}`}
                    animate={{ rotate: isHovered ? 0 : 0 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px rounded-full ${color}`}
                    animate={{ rotate: isHovered ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </button>
    )
}) 

export { CloseButton }