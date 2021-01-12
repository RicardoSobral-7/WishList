export default {
    timeForAdd(productPrice: number, economy: number) {
        const timeForAdd = Math.ceil(productPrice / economy);
        return timeForAdd;
    }
}