import { useRoutes } from "react-router-dom"
import { useFinancialData } from '@/hooks/useFinancialData'
import { FinancialDataTable } from "@/components/financial-data-table"
import { TableSkeleton } from "@/components/table-skeleton"

const routes = [{ path: "/", element: <Home /> }]

function Home() {
  const { data, loading, error } = useFinancialData()

  if (loading) {
    return (
      <section className="container py-8">
        <h1 className="mb-6 text-3xl font-bold">Apple Financial Data</h1>
        <TableSkeleton />
      </section>
    )
  }

  if (error) {
    return <div className="container py-8 text-red-500">Error: {error.message}</div>
  }

  return (
    <section className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Apple Financial Data</h1>
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
