"use server";

import { auth, db } from "@/firebase/admin";
import { promises } from "dns";
import { cookies } from "next/headers";
import { json } from "stream/consumers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
// export async function setSessionCookie(idToken: string) {
//   const cookieStore = await cookies();

//   // Create session cookie
//   const sessionCookie = await auth.createSessionCookie(idToken, {
//     expiresIn: SESSION_DURATION * 1000, // milliseconds
//   });

//   // Set cookie in the browser
//   cookieStore.set("session", sessionCookie, {
//     maxAge: SESSION_DURATION,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     sameSite: "lax",
//   });
// }

// export async function signUp(params: SignUpParams) {
//   const { uid, name, email } = params;

//   try {
//     // check if user exists in db
//     const userRecord = await db.collection("users").doc(uid).get();
//     if (userRecord.exists)
//       return {
//         success: false,
//         message: "User already exists. Please sign in.",
//       };

//     // save user to db
//     await db.collection("users").doc(uid).set({
//       name,
//       email,
//       // profileURL,
//       // resumeURL,
//     });

//     return {
//       success: true,
//       message: "Account created successfully. Please sign in.",
//     };
//   } catch (error: any) {
//     console.error("Error creating user:", error);

//     // Handle Firebase specific errors
//     if (error.code === "auth/email-already-exists") {
//       return {
//         success: false,
//         message: "This email is already in use",
//       };
//     }

//     return {
//       success: false,
//       message: "Failed to create account. Please try again.",
//     };
//   }
// }

// export async function signIn(params: SignInParams) {
//   const { email, idToken } = params;

//   try {
//     const userRecord = await auth.getUserByEmail(email);
//     if (!userRecord)
//       return {
//         success: false,
//         message: "User does not exist. Create an account.",
//       };

//     await setSessionCookie(idToken);
//   } catch (error: any) {
//     console.log("");

//     return {
//       success: false,
//       message: "Failed to log into account. Please try again.",
//     };
//   }
// }

// Sign out user by clearing the session cookie
// export async function signOut() {
//   const cookieStore = await cookies();

//   cookieStore.delete("session");
// }

// Get current user from session cookie
// export async function getCurrentUser(): Promise<User | null> {
//   const cookieStore = await cookies();

//   const sessionCookie = cookieStore.get("accessToken")?.value;
//   if (!sessionCookie) return null;

//   try {
//     const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

//     // get user info from db
//     const userRecord = await db
//       .collection("users")
//       .doc(decodedClaims.uid)
//       .get();
//     if (!userRecord.exists) return null;

//     return {
//       ...userRecord.data(),
//       id: userRecord.id,
//     } as User;
//   } catch (error) {
//     console.log(error);

//     // Invalid or expired session
//     return null;
//   }
// }

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function signUpBackend({ name, email, password, gender, age }: { name: string; email: string; password: string; gender: string; age: string }) {
  try {
    const response = await fetch("http://localhost:9000/api/v1/auth/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name,
        email,
        password,
        gender,
        age,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in signUpBackend:", error);
    return { success: false, message: "Failed to register user." };
  }
}

export async function signInBackend({ email, password }: { email: string; password: string }) {
  try {
    const cookieStore = await cookies();
    const response = await fetch("http://localhost:9000/api/v1/auth/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      // Set cookies using Next.js cookies() API if running on the server, otherwise use document.cookie in the browser
      if (typeof window === "undefined") {
        console.log(data)
        // Server environment (server actions, route handlers)
        cookieStore.set("accessToken", data.data.accessToken, { path: "/" , httpOnly: true,sameSite:"lax",secure:false});
        cookieStore.set("refreshToken", data.data.refreshToken, { path: "/" , httpOnly: true,sameSite:"lax",secure:false});
      } else {
        // Client environment
        document.cookie = `accessToken=${data.data.accessToken}; path=/;`;
        document.cookie = `refreshToken=${data.data.refreshToken}; path=/;`;
      }
      return data;
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      return { success: false, message: "Server did not return JSON. See console for details." };
    }
  } catch (error) {
    console.error("Error in signInBackend:", error);
    return { success: false, message: "Failed to sign in user." };
  }
}

export async function getCurrentUser():Promise<null|User> {
  try {
    const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("accessToken")?.value;
  if (!sessionCookie) return null;
    const response = await fetch("http://localhost:9000/api/v1/auth/get-current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${sessionCookie}`
      },
      credentials: "include", // send cookies
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.data as User;
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occured");
    }
  } catch (error) {
    console.error("Error in getCurrentUserBackend:", error);
    throw new Error(String(error))
  }
}