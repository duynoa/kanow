import { animate } from "framer-motion";

export const ScrollToSection = (idSection: number | string, yOffset = 0) => {
    const element = document.getElementById(String(idSection));
    if (element) {
        //    yOffset; Khoảng cách muốn trừ đi
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        // Sử dụng framer-motion để cuộn đến vị trí tính toán
        animate(window.scrollY, y, {
            type: "spring",
            stiffness: 100,
            damping: 30,
            onUpdate: (value: number) => window.scrollTo(0, value),
        });
    }
};
