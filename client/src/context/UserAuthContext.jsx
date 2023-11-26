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
                const userDetails = getUserDetailsFromLocalStorage(); // Implement this function
                setStudentDetails(userDetails);
            } else{
                setStudentDetails(null);
            }
        });  
        return () => unsubscribe();
    },[])

    const signUp = async (email, password, displayName, studentID, program, department) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          await updateProfile(user, {
            displayName: displayName,
          });
    
          setUser(user);
    
          // Save additional details to localStorage
          const userDetails = {
            studentID,
            program,
            department,
          };
          saveUserDetailsToLocalStorage(userDetails); // Implement this function
          setStudentDetails(userDetails);
        } catch (error) {
          console.error('Error creating user: ', error);
          throw error;
        }
      };
    // function signUp(email, password, firstname, lastname, studentId){
    //     return createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         console.log(user);
    //         // Add display name to the user profile
    //         return updateProfile(user, {
    //             displayName: `${firstname} ${lastname}`,
    //             studentId: studentId
                
                
    //         })
    //             .then(() => {
    //                 setUser(user);
    //             })
    //             .catch((error) => {
    //                 console.error("Error updating profile: ", error);
    //             });
    //     })
    //     .catch((error) => {
    //         console.error("Error creating user: ", error);
    //         throw error; // Rethrow the error to handle it in the component
    //     });
    // }
    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }
    // Function to save user details to localStorage
  const saveUserDetailsToLocalStorage = (userDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  // Function to get user details from localStorage
  const getUserDetailsFromLocalStorage = () => {
    const userDetailsString = localStorage.getItem('userDetails');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth", currentUser)
            setUser(currentUser);
          });
          return () => {
            unsubscribe();
          }
    },[]);

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