import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
  } from "@tanstack/react-table"
  import { useState } from "react"
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
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      },
    })
  
    return (
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
    )
  }