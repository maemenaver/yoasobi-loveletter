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

const Model = () => {
    // /* Refs */
    // const group: group = useRef()
    // const actions: actions = useRef()

    // /* State */
    // const [model, setModel] = useState<any>(null)
    // const [animation, setAnimation] = useState<any>(null)

    // /* Mixer */
    // const [mixer] = useState(() => new THREE.AnimationMixer(null))

    // /* Load model */
    // useEffect(() => {
    //   const loader = new GLTFLoader()
    //   loader.load('scene.gltf', async (gltf) => {
    //     const nodes = await gltf.parser.getDependencies('node')
    //     const animations = await gltf.parser.getDependencies('animation')
    //     setModel(nodes[0])
    //     setAnimation(animations)
    //   })
    // }, [])

    // /* Set animation */
    // useEffect(() => {
    //   if (animation && typeof group.current != 'undefined') {
    //     actions.current = {
    //       idle: mixer.clipAction(animation[0], group.current),
    //     }
    //     actions.current.idle.play()
    //     return () => animation.forEach((clip) => mixer.uncacheClip(clip))
    //   }
    // }, [animation, mixer])

    // /* Animation update */
    // useFrame((_, delta) => mixer.update(delta))
    // /* Rotation */
    // useFrame(() => {
    //   if (typeof group.current != 'undefined')
    //     return (group.current.rotation.y += 0.01)
    // })

    const model = useGLTF("http://localhost:3000/scene.gltf");

    return (
        <>
            <primitive object={model.scene} />
        </>
    );
};

export default Model;
