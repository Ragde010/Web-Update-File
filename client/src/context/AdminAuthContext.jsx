// AdminAuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';

const AdminAuthContext = createContext();

export function AdminAuthContextProvider({ children }) {
    const [adminUser, setAdminUser] = useState('');
    const [adminDetails, setAdminDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentAdminUser) => {
            setAdminUser(currentAdminUser);
            if (currentAdminUser) {
                // If the admin user is logged in, fetch or set additional details
                const adminDetails = getAdminDetailsFromLocalStorage(); // Implement this function
                console.log("adminDetails from localStorage", adminDetails); // Log adminDetails
                setAdminDetails(adminDetails);
            } else {
                setAdminDetails(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const signUp = async (email, password, displayName, adminID) => {
        try {
            const adminUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const adminUser = adminUserCredential.user;

            await updateProfile(adminUser, {
                displayName: displayName,
            });

            setAdminUser(adminUser);

            // Save additional details to localStorage
            const adminDetails = {
                adminID,
                displayName,

            };
            saveAdminDetailsToLocalStorage(adminDetails); // Implement this function
            setAdminDetails(adminDetails);
        } catch (error) {
            console.error('Error creating admin user: ', error);
            throw error;
        }
    };

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    // Function to save admin details to localStorage
    const saveAdminDetailsToLocalStorage = (adminDetails) => {
        localStorage.setItem('adminDetails', JSON.stringify(adminDetails));
    };

    // Function to get admin details from localStorage
    const getAdminDetailsFromLocalStorage = () => {
        const adminDetailsString = localStorage.getItem('adminDetails');
        return adminDetailsString ? JSON.parse(adminDetailsString) : null;
    };

    return (
        <AdminAuthContext.Provider value={{
            adminUser,
            signUp,
            adminDetails,
            logIn,
            logOut
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}
