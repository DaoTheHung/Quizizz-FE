import { addZezo } from "./addZeroDate";
export const getDates = (date) => {
    const str =
        date.getFullYear()
        + "-" +
        addZezo(date.getMonth() + 1)
        + "-" +
        addZezo(date.getDate())

    return str;


}