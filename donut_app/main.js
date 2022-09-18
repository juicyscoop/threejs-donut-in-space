import './style.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )

camera.position.setZ(30);
renderer.render(scene, camera)


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} )
const torus = new THREE.Mesh( geometry, material )


const ambientLight = new THREE.PointLight(0xffffff)
const pointLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(5,5,5)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)
scene.add( lightHelper )

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial( {color: 0xaaaaff })
  const star = new THREE.Mesh( geometry, material )

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set( x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space1.jpg')
// console.log(spaceTexture)
scene.background = spaceTexture

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const donutTexture = new THREE.TextureLoader().load('donut.jpg')
const normalTexture = new THREE.TextureLoader().load('normalTexture.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  } )
)

const donut = new THREE.Mesh(
  new THREE.TorusGeometry( 10, 3, 16, 100 ),
  new THREE.MeshStandardMaterial( {
    map: donutTexture,
    normalMap: normalTexture
  } )
)
scene.add(donut)

moon.position.z = 30
moon.position.setX(-10)


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05
  moon.rotation.x += 0.075
  moon.rotation.x += 0.055

}

document.body.onscroll = moveCamera

scene.add(moon)

function animate() {
  requestAnimationFrame( animate );

  donut.rotation.x += 0.01;
  donut.rotation.y += 0.005;
  donut.rotation.z += 0.01;

  controls.update()

  renderer.render( scene, camera );

}

animate()


