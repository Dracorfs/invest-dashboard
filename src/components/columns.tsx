"use client"

import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  ticker: string
  type: string
  amount: number
  initial_price: number
  total_price: number
  peso_value: number
  total_pesos: number
  dollar_value: number
  delta_pesos: number
  growth: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "type",
    header: "Tipo de instrumento",
  },
  {
    accessorKey: "amount",
    header: "Cantidad de instrumentos",
  },
  {
    accessorKey: "initial_price",
    header: () => <div className="text-right">Valor compra inicial</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("initial_price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format((amount) | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Valor total compra</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const price = parseFloat(row.getValue("initial_price"))
      const total = amount * price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "peso_value",
    header: () => <div className="text-right">Valor hoy Peso</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("peso_value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total_pesos",
    header: () => <div className="text-right">Tenencia total pesos</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const price = parseFloat(row.getValue("peso_value"))
      const total = amount * price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "dollar_value",
    header: () => <div className="text-right">Valor hoy dolar</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("dollar_value"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "delta_pesos",
    header: () => <div className="text-right">Delta Pesos</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("delta_pesos"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount | 0)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "growth",
    header: "Crecimiento",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("growth"))
 
      return <div className="text-right font-medium">{amount} %</div>
    },
  }
]