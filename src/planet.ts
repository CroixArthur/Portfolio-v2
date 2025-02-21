export interface Planet {
    y: number;
    x: number;
    d: number; // Diameter
    p: number; // Starting percentage position on ellipse
    speed: number; // Speed (0 - 1)
    name: string;
}