import * as THREE from 'three'
import orbit from "three-orbit-controls";
import {createData} from "./examples";

let renderer;
let camera;
let scene;

// once everything is loaded, we run our Three.js stuff.
function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(50, 80, 130);
    camera.lookAt(0, 0, 0);

    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const grid = new THREE.GridHelper(200, 10);
    scene.add(grid);

    // show axes in the screen
    const axes = new THREE.AxisHelper(100);
    axes.position.set(0, 0, 0);
    scene.add(axes);

    const OrbitControls = orbit(THREE);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // draw dot list
    draw(scene);

    // render the scene
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}

function draw(scene) {
    // const res = createData("4.3.3");
    // const geom = new THREE.Geometry();
    // const material = new THREE.PointsMaterial({color: 0x7777ff, size: 1, sizeAttenuation: false});
    // for(var i = 0; i < res.length; i++) {
    //   geom.vertices.push(new THREE.Vector3(res[i][0], res[i][1], res[i][2]));
    // }
    // scene.add(new THREE.Points(geom, material))

    const res2 = createData("4.3.10");
    const geom2 = new THREE.Geometry();
    const material2 = new THREE.PointsMaterial({color: 0xffffff, size: 2, sizeAttenuation: false});
    for(var i = 0; i < res2.length; i++) {
        geom2.vertices.push(new THREE.Vector3(res2[i][0], res2[i][1], res2[i][2]));
    }
    scene.add(new THREE.Points(geom2, material2))

    const res3 = createData("4.3.11");
    const geom3 = new THREE.Geometry();
    const material3 = new THREE.PointsMaterial({color: 0xa9a9a9, size: 1, sizeAttenuation: false});
    for(var i = 0; i < res3.length; i++) {
        geom3.vertices.push(new THREE.Vector3(res3[i][0], res3[i][1], res3[i][2]));
    }
    scene.add(new THREE.Points(geom3, material3))
}

window.onload = function() {
    init();
    animate();
};

window.onresize = function() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}