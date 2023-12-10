import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile

} from 'firebase/auth'
import { auth } from '../firebase';

const UserAuthContext = createContext();


//Create a provider
export function UserAuthContextProvider({children}){
    const [user, setUser] = useState('');
    const [studentDetails, setStudentDetails]= useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                // If the user is logged in, fetch or set additional details
                const studentDetails = getUserDetailsFromLocalStorage(); // Implement this function
                setStudentDetails(studentDetails);
            } else{
                setStudentDetails(null);
            }
        });  
        return () => unsubscribe();
    },[])

    const signUp = async (email, password, displayName, studentID) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          await updateProfile(user, {
            displayName: displayName,
          });
    
          setUser(user);
    
          // Save additional details to localStorage
          const studentDetails = {
            studentID,
            displayName,
          };
          saveUserDetailsToLocalStorage(studentDetails); // Implement this function
          setStudentDetails(studentDetails);
        } catch (error) {
          console.error('Error creating user: ', error);
          throw error;
        }
      };
    
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    function logOut(){
        return signOut(auth)
    }
    // Function to save user details to localStorage
  const saveUserDetailsToLocalStorage = (studentDetails) => {
    localStorage.setItem('studentDetails', JSON.stringify(studentDetails));
  };

  // Function to get user details from localStorage
  const getUserDetailsFromLocalStorage = () => {
    const userDetailsString = localStorage.getItem('studentDetails');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  };


    return(
        <UserAuthContext.Provider value={{
            user,
            signUp , 
            studentDetails,
            logIn,
            logOut

        }}>
            {children}
        </UserAuthContext.Provider>
    
    )
}
// create a hook of context
export function useUserAuth(){
    return useContext(UserAuthContext)
}

