import { PLANTS_CONFIG } from '../config/plantsConfig.js';

export default async function getBestPlantsForLocation() {
    if (!navigator.geolocation) {
        //if user denies geolocation, return default plants
        return [PLANTS_CONFIG.WHEAT, PLANTS_CONFIG.TOMATO];
    }
    //else return promise with plants based on latitude
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude } = position.coords;
                const absoluteLat = Math.abs(latitude);

                if (absoluteLat > 50) {
                    resolve([PLANTS_CONFIG.WHEAT, PLANTS_CONFIG.MUSHROOM]);
                } else if (absoluteLat > 25) {
                    resolve([PLANTS_CONFIG.TOMATO, PLANTS_CONFIG.SUNFLOWER, PLANTS_CONFIG.PEPPER]);
                } else {
                    resolve([PLANTS_CONFIG.BANANA, PLANTS_CONFIG.ORANGE, PLANTS_CONFIG.PALM]);
                }
            },
            error => {
                reject(error);
            }
        );
    });
}