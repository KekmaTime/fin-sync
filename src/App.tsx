import { useRoutes } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFinancialData } from '@/hooks/useFinancialData'

const routes = [{ path: "/", element: <Home /> }]

function Home() {
  const { data, loading, error } = useFinancialData()

  if (loading) {
    return <div className="container py-8">Loading...</div>
  }

  if (error) {
    return <div className="container py-8 text-red-500">Error: {error.message}</div>
  }

  return (
    <section className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Apple Financial Data</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Net Income</TableHead>
              <TableHead>Gross Profit</TableHead>
              <TableHead>EPS</TableHead>
              <TableHead>Operating Income</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell>${(item.revenue / 1e9).toFixed(2)}B</TableCell>
                <TableCell>${(item.netIncome / 1e9).toFixed(2)}B</TableCell>
                <TableCell>${(item.grossProfit / 1e9).toFixed(2)}B</TableCell>
                <TableCell>${item.eps.toFixed(2)}</TableCell>
                <TableCell>${(item.operatingIncome / 1e9).toFixed(2)}B</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
