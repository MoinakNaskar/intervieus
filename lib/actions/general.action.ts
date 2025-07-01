"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { cookies } from "next/headers";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, transcript } = params;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) throw new Error("No access token found");

    const response = await fetch("http://localhost:9000/api/v1/interview/generate-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        interviewId,
        transcript,
      }),
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      console.log(data)
      if (!data) throw new Error("No feedback data received");
     
      return data as Feedback;
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occurred");
    }
  } catch (error) {
    console.error("Error in createFeedback:", error);
    throw new Error(String(error));
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const response = await fetch(`http://localhost:9000/api/v1/user/get-interview/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!data.data) return null;
      return data.data as Interview;
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occurred");
    }
  } catch (error) {
    console.error("Error in getInterviewById:", error);
    throw new Error(String(error));
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId } = params;
  
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const response = await fetch(`http://localhost:9000/api/v1/user/get-feedback/${interviewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!data.data) return null;
      console.log(data.data[0])
      return data.data[0] as Feedback;
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occurred");
    }
  } catch (error) {
    console.error("Error in getFeedbackByInterviewId:", error);
    throw new Error(String(error));
  }
}

export async function getLatestInterviews(): Promise<Interview[] | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const response = await fetch("http://localhost:9000/api/v1/user/get-latest-interviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return null;
      }
      return data.data as Interview[];
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occurred");
    }
  } catch (error) {
    console.error("Error in getLatestInterviews:", error);
    throw new Error(String(error));
  }
}

export async function getMyInterviews(): Promise<Interview[] | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) return null;

    const response = await fetch("http://localhost:9000/api/v1/user/get-my-interviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
        return null;
      }
      return data.data as Interview[];
    } else {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Error Occurred");
    }
  } catch (error) {
    console.error("Error in getMyInterviews:", error);
    throw new Error(String(error));
  }
}
