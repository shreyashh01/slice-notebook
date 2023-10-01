import { createContext } from "react";

const noteContext = createContext({
    showAlert: (message, type) =>{}
});

export default noteContext;