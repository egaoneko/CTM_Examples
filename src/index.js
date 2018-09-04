import * as THREE from 'three'
import * as math from "mathjs";

// once everything is loaded, we run our Three.js stuff.
function init() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // draw dot list
    draw(scene);

    // render the scene
    renderer.render(scene, camera);
}

function draw(scene) {
    var A = math.transpose([
        [ 1, 0, 1.65 ],
        [ 0, 1, 1 ]
    ]);

    var tmpX = [];
    for(var i = -5; i < 5; i+=0.2) {
        for(var j = -5; j < 5; j+=0.2) {
            tmpX.push([ i, j ]);
        }
    }

    var X = math.transpose(tmpX);
    var res = math.transpose(math.multiply(A, X));

    for(var i = 0; i < res.length; i++) {
        console.log(res[i][0], res[i][1], res[i][2]);

        var dotGeometry = new THREE.Geometry();
        dotGeometry.vertices.push(new THREE.Vector3(res[i][0], res[i][1], res[i][2]));
        var dotMaterial = new THREE.PointsMaterial({color: 0x7777ff, size: 1, sizeAttenuation: false});
        var dot = new THREE.Points(dotGeometry, dotMaterial);
        scene.add(dot)
    }
}

window.onload = init;