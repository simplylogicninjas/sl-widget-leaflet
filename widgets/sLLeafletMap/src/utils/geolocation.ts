export const getCurrentLocation = async () => {
    try {
        return await new Promise<GeolocationCoordinates>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => reject(error)
            );
        });
    } catch (e) {
        throw new Error("getCurrentPosition error", e);
    }
};
