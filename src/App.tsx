import { useRoutes } from "react-router-dom"
import { useFinancialData } from '@/hooks/useFinancialData'
import { FinancialDataTable } from "@/components/financial-data-table"
import { TableSkeleton } from "@/components/table-skeleton"

const routes = [{ path: "/", element: <Home /> }]

function Home() {
  const { data, loading, error } = useFinancialData()

  if (loading) {
    return (
      <section className="container max-w-full px-2 py-4 md:px-4 md:py-8">
        <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">Apple Financial Data</h1>
        <TableSkeleton />
      </section>
    )
  }

  if (error) {
    return <div className="container px-2 py-4 text-red-500 md:px-4 md:py-8">Error: {error.message}</div>
  }

  return (
    <section className="container max-w-full px-2 py-4 md:px-4 md:py-8">
      <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">Apple Financial Data</h1>
      <FinancialDataTable data={data} />
    </section>
  )
}

function App() {
  const children = useRoutes(routes)

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}

export default App
