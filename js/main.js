var scene, camera, renderer;
var geometry, material, mesh;
var BLUE = 0x42affa;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 30;

    // geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3( -0.5,  -0.5, 0 ),
    //     new THREE.Vector3( 0.5, -0.5, 0 ),
    //     new THREE.Vector3(  0, 0.5, 0 )
    // );
    // geometry.faces.push(
    //     new THREE.Face3( 0, 1, 2 )
    // );

    geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        -0.5,  -0.5, 0,
        0.5, -0.5, 0,
        0, 0.5, 0
    ] );
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    var indices = new Uint32Array( [
        0, 1, 2
    ] );
    geometry.setIndex(  new THREE.BufferAttribute( indices, 1 ) );
    var colors = new Float32Array( indices.length * 3 );
    for ( var i = 0, i3 = 0, len = indices.length; i < len; i++, i3 += 3 ) {
        colors[ i3 + 0 ] = Math.random();
        colors[ i3 + 1 ] = Math.random();
        colors[ i3 + 2 ] = Math.random();
    }
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    // material = new THREE.MeshBasicMaterial( { color: BLUE } );

    material = new THREE.ShaderMaterial( {
        uniforms: {
            color: { value: new THREE.Color( 0x00ff00 ) }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x222222, 1);
    renderer.setSize( window.innerWidth, window.innerHeight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    document.querySelector('.webgl').appendChild( renderer.domElement );

    animate();

}

function animate() {

    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.01;

    renderer.render( scene, camera );
}
