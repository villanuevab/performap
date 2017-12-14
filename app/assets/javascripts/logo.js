var camera, scene, renderer;
var geometry, material, mesh;

var defaultXPosition = 0,
  defaultYPosition = 0,
  defaultZPosition = 15;

var mouseX = 0,
  mouseY = 0,
  mouseZ = 0;

var movement = 0.05;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowInnerZ = window.innerWidth / 3;

var minDistance = 3;
var maxDistance = 15;

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

  // CAMERA

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( defaultXPosition, defaultYPosition, defaultZPosition );

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
  if (document.querySelector('.home.directory .container')) {
    document.querySelector('.home.directory .container').appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // $(document).mousestop(onDocumentMouseStop);
  }
} // end init

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseStop(event) {

  mouseX = 5;
  mouseY = 5;
  mouseZ = 5;

}

function onDocumentMouseMove(event) {

  mouseX = (event.clientX - windowHalfX) * 5;
  mouseY = (event.clientY - windowHalfY) * 5;
  mouseZ = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
  if (mouseZ < windowInnerZ * 5)
    mouseZ = mouseZ * -1;

}

function animate() {

  requestAnimationFrame( animate );

  render();

}

function moveTowardDefaultPosition() {

  if (Math.abs(camera.position.x - defaultXPosition) < movement)
    camera.position.x = defaultXPosition;
  else
    camera.position.x += -1 * Math.sign(camera.position.x) * movement;

  if (Math.abs(camera.position.y - defaultYPosition) < movement)
    camera.position.y = defaultYPosition;
  else
    camera.position.y += -1 * Math.sign(camera.position.y) * movement;

  if (Math.abs(camera.position.z - defaultZPosition) < movement)
    camera.position.z = defaultZPosition;
  else {
    if (camera.position.z > defaultZPosition)
      camera.position.z -= movement;
    else
      camera.position.z += movement;
  }

}

function render() {

  var time = Date.now() * 0.001;

  var rx = Math.sin( time * 0.7 ) * 0.5,
    ry = Math.sin( time * 0.3 ) * 0.5,
    rz = Math.sin( time * 0.2 ) * 0.5;

  camera.position.x = clamp(camera.position.x + ( mouseX - camera.position.x ) * .00001, -1 * maxDistance, maxDistance);
  camera.position.y = clamp(camera.position.y + ( - mouseY - camera.position.y ) * .00001, -1 * maxDistance, maxDistance);
  camera.position.z = clamp(camera.position.z + (mouseZ - camera.position.z) * 0.00005, minDistance, maxDistance);

  // moveTowardDefaultPosition();

  camera.lookAt( scene.position );

  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;

  renderer.render( scene, camera );

}

function clamp(num, min, max) {

  return num <= min ? min : num >= max ? max : num;

}