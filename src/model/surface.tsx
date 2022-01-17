import { map } from "../lib/map";
import { Ocean } from "./ocean";
import Plants1 from "./Plants1";

const flowers = (count: number) => {
    let result = [];

    for (let i = 0; i < count; i++) {
        const z = Math.random() * (-500 - 60) + 60;
        const xMax = 670 + 55 - map(z, -500, 60, 55, 670);
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
            {flowers(2000).map((value, index) => (
                <>
                    <Plants1
                        key={`flower_${index}`}
                        position={value}
                        scale={0.01}
                    />
                </>
            ))}
        </group>
    );
};
