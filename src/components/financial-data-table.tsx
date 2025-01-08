import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
  } from "@tanstack/react-table"
  import { useState, useMemo } from "react"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { ArrowUpDown } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { DataFilters } from "./DataFilters"
  
  interface FinancialData {
    date: string
    revenue: number
    netIncome: number
    grossProfit: number
    eps: number
    operatingIncome: number
  }
  
  const columns: ColumnDef<FinancialData>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "revenue",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("revenue"))
        return `$${(amount / 1e9).toFixed(2)}B`
      },
    },
    {
      accessorKey: "netIncome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Net Income
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("netIncome"))
        return `$${(amount / 1e9).toFixed(2)}B`
      },
    },
    {
      accessorKey: "grossProfit",
      header: "Gross Profit",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("grossProfit"))
        return `$${(amount / 1e9).toFixed(2)}B`
      },
    },
    {
      accessorKey: "eps",
      header: "EPS",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("eps"))
        return `$${amount.toFixed(2)}`
      },
    },
    {
      accessorKey: "operatingIncome",
      header: "Operating Income",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("operatingIncome"))
        return `$${(amount / 1e9).toFixed(2)}B`
      },
    },
  ]
  
  export function FinancialDataTable({ data }: { data: FinancialData[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [yearRange, setYearRange] = useState({ start: "", end: "" })
    const [revenueRange, setRevenueRange] = useState({ min: "", max: "" })
    const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" })
  
    // Calculate min/max values from data
    const yearBounds = useMemo(() => {
      const years = data.map(item => new Date(item.date).getFullYear())
      return {
        min: Math.min(...years),
        max: Math.max(...years)
      }
    }, [data])
  
    const revenueBounds = useMemo(() => {
      const revenues = data.map(item => item.revenue / 1e9)
      return {
        min: Math.floor(Math.min(...revenues)),
        max: Math.ceil(Math.max(...revenues))
      }
    }, [data])
  
    const netIncomeBounds = useMemo(() => {
      const netIncomes = data.map(item => item.netIncome / 1e9)
      return {
        min: Math.floor(Math.min(...netIncomes)),
        max: Math.ceil(Math.max(...netIncomes))
      }
    }, [data])
  
    const filteredData = useMemo(() => {
      return data.filter(item => {
        const year = new Date(item.date).getFullYear()
        const revenue = item.revenue / 1e9
        const netIncome = item.netIncome / 1e9
  
        const yearMatch = (!yearRange.start || year >= parseInt(yearRange.start)) &&
          (!yearRange.end || year <= parseInt(yearRange.end))
  
        const revenueMatch = (!revenueRange.min || revenue >= parseFloat(revenueRange.min)) &&
          (!revenueRange.max || revenue <= parseFloat(revenueRange.max))
  
        const netIncomeMatch = (!netIncomeRange.min || netIncome >= parseFloat(netIncomeRange.min)) &&
          (!netIncomeRange.max || netIncome <= parseFloat(netIncomeRange.max))
  
        return yearMatch && revenueMatch && netIncomeMatch
      })
    }, [data, yearRange, revenueRange, netIncomeRange])
  
    const table = useReactTable({
      data: filteredData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      }
    })
  
    return (
      <div className="space-y-4">
        <DataFilters
          onYearChange={setYearRange}
          onRevenueChange={setRevenueRange}
          onNetIncomeChange={setNetIncomeRange}
          yearBounds={yearBounds}
          revenueBounds={revenueBounds}
          netIncomeBounds={netIncomeBounds}
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }