import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

interface group {
    current: {
        rotation: {
            x: number;
            y: number;
        };
    };
}

interface actions {
    current: {
        idle: {
            play: () => void;
        };
    };
}

const ModelComponent = (props) => {
    // /* Refs */
    const group: group = useRef();
    // const actions: actions = useRef();

    // /* State */
    const [model, setModel] = useState<any>(null);
    // const [animation, setAnimation] = useState<any>(null);

    // /* Mixer */
    // const [mixer] = useState(() => new THREE.AnimationMixer(null));

    // /* Load model */
    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load("plants1.gltf", async (gltf) => {
            const nodes = await gltf.parser.getDependencies("node");
            setModel(nodes[0]);
            // const animations = await gltf.parser.getDependencies("animation");
            // setAnimation(animations);
        });
    }, []);

    // /* Set animation */
    // useEffect(() => {
    //     if (animation && typeof group.current != "undefined") {
    //         actions.current = {
    //             // @ts-ignore
    //             idle: mixer.clipAction(animation[0], group.current),
    //         };
    //         actions.current.idle.play();
    //         return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    //     }
    // }, [animation, mixer]);

    // /* Animation update */
    // useFrame((_, delta) => mixer.update(delta));
    // /* Rotation */
    // useFrame(() => {
    //     if (typeof group.current != "undefined")
    //         return (group.current.rotation.y += 0.01);
    // });

    // const model = useGLTF("http://localhost:3000/plants1.gltf");

    return (
        <>
            {model ? (
                <group
                    ref={group}
                    position={[0, 0, 0]}
                    scale={0.01}
                    dispose={null}
                    {...props}
                >
                    <primitive ref={group} name="Object_0" object={model} />
                </group>
            ) : (
                <Html>Loading...</Html>
            )}
            {/* <group
                position={[0, 0, 0]}
                scale={0.4}
                rotation={[0, 0, 180]}
                {...props}
            >
                <primitive object={model.scene} />
            </group> */}
        </>
    );
};

export default ModelComponent;
