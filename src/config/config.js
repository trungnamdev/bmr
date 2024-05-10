export const getStorage = async (key) => {
    try {
        const value = await localStorage.getItem(key);
        return value;
    } catch (error) {
        console.error("Error getting data from localStorage:", error);
        throw error;
    }
}
export const setStorage = async (key, value) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.error("Error setting data to localStorage:", error);
        throw error;
    }
}
export const removeStorage = async (key) => {
    try {
        await localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing data from localStorage:", error);
        throw error;
    }
}