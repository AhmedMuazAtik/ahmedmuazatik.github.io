import { useGLTF } from '@react-three/drei'
import { ResumeModel } from './ResumeModel'

export function Pillar(setPdfPath, ...props) {
  const { nodes, materials } = useGLTF('/pillar.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.statue.geometry} material={materials.statue} />
      <mesh geometry={nodes.resumetext.geometry} material={materials.resumetext} />
      <mesh geometry={nodes.ozgecmis.geometry} material={materials.ozgecmis} />
      <mesh geometry={nodes.resume.geometry} material={materials.resume} />
      <mesh geometry={nodes.ozgecmistext.geometry} material={materials.ozgecmistext} />

      <ResumeModel onBookClick={(path) => setPdfPath(path)} scale={[5, 5, 5]} />
    </group>
  )
}

useGLTF.preload('/pillar.glb')
