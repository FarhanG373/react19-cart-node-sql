import { jwtDecode } from "jwt-decode";

// ✅ Function to get the token from localStorage (client-side only)
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("next19lerning") || null;
  }
  return null;
};

// ✅ Function to decode JWT safely (returns any type)
export const decodeToken = (): any | null => {
  try {
    const token = getToken();
    if (!token) return null;

    return jwtDecode(token); // Decodes the token without type constraints
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// ✅ Function to save the token in localStorage
export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("next19lerning", token);
  }
};

// ✅ Function to remove token (logout)
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("next19lerning");
  }
};
