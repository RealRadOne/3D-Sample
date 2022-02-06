import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Camera,Scene and Renderer are three important components


const scene = new THREE.Scene();

//Perspective camera mimics what the human eyeballs can see
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//Aspect Ratio = Width/Height


//Renderer renders the actual graphics
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

    //The canvas shows our actual three.js scene
    //To run the application: npm run dev

    const geometry = new THREE.TorusGeometry(10,3,16,100);
    const material = new THREE.MeshBasicMaterial({color:0xFF6347,wireframe:true});
    const torus = new THREE.Mesh(geometry,material);

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5);
    scene.add(pointLight);

    //Ambient Light uses pointlight to light up everything

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight,ambientLight);

    //Listen to mouse position on the DOM and update camera position accordingly
    const controls = new OrbitControls(camera,renderer.domElement);

    function addStar(){
        const geometry = new THREE.SphereGeometry(0.25,24,24);
        const material = new THREE.MeshStandardMaterial({color:0xffffff});
        const star = new THREE.Mesh(geometry,material);
        //Generating stars at random locations
        const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x,y,z);
        scene.add(star);
    }
    
    Array(200).fill().forEach(addStar);

    const spaceTexture = new THREE.TextureLoader().load('galaxy.jpg');
    scene.background = spaceTexture;

    //The animation function requests the browser to perform animation

    function animate(){
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.05;
      torus.rotation.z += 0.01;
      
      controls.update();

      renderer.render(scene,camera);

    }

    animate();
    renderer.render(scene,camera);



