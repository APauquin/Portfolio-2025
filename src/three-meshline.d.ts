declare module "three.meshline" {
  import * as THREE from "three";

  export class MeshLine extends THREE.Object3D {
    geometry: THREE.BufferGeometry;
    setPoints(points: number[] | THREE.Vector3[]): void;
  }

  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters: {
      color?: THREE.Color | string | number;
      lineWidth?: number;
      sizeAttenuation?: boolean;
      resolution?: THREE.Vector2;
      dashArray?: number;
      dashOffset?: number;
      dashRatio?: number;
      transparent?: boolean;
      blending?: THREE.Blending;
    });
  }
}
