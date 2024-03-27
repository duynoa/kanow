import { uuidv4 } from "@/lib/uuid";

const CustomDataHeader = [
    {
        id: uuidv4(),
        name: "Về chúng tôi",
        link: "/about-us",
        children: false,
        visible: true,
    },
    {
        id: uuidv4(),
        name: "Trở thành đối tác của Kanow",
        link: "/partner",
        children: true,
        visible: true,
    },
    {
        id: uuidv4(),
        name: "Chuyến của tôi",
        link: "/search-car",
        children: false,
        visible: false,
    },
];
export { CustomDataHeader };
