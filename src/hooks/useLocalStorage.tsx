
export const useLocalStorage = () => {
    
    const data = JSON.parse(localStorage.getItem("shortURLs") || "[]");
    return [ data];

}