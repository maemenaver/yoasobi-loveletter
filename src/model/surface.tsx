import { map } from "../lib/map";
import ModelComponent from "../model";
import { Ocean } from "./ocean";

const flowers = (count: number) => {
    let result = [];

    for (let i = 0; i < count; i++) {
        const z = Math.random() * (-500 - 50) + 50;
        const xMax = 620 + 55 - map(z, -500, 50, 55, 620);
        const x = Math.random() * (xMax + xMax) - xMax;
        result.push([x, 0, z]);
    }

    return result;
};

export const Surface = () => {
    return (
        <group position-y={-20}>
            <Ocean />
            {/* <Box /> */}
            {flowers(1000).map((value, index) => (
                <>
                    <ModelComponent key={`flower_${index}`} position={value} />
                </>
            ))}
        </group>
    );
};
