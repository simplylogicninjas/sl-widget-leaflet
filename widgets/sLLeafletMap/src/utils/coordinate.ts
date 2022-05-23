export const convertToFloat = (coordinate: string): number => {
    try {
        const parsed = parseFloat(coordinate);

        return parsed;
    } catch (e) {
        return 0;
    }
}