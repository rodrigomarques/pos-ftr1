import NewLinkComponent from './../../components/NewLink'
import Header from './../../components/Header'
import ListLink from './../../components/ListLink'
import RedirectPage from '../Redirect'

export default function Home() {

  const path = window.location.pathname
  const pageParam = path === '/' ? '' : path.slice(1)

  if (pageParam != undefined && pageParam != '') {
    return <RedirectPage shortCode={pageParam} />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto ">
        <Header />

        <div className="flex flex-col md:flex-row gap-6">
          <NewLinkComponent />

          <ListLink />
        </div>
      </div>
    </div>
  )
}