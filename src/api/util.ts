
// In utility file
export const getDefaultHeaders = (jwt: string) => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
    };
};