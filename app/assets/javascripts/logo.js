var camera, scene, renderer;
var geometry, material, mesh;
var text, lineText;

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
  camera.position.set( 0 , 0 , 10 );

  // CONTROLS

  var controls = new THREE.OrbitControls( camera );
  controls.target.set( 0, 0, 0 );
  controls.update();

  // SCENE

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  // create cube

  geometry = new THREE.BoxGeometry( 1,1,1 );
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // create group for textgeometry

  group = new THREE.Group();
  group.position.y = 1;
  scene.add( group );

  // create text using font

  var loader = new THREE.FontLoader();
  loader.load( 'assets/fonts/AmaticSC_Regular.json', function ( font ) {

    var xMid;
    var textShape = new THREE.BufferGeometry();
    var color = 0x006699;

    var matDark = new THREE.LineBasicMaterial( {
      color: color,
      side: THREE.DoubleSide
    } );

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    var shapes = font.generateShapes( message, 2, 2 );

    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    textShape.fromGeometry( geometry );

    text = new THREE.Mesh( textShape, matLite );
    text.position.z = - 5;
    scene.add( text );

    // make line shape ( N.B. edge view remains visible )

    var holeShapes = [];

    for ( var i = 0; i < shapes.length; i ++ ) {
      var shape = shapes[ i ];
      if ( shape.holes && shape.holes.length > 0 ) {
        for ( var j = 0; j < shape.holes.length; j ++ ) {
          var hole = shape.holes[ j ];
          holeShapes.push( hole );
        }
      }
    }

    shapes.push.apply( shapes, holeShapes );

    lineText = new THREE.Object3D();

    for ( var i = 0; i < shapes.length; i ++ ) {
      var shape = shapes[ i ];

      var points = shape.getPoints();
      var geometry = new THREE.BufferGeometry().setFromPoints( points );

      geometry.translate( xMid, 0, 0 );

      var lineMesh = new THREE.Line( geometry, matDark );
      lineText.add( lineMesh );
    }

    scene.add( lineText );

    // make text geometry

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

    group.add ( textMesh );

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

function animate() {

  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

  lineText.rotation.x += 0.01;
  lineText.rotation.y += 0.02;

  text.rotation.x += 0.01;
  text.rotation.y += 0.02;

  // text.rotateX(0.01);
  // text.rotateY(0.02);

  // lineText.rotateX(0.01);
  // lineText.rotateY(0.02);

  render();

}

function render() {
  renderer.render( scene, camera );
}