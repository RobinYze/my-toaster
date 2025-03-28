import React from 'react';
import { Toast } from "@/headless"

interface ProgressBarProps {
    toast: Toast
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ toast }) => {

    const [progressPercentage, setProgressPercentage] = React.useState<string | null>(null);
    const animationFrameRef = React.useRef<number | null>(null);

    React.useEffect(() => {
        if (typeof toast.progress !== "number" && toast.progress !== "auto") {
            setProgressPercentage(null);
            return;
        }

        const duration = toast.duration || 0;
        const pauseDuration = toast.pauseDuration || 0;
        const createdAt = toast.createdAt || 0;

        const updateProgress = () => {
            const now = Date.now();
            const durationLeft = duration + pauseDuration - (now - createdAt);

            let progress: string;

            if (typeof toast.progress === "number") {
                progress = `${Math.min(toast.progress, 100)}%`;
            } else {
                if (duration === 0) {
                    progress = "100%";
                } else {
                    const calculatedProgress = (1 - (durationLeft / duration)) * 100;
                    progress = `${Math.min(Math.max(calculatedProgress, 0), 100)}%`;
                }
            }

            setProgressPercentage(progress);
            animationFrameRef.current = requestAnimationFrame(updateProgress);
        };

        animationFrameRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [toast]);

    const color = toast?.type === "success" || toast?.type === "error" ? "bg-white" : "bg-gray-600";

    if(typeof toast.progress !== "number" && toast.progress !== "auto") return null;

    if (progressPercentage === null) return null;

    return (
        <div className='absolute bottom-0 left-0 w-full h-1 z-10'>
            <div className={`h-full duration-200 ${color}`} style={{ width:progressPercentage }}></div>
        </div>
    )
})

export { ProgressBar }