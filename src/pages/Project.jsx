import { Navigate, useParams } from 'react-router-dom'
import ProjectIara from './ProjectIara.jsx'
import ProjectBar from './ProjectBar.jsx'
import ProjectHinge from './ProjectHinge.jsx'
import ProjectAfreen from './ProjectAfreen.jsx'
import ProjectBijoi from './ProjectBijoi.jsx'

const map = {
  'my-coworker-isn-t-real': ProjectIara,
  'a-bar-that-argues-back': ProjectBar,
  'i-puthinge-on-trial': ProjectHinge,
  'afreen-fashion-magazine': ProjectAfreen,
  'rangat-e-ajrakh-bijoi-catalogue': ProjectBijoi,
}

export default function Project() {
  const { slug } = useParams()
  const Page = map[slug]
  return Page ? <Page /> : <Navigate to="/work" replace />
}
