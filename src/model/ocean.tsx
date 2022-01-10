import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Water } from "three-stdlib";

extend({ Water });

export function Ocean() {
    const ref = useRef<any>();
    const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(2000, 1000), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0xffffff,
            distortionScale: 3.7,
            fog: false,
        }),
        [waterNormals]
    );

    useFrame(
        (state, delta) => (ref.current.material.uniforms.time.value += delta)
    );
    // useEffect(() => {
    //     console.log(ref);
    //     ref.current.position.y = -100;
    // }, []);
    // @ts-ignore
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}
