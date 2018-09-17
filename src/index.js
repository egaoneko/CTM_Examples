import * as THREE from 'three'
import * as math from "mathjs";
import orbit from "three-orbit-controls";

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
  const A = math.transpose([
        [ 1, 0, 1.65 ],
        [ 0, 1, 1 ]
    ]);

    const tmpX = [];
    for(let i = -5; i < 5; i+=0.2) {
        for(let j = -5; j < 5; j+=0.2) {
            tmpX.push([ i, j ]);
        }
    }

    const X = math.transpose(tmpX);
    const res = math.transpose(math.multiply(A, X));

    const geom = new THREE.Geometry();
    const material = new THREE.PointsMaterial({color: 0x7777ff, size: 1, sizeAttenuation: false});

    for(var i = 0; i < res.length; i++) {
      geom.vertices.push(new THREE.Vector3(res[i][0], res[i][1], res[i][2]));
    }

    const cloud = new THREE.Points(geom, material);
    scene.add(cloud)
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