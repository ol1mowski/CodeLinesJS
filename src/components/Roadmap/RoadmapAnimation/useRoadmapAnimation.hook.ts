import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

export const useRoadmapAnimation = (containerRef: RefObject<HTMLDivElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setClearColor(0x000000, 0);

    const mapGroup = new THREE.Group();

    const createMapPoint = (x: number, y: number, z: number, size: number, color: string) => {
      const geometry = new THREE.IcosahedronGeometry(size, 1);
      const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        shininess: 90,
      });
      const point = new THREE.Mesh(geometry, material);
      point.position.set(x, y, z);
      return point;
    };

    const points = [
      createMapPoint(-8, -8, 0, 1, "#f472b6"),
      createMapPoint(-4, -4, 0, 1.2, "#e879f9"),
      createMapPoint(0, 0, 0, 1.4, "#d946ef"),
      createMapPoint(4, 4, 0, 1.2, "#c026d3"),
      createMapPoint(8, 8, 0, 1, "#a21caf"),
    ];

    points.forEach((point, i) => {
      mapGroup.add(point);
      
      if (i < points.length - 1) {
        const nextPoint = points[i + 1];
        const direction = new THREE.Vector3().subVectors(nextPoint.position, point.position);
        const distance = direction.length();
        
        const connection = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, distance, 8),
          new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
          })
        );
        
        connection.position.copy(point.position);
        connection.position.add(direction.multiplyScalar(0.5));
        connection.lookAt(nextPoint.position);
        connection.rotateX(Math.PI / 2);
        
        mapGroup.add(connection);
      }
    });

    scene.add(mapGroup);

    const lights = [
      new THREE.PointLight("#f472b6", 2),
      new THREE.PointLight("#e879f9", 2),
      new THREE.PointLight("#d946ef", 2),
    ];

    lights.forEach((light, i) => {
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 20,
        Math.sin(i * Math.PI * 2 / 3) * 20,
        15
      );
      scene.add(light);
    });

    scene.add(new THREE.AmbientLight("#ffffff", 0.5));

    camera.position.z = 30;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);

      mapGroup.rotation.y += 0.002;
      mapGroup.rotation.x = mousePosition.current.y * 0.2;
      mapGroup.rotation.z = mousePosition.current.x * 0.2;

      points.forEach((point, i) => {
        const time = Date.now() * 0.001 + i;
        point.scale.setScalar(1 + Math.sin(time) * 0.1);
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return canvasRef;
}; 