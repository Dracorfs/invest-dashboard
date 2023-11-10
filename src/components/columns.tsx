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

const FormatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number | 0)
}

const CalculateTotalARS = ({ row }: any) => {
  const amount = parseFloat(row.getValue("amount"))
  const price = parseFloat(row.getValue("peso_value"))
  const total = FormatCurrency(amount * price)
  return total
}

const CalculateTotalUSD = ({ row }: any) => {
  const amount = parseFloat(row.getValue("amount"))
  const price = parseFloat(row.getValue("initial_price"))
  const total = FormatCurrency(amount * price)
  return total
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
      return <div className="text-right font-medium">{FormatCurrency(amount)}</div>
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Valor total compra</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{CalculateTotalUSD({row})}</div>
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
      return <div className="text-right font-medium">{CalculateTotalARS({row})}</div>
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
      const pesos = parseFloat(CalculateTotalARS({row}))
      const usd = parseFloat(row.getValue("total_price"))
      const total = pesos - usd
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total | 0)
 
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