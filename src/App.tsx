import * as THREE from "three";
import {
    Canvas,
    extend,
    useFrame,
    useLoader,
    useThree,
} from "@react-three/fiber";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls, Reflector, Sky, useTexture } from "@react-three/drei";
import { Water } from "three-stdlib";
import ModelComponent from "./model";

extend({ Water });

function Ocean() {
    const ref = useRef<any>();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: false,
        }),
        [waterNormals]
    );
    useFrame(
        (state, delta) => (ref.current.material.uniforms.time.value += delta)
    );
    // @ts-ignore
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

function Box() {
    const ref = useRef<any>();
    useFrame((state, delta) => {
        ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20;
        ref.current.rotation.x =
            ref.current.rotation.y =
            ref.current.rotation.z +=
                delta;
    });
    return (
        <mesh ref={ref} scale={20}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    );
}

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 0]} intensity={1.5} />
                <directionalLight position={[-10, 10, 5]} intensity={1} />
                <directionalLight position={[-10, 20, 0]} intensity={1.5} />
                <directionalLight position={[0, -10, 0]} intensity={0.25} />
                <Suspense fallback={null}>
                    <group position-y={-0.25}>
                        <Ocean />
                        <Box />
                        <ModelComponent />
                    </group>
                </Suspense>

                <Sky
                    // @ts-ignore
                    scale={1000}
                    sunPosition={[500, 150, -1000]}
                    turbidity={0.1}
                />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default App;
