import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import './Hyperspeed.css';

interface HyperspeedProps {
  effectOptions?: {
    colors?: {
      roadColor?: number;
      islandColor?: number;
      background?: number;
      shoulderLines?: number;
      brokenLines?: number;
      leftCars?: number[];
      rightCars?: number[];
      sticks?: number;
    };
  };
}

const Hyperspeed = ({
  effectOptions = {
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  }
}: HyperspeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cars: THREE.Mesh[];
    lights: THREE.Mesh[];
    speed: number;
    targetSpeed: number;
    mouseX: number;
    mouseY: number;
    targetX: number;
    targetY: number;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(effectOptions.colors?.background || 0x000000, 50, 500);

    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(effectOptions.colors?.background || 0x000000, 0.8);
    container.appendChild(renderer.domElement);

    // Create road
    const roadGeometry = new THREE.PlaneGeometry(20, 1000);
    const roadMaterial = new THREE.MeshBasicMaterial({
      color: effectOptions.colors?.roadColor || 0x080808
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0;
    scene.add(road);

    // Create road lines
    const lineGeometry = new THREE.PlaneGeometry(0.2, 1000);
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: effectOptions.colors?.brokenLines || 0x131318
    });
    
    // Center line
    const centerLine = new THREE.Mesh(lineGeometry, lineMaterial);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, 0.01, 0);
    scene.add(centerLine);

    // Side lines
    const leftLine = new THREE.Mesh(lineGeometry, lineMaterial);
    leftLine.rotation.x = -Math.PI / 2;
    leftLine.position.set(-8, 0.01, 0);
    scene.add(leftLine);

    const rightLine = new THREE.Mesh(lineGeometry, lineMaterial);
    rightLine.rotation.x = -Math.PI / 2;
    rightLine.position.set(8, 0.01, 0);
    scene.add(rightLine);

    // Create cars
    const cars: THREE.Mesh[] = [];
    const totalCars = 30;
    
    for (let i = 0; i < totalCars; i++) {
      const carGeometry = new THREE.BoxGeometry(1, 0.3, 2);
      const isLeftLane = Math.random() > 0.5;
      const colors = isLeftLane 
        ? effectOptions.colors?.leftCars || [0xd856bf, 0x6750a2, 0xc247ac]
        : effectOptions.colors?.rightCars || [0x03b3c3, 0x0e5ea5, 0x324555];
      
      const carMaterial = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)]
      });
      
      const car = new THREE.Mesh(carGeometry, carMaterial);
      car.position.set(
        isLeftLane ? -4 + Math.random() * 2 : 4 - Math.random() * 2,
        0.2,
        Math.random() * -100 - 20
      );
      
      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(1.2, 0.4, 2.2);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: car.material.color,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      car.add(glow);
      
      scene.add(car);
      cars.push(car);
    }

    // Create side lights
    const lights: THREE.Mesh[] = [];
    const totalLights = 40;
    
    for (let i = 0; i < totalLights; i++) {
      const lightGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: effectOptions.colors?.sticks || 0x03b3c3,
        emissive: effectOptions.colors?.sticks || 0x03b3c3,
        emissiveIntensity: 0.3
      });
      
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(
        Math.random() > 0.5 ? 12 : -12,
        1.5,
        Math.random() * -200 - 10
      );
      
      scene.add(light);
      lights.push(light);
    }

    // Animation state
    let speed = 0;
    let targetSpeed = 1;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetX = mouseX * 2;
      targetY = mouseY * 1;
    };

    // Mouse speed up on click
    const handleMouseDown = () => {
      targetSpeed = 3;
    };

    const handleMouseUp = () => {
      targetSpeed = 1;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      // Smooth speed transition
      speed += (targetSpeed - speed) * 0.02;

      // Mouse parallax effect
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (5 + targetY - camera.position.y) * 0.05;

      // Animate cars
      cars.forEach((car) => {
        car.position.z += speed * 0.5;
        if (car.position.z > 20) {
          car.position.z = Math.random() * -100 - 100;
          car.position.x = Math.random() > 0.5 
            ? -4 + Math.random() * 2 
            : 4 - Math.random() * 2;
        }
      });

      // Animate side lights
      lights.forEach((light) => {
        light.position.z += speed * 0.3;
        if (light.position.z > 20) {
          light.position.z = Math.random() * -200 - 100;
        }
      });

      // Road movement effect
      road.position.z += speed * 0.1;
      if (road.position.z > 100) {
        road.position.z = 0;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      cars,
      lights,
      speed,
      targetSpeed,
      mouseX,
      mouseY,
      targetX,
      targetY,
      cleanup
    };

    return cleanup;
  }, [effectOptions]);

  return (
    <div className="hyperspeed-container">
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Hyperspeed;