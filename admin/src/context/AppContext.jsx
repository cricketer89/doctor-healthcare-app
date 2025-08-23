import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
        // Handle invalid dates or "Not Selected"
        if (!dob || dob === "Not Selected" || dob === "") {
            return "N/A";
        }

        const birthDate = new Date(dob);

        // Check if the date is invalid
        if (isNaN(birthDate.getTime())) {
            return "N/A";
        }

        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        // Return N/A for negative ages (shouldn't happen with valid dates)
        return age < 0 ? "N/A" : age;
    };

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }

    const value = {
        calculateAge,
        slotDateFormat
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;