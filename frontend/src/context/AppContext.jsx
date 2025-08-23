import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false);

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

        // Return N/A for negative ages
        return age < 0 ? "N/A" : age;
    };

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');

            if (data.success) {
                setDoctors(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Failed to fetch doctors data');
        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });

            if (data.success) {
                setUserData(data.userData);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Failed to load user profile');
        }
    }

    const value = {
        doctors, getDoctorsData,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        calculateAge
    }

    useEffect(() => {
        getDoctorsData();
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
        else {
            setUserData(false);
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;