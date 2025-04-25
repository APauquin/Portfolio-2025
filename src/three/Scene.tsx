import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import GUI from "lil-gui";
import gsap from "gsap";
import wobbleVertexShader from "./shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "./shaders/wobble/fragment.glsl";
import styles from "../styles/main.module.css";

type SceneProps = {
  setCamera: (camera: THREE.PerspectiveCamera) => void;
  setCameraGroup: (group: THREE.Group) => void;
  currentSection: number;
  isTransitioning?: boolean;
};

const Scene: React.FC<SceneProps> = ({ setCamera, setCameraGroup, currentSection, isTransitioning = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const guiRef = useRef<GUI | null>(null);
  const guiVisibleRef = useRef<boolean>(false);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectsDistance = 10;
  const planeMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const light1Ref = useRef<THREE.DirectionalLight | null>(null);
  const light2Ref = useRef<THREE.DirectionalLight | null>(null);

  const heliLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const helicopterRef = useRef<THREE.Group | null>(null);

  // /**
  //  * gui appears when pressing 'u'
  //  */
  // if (guiRef.current) {
  //   guiRef.current.destroy();
  //   guiRef.current = null;
  // }
  // guiRef.current = new GUI({ width: 325 });
  // guiRef.current.hide();
  // const gui = guiRef.current;
  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === 'u') {
  //     if (guiRef.current) {
  //       if (guiVisibleRef.current) {
  //         guiRef.current.hide();
  //       } else {
  //         guiRef.current.show();
  //       }
  //       guiVisibleRef.current = !guiVisibleRef.current;
  //     }
  //   }
  // };
  // window.addEventListener('keydown', handleKeyDown);

  /**
   * Debug Object
   */
  const debugObject: {
    colorA: THREE.Color;
    colorB: THREE.Color;
    colorC: THREE.Color;
    colorD: THREE.Color;
    colorE: THREE.Color;
    light1Color: THREE.Color;
    light2Color: THREE.Color;
    heliLightColor: THREE.Color;
    ambientLightColor: THREE.Color;
    whiteColor: THREE.Color;
  } = {
    colorA: new THREE.Color("#EDF6F9"),
    colorB: new THREE.Color("#006D77"),
    colorC: new THREE.Color("#E29578"),
    colorD: new THREE.Color("#83C5BE"),
    colorE: new THREE.Color("#FFDDD2"),
    light1Color: new THREE.Color("#006D77"),
    light2Color: new THREE.Color("#E29578"),
    heliLightColor: new THREE.Color("#FFFFFF"),
    ambientLightColor: new THREE.Color("#FFFFFF"),
    whiteColor: new THREE.Color("#FFFFFF"),
  };

  const parameters = {
    materialColor: '#ffeded',
    elevation: 0.7,
    frequency: 2.0,
    speed: 0.5,
  }

  /**
   * Move Camera Smoothly When Section Changes
   */
  useEffect(() => {
    if (cameraGroupRef.current) {
      const targetY = -currentSection * objectsDistance;
      console.log("Current Section:", currentSection);
      
      gsap.to(cameraGroupRef.current.position, {
        y: targetY,
        duration: 2,
        ease: "power2.inOut",
      });

      // Light transitions
      if (light1Ref.current && light2Ref.current) {
        // SECTION 0 -Landing
        if (currentSection === 0) {
          // Main scene lights (on)
          gsap.to(light1Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light2Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          // Color resets
          gsap.to(light1Ref.current.color, {
            r: debugObject.light1Color.r,
            g: debugObject.light1Color.g,
            b: debugObject.light1Color.b,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light2Ref.current.color, {
            r: debugObject.light2Color.r,
            g: debugObject.light2Color.g,
            b: debugObject.light2Color.b,
            duration: 2,
            ease: "power2.inOut"
          });

          // Heli light (off)
          if (heliLightRef.current) {
            gsap.to(heliLightRef.current, {
              intensity: 0,
              duration: 2,
              ease: "power2.inOut"
            });
          }

          // Ambient light (low)
          if (ambientLightRef.current) {
            gsap.to(ambientLightRef.current, {
              intensity: 0.5,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        }
        // SECTION 1 - Helicopter
        else if (currentSection === 1) {
          // Main scene lights (dimmed)
          gsap.to(light1Ref.current, {
            intensity: 0,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light2Ref.current, {
            intensity: 0,
            duration: 2,
            ease: "power2.inOut"
          });

          // heli light (bright)
          if (heliLightRef.current) {
            gsap.to(heliLightRef.current, {
              intensity: 10,
              duration: 2,
              ease: "power2.inOut"
            });

            gsap.to(heliLightRef.current.color, {
              r: debugObject.heliLightColor.r,
              g: debugObject.heliLightColor.g,
              b: debugObject.heliLightColor.b,
              duration: 2,
              ease: "power2.inOut"
            });
          }

          // Ambient light
          if (ambientLightRef.current) {
            gsap.to(ambientLightRef.current, {
              intensity: 2,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        }
        // SECTION 2 - BoxWave
        else if (currentSection === 2) {
          // Main lights (on with different color)
          gsap.to(light1Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light2Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          // Change color of main lights
          gsap.to(light1Ref.current.color, {
            r: debugObject.light2Color.r,
            g: debugObject.light2Color.g,
            b: debugObject.light2Color.b,
            duration: 2,
            ease: "power2.inOut"
          });

          // heli light (off)
          if (heliLightRef.current) {
            gsap.to(heliLightRef.current, {
              intensity: 0,
              duration: 2,
              ease: "power2.inOut"
            });
          }

          // Ambient light (low)
          if (ambientLightRef.current) {
            gsap.to(ambientLightRef.current, {
              intensity: 0.5,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        }
        // Any other section
        else {
          // Reset to default lighting
          gsap.to(light1Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light2Ref.current, {
            intensity: 20,
            duration: 2,
            ease: "power2.inOut"
          });

          gsap.to(light1Ref.current.color, {
            r: debugObject.light1Color.r,
            g: debugObject.light1Color.g,
            b: debugObject.light1Color.b,
            duration: 2,
            ease: "power2.inOut"
          });

          if (heliLightRef.current) {
            gsap.to(heliLightRef.current, {
              intensity: 0,
              duration: 2,
              ease: "power2.inOut"
            });
          }

          if (ambientLightRef.current) {
            gsap.to(ambientLightRef.current, {
              intensity: 0.5,
              duration: 2,
              ease: "power2.inOut"
            });
          }
        }
      }
    }
  }, [currentSection, objectsDistance, debugObject.light1Color, debugObject.light2Color, debugObject.heliLightColor]);

  useEffect(() => {
    if (isTransitioning && cameraGroupRef.current) {
      gsap.to(cameraGroupRef.current.position, {
        x: "20",
        duration: 2,
        ease: "power2.inOut"
      });
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (!mountRef.current) return;

    if (guiRef.current) {
      guiRef.current.destroy();
    }

    guiRef.current = new GUI({ width: 325 });
    const gui = guiRef.current;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };

    /**
     * Scene
     */
    const scene = new THREE.Scene();

    /**
     * Camera Setup
     */
    const cameraGroup = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 15;
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    cameraGroupRef.current = cameraGroup;
    cameraRef.current = camera;
    setCamera(camera);
    setCameraGroup(cameraGroup);

    /**
     * Loaders
     */
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    /**
     * Materials and shaders
     */
    const uniforms = {
      uTime: { value: 0 },
      uPositionFrequency: { value: 0.6 },
      uTimeFrequency: { value: 0.5 },
      uStrength: { value: 0.115 },
      uWarpPositionFrequency: { value: 0.45 },
      uWarpTimeFrequency: { value: 0.2 },
      uWarpStrength: { value: 2 },
      uColorA: { value: new THREE.Color(debugObject.colorA) },
      uColorB: { value: new THREE.Color(debugObject.colorA) },
    };

    const material = new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      vertexShader: wobbleVertexShader,
      fragmentShader: wobbleFragmentShader,
      uniforms,
      metalness: 0.07,
      roughness: 0.18,
      transparent: true,
      ior: 1.8,
      transmission: 1,
      thickness: 1.6,
    });

    const planeMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.8,
      roughness: 1,
      transparent: false,
      opacity: 1,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    planeMaterialRef.current = planeMaterial;

    /**
     * Mesh
     */
    const backgroundColourPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 50),
      new THREE.MeshBasicMaterial({ color: debugObject.colorA })
    );
    backgroundColourPlane.position.z = camera.position.z - 20;
    backgroundColourPlane.position.y = camera.position.y - 15;
    scene.add(backgroundColourPlane);

    const organicBallGeometry = new THREE.IcosahedronGeometry(2.5, 100);
    const mergedGeometry = mergeVertices(organicBallGeometry);

    mergedGeometry.computeVertexNormals();
    mergedGeometry.computeTangents();

    const wobble = new THREE.Mesh(mergedGeometry, material);
    wobble.castShadow = true;
    const animatedPlaneGeometry = new THREE.PlaneGeometry(25, 8, 50, 50);

    wobble.position.y = objectsDistance * 0
    wobble.position.x = 0
    scene.add(wobble);

    const pillGeometry = new THREE.CapsuleGeometry(1.2, 1.5, 16, 32);

    const pillMaterial = new THREE.MeshStandardMaterial({
      color: 0x006D77,
      metalness: 0.1,
      roughness: 0.6
    });

    const pill = new THREE.Mesh(pillGeometry, pillMaterial);

    pill.position.set(0, 0, 0);

    scene.add(pill);

    const plane = new THREE.Mesh(animatedPlaneGeometry, planeMaterial);
    plane.position.z = 0;
    plane.position.y = - objectsDistance * 3

    scene.add(plane);
    const colors = [];
    const planePositionAttribute = animatedPlaneGeometry.attributes.position;
    for (let i = 0; i < planePositionAttribute.count; i++) {
      const x = planePositionAttribute.getX(i);
      const y = planePositionAttribute.getY(i);

      const blendX = (x + 10) / 20;
      const blendY = (y + 3.5) / 7;

      const bottomToMiddle = new THREE.Color().lerpColors(debugObject.colorC, debugObject.colorB, blendY);

      const finalColor = new THREE.Color().lerpColors(bottomToMiddle, debugObject.colorD, blendX);

      colors.push(finalColor.r, finalColor.g, finalColor.b);
    }
    animatedPlaneGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    /**
     * BoxWave
     */
    const gridSize = 99;
    const col = gridSize;
    const row = gridSize;
    const waveParams = {
      amplitude: 18,
      velocity: 0.02,
      waveLength: 100,
    };

    // colors
    const peachColor = new THREE.Color("#E29578");
    const whiteColor = new THREE.Color("#EDF6F9");
    const boxes: THREE.Object3D[][] = [];
    const angleRef = { current: 0 };

    const boxSize = 0.060;
    const spacing = boxSize * 1;

    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    boxGeometry.translate(0, boxSize / 2, 0);

    const boxMaterial = new THREE.MeshStandardMaterial({
      vertexColors: false,
      metalness: 0.4,
      roughness: 0
    });

    const radius = gridSize * 1;
    const maxPossibleBoxes = Math.ceil(Math.PI * Math.pow(radius, 2));
    const mesh = new THREE.InstancedMesh(boxGeometry, boxMaterial, maxPossibleBoxes);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const instanceColorAttribute = new THREE.InstancedBufferAttribute(
      new Float32Array(maxPossibleBoxes * 3),
      3
    );
    boxGeometry.setAttribute('instanceColor', instanceColorAttribute);

    const originalOnBeforeCompile = boxMaterial.onBeforeCompile;
    boxMaterial.onBeforeCompile = function (shader, renderer) {
      if (originalOnBeforeCompile) originalOnBeforeCompile(shader, renderer);

      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `attribute vec3 instanceColor;
        varying vec3 vInstanceColor;
        varying float vIsTopFace;
        
        void main() {
          // Determine if this is a top face (y is up in local space)
          vIsTopFace = position.y > ${boxSize * 0.9} ? 1.0 : 0.0;
          vInstanceColor = instanceColor;`
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        '#include <fog_vertex>\nvInstanceColor = instanceColor;\nvIsTopFace = vIsTopFace;'
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `varying vec3 vInstanceColor;
        varying float vIsTopFace;
        
        void main() {`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        // Use peach color for top face, white for others
        diffuseColor.rgb = mix(vec3(1.0, 1.0, 1.0), vInstanceColor, vIsTopFace);`
      );
    };

    mesh.position.set(0, -objectsDistance * 2, 0);
    mesh.rotation.x = Math.PI / 6;
    scene.add(mesh);

    let index = 0;
    let boxCount = 0;

    // Create boxes in a circular pattern
    for (let i = 0; i < col; i++) {
      boxes[i] = [];
      for (let j = 0; j < row; j++) {
        const normalizedI = (i / col) - 0.5;
        const normalizedJ = (j / row) - 0.5;

        const distanceFromCenter = Math.sqrt(normalizedI * normalizedI + normalizedJ * normalizedJ);

        if (distanceFromCenter <= 0.5) {
          const pivot = new THREE.Object3D();
          boxes[i][j] = pivot;
          pivot.scale.set(1, 0.001, 1);

          pivot.position.set(
            (normalizedI * radius * 2) * spacing,
            0,
            (normalizedJ * radius * 2) * spacing
          );

          pivot.updateMatrix();
          mesh.setMatrixAt(index, pivot.matrix);

          instanceColorAttribute.setXYZ(index, peachColor.r, peachColor.g, peachColor.b);

          index++;
          boxCount++;
        }
      }
    }

    mesh.count = boxCount;
    mesh.instanceMatrix.needsUpdate = true;
    instanceColorAttribute.needsUpdate = true;

    // BoxWave Animation Function with Color Transitions
    const animateBoxWave = () => {
      let index = 0;
      for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
          if (!boxes[i][j]) continue;

          const normalizedI = (i / col) - 0.5;
          const normalizedJ = (j / row) - 0.5;

          const distance = Math.sqrt(Math.pow(normalizedJ * radius * 2, 2) + Math.pow(normalizedI * radius * 2, 2));
          const offset = ((distance) / waveParams.waveLength) * (Math.PI * 2);
          const waveAngle = angleRef.current + offset;

          const height = Math.max(Math.sin(waveAngle) * waveParams.amplitude, 0.1);
          boxes[i][j].scale.y = height;
          boxes[i][j].updateMatrix();
          mesh.setMatrixAt(index, boxes[i][j].matrix);

          const normalizedHeight = (height / waveParams.amplitude);
          const dynamicColor = new THREE.Color(
            whiteColor.r + (peachColor.r - whiteColor.r) * normalizedHeight,
            whiteColor.g + (peachColor.g - whiteColor.g) * normalizedHeight,
            whiteColor.b + (peachColor.b - whiteColor.b) * normalizedHeight
          );
          instanceColorAttribute.setXYZ(index, dynamicColor.r, dynamicColor.g, dynamicColor.b);

          index++;
        }
      }

      mesh.instanceMatrix.needsUpdate = true;
      instanceColorAttribute.needsUpdate = true;

      angleRef.current -= waveParams.velocity;
      requestAnimationFrame(animateBoxWave);
    };

    animateBoxWave();

    /**
     * Heli with Light 
     */
    const heliLight = new THREE.DirectionalLight(debugObject.heliLightColor, 0);``
    heliLight.position.set(0, objectsDistance * 2, 10);
    heliLight.castShadow = true;

    // Configure shadow properties
    heliLight.shadow.mapSize.width = 1024;
    heliLight.shadow.mapSize.height = 1024;
    heliLight.shadow.camera.near = 0.5;
    heliLight.shadow.camera.far = 50;
    heliLight.shadow.bias = -0.001;
    heliLight.shadow.normalBias = 0.05;

    scene.add(heliLight);
    heliLightRef.current = heliLight;

    const ambientLight = new THREE.AmbientLight(debugObject.ambientLightColor, 1);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    /**
     * Helicopter Model
     */
    let helicopter: THREE.Group | null = null;
    let heliAnim: THREE.AnimationMixer | null = null;
    let rotorAction: THREE.AnimationAction | null = null;
    let tailRotorAction: THREE.AnimationAction | null = null;

    gltfLoader.load(
      './models/tigre-ec665.glb',
      (gltf) => {
        helicopter = gltf.scene;
        helicopterRef.current = helicopter;

        helicopter.scale.set(0.5, 0.5, 0.5);
        helicopter.position.set(0, -objectsDistance * 1.25, 5);
        helicopter.rotation.y = Math.PI * 0.25;

        // Add shadows
        helicopter.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(helicopter);

        // Set up helicopter animations
        if (gltf.animations && gltf.animations.length > 0) {
          heliAnim = new THREE.AnimationMixer(helicopter);
          rotorAction = heliAnim.clipAction(gltf.animations[0]);
          tailRotorAction = heliAnim.clipAction(gltf.animations[1]);
          rotorAction.play();
          tailRotorAction.play();
        }

        // Add to GUI for adjustments
        if (gui && helicopter) {
          const helicopterFolder = gui.addFolder('Helicopter');
          helicopterFolder.add(helicopter.position, 'x', -15, 15).name('Position X');
          helicopterFolder.add(helicopter.position, 'y', -20, 5).name('Position Y');
          helicopterFolder.add(helicopter.position, 'z', -10, 10).name('Position Z');
          helicopterFolder.add(helicopter.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
          helicopterFolder.add(helicopter.scale, 'x', 0.1, 5).name('Scale').onChange((value: number) => {
            helicopter!.scale.set(value, value, value);
          });
        }
      },
      (error) => {
        console.error('Error loading helicopter:', error);
      }
    );

    // Add heli light controls to GUI
    const heliFolder = gui.addFolder('heli Light');
    heliFolder.addColor(debugObject, 'heliLightColor').name('heli Color').onChange(() => {
      if (heliLightRef.current) heliLightRef.current.color.set(debugObject.heliLightColor);
    });

    heliFolder.add(heliLight, 'intensity', 0, 10).name('heli Intensity');
    heliFolder.add(heliLight.position, 'x', -10, 10).name('heli X');
    heliFolder.add(heliLight.position, 'y', -30, 10).name('heli Y');
    heliFolder.add(heliLight.position, 'z', -10, 10).name('heli Z');

    const ambientFolder = gui.addFolder('Ambient Light');
    ambientFolder.addColor(debugObject, 'ambientLightColor').name('Ambient Color').onChange(() => {
      if (ambientLightRef.current) ambientLightRef.current.color.set(debugObject.ambientLightColor);
    });

    ambientFolder.add(ambientLight, 'intensity', 0, 3).name('Ambient Intensity');

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mountRef.current.appendChild(renderer.domElement);

    /**
     * Lighting
     */
    const light1 = new THREE.DirectionalLight(debugObject.light1Color, 20);
    light1.position.set(-5, -3, 5);
    const light2 = new THREE.DirectionalLight(debugObject.light2Color, 20);
    light2.position.set(5, 3, 5);

    scene.add(light1);
    scene.add(light2);

    light1Ref.current = light1;
    light2Ref.current = light2;

    // Tweaks
    gui.add(uniforms.uPositionFrequency, 'value', 0, 2, 0.001).name('uPositionFrequency')
    gui.add(uniforms.uTimeFrequency, 'value', 0, 2, 0.001).name('uTimeFrequency')
    gui.add(uniforms.uStrength, 'value', 0, 2, 0.001).name('uStrength')
    gui.add(uniforms.uWarpPositionFrequency, 'value', 0, 2, 0.001).name('uWarpPositionFrequency')
    gui.add(uniforms.uWarpTimeFrequency, 'value', 0, 2, 0.001).name('uWarpTimeFrequency')
    gui.add(uniforms.uWarpStrength, 'value', 0, 5, 0.001).name('uWarpStrength')
    gui.addColor(debugObject, 'colorA').onChange(() => uniforms.uColorA.value.set(debugObject.colorA))
    gui.addColor(debugObject, 'colorB').onChange(() => uniforms.uColorB.value.set(debugObject.colorB))
    gui.add(material as unknown as THREE.MeshPhysicalMaterial, 'metalness', 0, 1, 0.001);
    gui.add(material as unknown as THREE.MeshPhysicalMaterial, 'roughness', 0, 1, 0.001);
    gui.add(material as unknown as THREE.MeshPhysicalMaterial, 'transmission', 0, 1, 0.001);
    gui.add(material as unknown as THREE.MeshPhysicalMaterial, 'ior', 0, 10, 0.001);
    gui.add(material as unknown as THREE.MeshPhysicalMaterial, 'thickness', 0, 10, 0.001);
    gui.add(planeMaterial, 'roughness', 0, 1, 0.001).name('planeRoughness');
    gui.add(planeMaterial, 'metalness', 0, 1, 0.001).name('planeMetalness');

    gui.add(waveParams, "amplitude", 0, 20, 0.1);
    gui.add(waveParams, "velocity", 0, 1, 0.01);
    gui.add(waveParams, "waveLength", 10, 100, 1);

    gui.add(boxMaterial, "metalness", 0, 1, 0.01);
    gui.add(boxMaterial, "roughness", 0, 1, 0.01);

    /**
     * Mouse Move for wobble distortion
     */
    const cursor = { x: 0, y: 0 };
    window.addEventListener("mousemove", (event: MouseEvent) => {
      cursor.x = ((event.clientX / sizes.width) - 0.5) * 2;
      cursor.y = -((event.clientY / sizes.height) - 0.5) * 2;

      uniforms.uStrength.value = 0.3 + cursor.y * 0.2;
      uniforms.uPositionFrequency.value = 0.5 + cursor.x * 0.2;
    });
    const handleMouseMove = (event: MouseEvent) => {
      cursor.x = (event.clientX / sizes.width - 0.5) * 2;
      cursor.y = -(event.clientY / sizes.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    /**
     * Animation Loop
     */
    const positionAttribute = animatedPlaneGeometry.attributes.position;
    const clock = new THREE.Clock();
    let previousTime = 0;

    const animate = (currentTime = 0) => {
      const deltaTime = (currentTime - previousTime) / 1000;
      previousTime = currentTime;

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        const z = Math.sin((x * parameters.frequency + elapsedTime * parameters.speed)) *
          Math.cos((y * parameters.frequency + elapsedTime * parameters.speed)) *
          parameters.elevation;

        positionAttribute.setZ(i, z);
      }
      positionAttribute.needsUpdate = true;

      const animDelta = deltaTime > 0 && deltaTime < 0.1 ? deltaTime : 0.016;

      if (heliAnim) {
        heliAnim.update(animDelta);
      }

      if (helicopter) {
        const bobAmount = Math.sin(elapsedTime * 0.5) * 0.1;
        helicopter.position.y = -objectsDistance * 1.25 + bobAmount;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(sizes.pixelRatio);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div ref={mountRef} className={styles.scene} />;
};

export default Scene;
