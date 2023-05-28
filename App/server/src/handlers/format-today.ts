export default {
    execute: () => {
        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        const day = currentDate.getDate();
        const dayInString = (day < 10) ? "0" + day.toString() : day.toString(); 
        

        return `${year}-${month}-${dayInString}`;
    }
}