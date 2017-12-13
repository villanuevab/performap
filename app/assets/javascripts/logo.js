var camera, scene, renderer;
var geometry, material, mesh;

var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowHalfZ = window.innerWidth / 4;

var minDistance = 3;
var maxDistance = 50;

var group, textGeo, textMesh;

var message = "performap",
  height = 0.25,
  size = 5,
  hover = 0,

  curveSegments = 4,

  bevelThickness = 0.1,
  bevelSize = 0.1,
  bevelSegments = 3,
  bevelEnabled = true,

  fontWeight = "normal";

$(document).on("turbolinks:load", function() {
  init();
  animate();
});

function init( ) {

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  // CAMERA

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0 , 0 , 25 );

  // CONTROLS

  var controls = new THREE.OrbitControls( camera );
  controls.target.set( 0, 0, 0 );
  controls.minDistance = minDistance;
  controls.maxDistance = maxDistance;
  controls.update();

  // SCENE

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  material = new THREE.MeshNormalMaterial();

  // create group for textgeometry

  group = new THREE.Group();
  group.position.y = 1;
  scene.add( group );

  // create text using font

  var loader = new THREE.FontLoader();
  loader.load( 'assets/fonts/AmaticSC_Regular.json', function ( font ) {

    textGeo = new THREE.TextGeometry( message, {
      font: font,
      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled,

    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    textMesh = new THREE.Mesh( textGeo, material );

    var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    textMesh.position.x = centerOffset;
    textMesh.position.y = -2.5;

    group.add ( textMesh );
    group.rotateZ(0.25);

  } ); //end load function

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.querySelector('.home.logo .container').appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

} // end init

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 5;
  mouseY = (event.clientY - windowHalfY) * 5;
  mouseZ = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
  if (mouseZ < windowHalfZ * 5)
    mouseZ = mouseZ * -1;

  //console.log(event.clientX + ",", event.clientY);
  //console.log(mouseX + ", " + mouseY + ", " + mouseZ);
}

function animate() {

  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

  // lineText.rotation.x += 0.01;
  // lineText.rotation.y += 0.02;

  // text.rotation.x += 0.01;
  // text.rotation.y += 0.02;

  // text.rotateX(0.01);
  // text.rotateY(0.02);

  // lineText.rotateX(0.01);
  // lineText.rotateY(0.02);

  render();

}

function render() {
  // camera.position.x += ( mouseX - camera.position.x ) * .001;
  // camera.position.y += ( - mouseY - camera.position.y ) * .001;

  camera.position.z = clamp(camera.position.z + (mouseZ - camera.position.z) * 0.0001, 2, 50);

  // //console.log(camera.position);

  camera.lookAt( scene.position );

  renderer.render( scene, camera );
}

// clamp a number
function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}