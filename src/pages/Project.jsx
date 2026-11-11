import { Navigate, useParams } from 'react-router-dom'
import ProjectIara from './ProjectIara.jsx'
import ProjectAfreen from './ProjectAfreen.jsx'
import ProjectBijoi from './ProjectBijoi.jsx'
import ProjectCatalogue from './ProjectCatalogue.jsx'

const map = {
  'ai-catalogue-studio': ProjectCatalogue,
  'afreen-fashion-magazine': ProjectAfreen,
  'rangat-e-ajrakh-bijoi-catalogue': ProjectBijoi,
  'my-coworker-isn-t-real': ProjectIara,
}

export default function Project() {
  const { slug } = useParams()
  const Page = map[slug]
  return Page ? <Page /> : <Navigate to="/work" replace />
}
