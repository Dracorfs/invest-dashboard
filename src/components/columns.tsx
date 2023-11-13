"use client"

import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type UnitPrice = {
  initial: number,
  current: number
}
export type Investment = {
  id: string,
  ticker: string,
  type: string,
  quantity: number,
  unit_price: UnitPrice
  exchange_rate: {
      usd: number
  }
}

const FormatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number | 0)
}

const CalculateTotal = ({ row }: any, price: number) => {
  const amount = parseFloat(row.getValue('quantity'))
  const total = amount * price
  return total
}

export const columns: ColumnDef<Investment>[] = [
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unit_price",
    header: () => <div className="text-right">Initial purchase value</div>,
    cell: ({ row }) => {
      const unit_price: UnitPrice = row.getValue('unit_price')
      return <div className="text-right font-medium">{FormatCurrency(unit_price.initial)}</div>
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total purchase value</div>,
    cell: ({ row }) => {
      const unit_price: UnitPrice = row.getValue('unit_price')
      const total = CalculateTotal({row}, unit_price.initial)
      const formatted = FormatCurrency(total)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "current_value_ars",
    header: () => <div className="text-right">Current value ARS</div>,
    cell: ({ row }) => {
      const unit_price: UnitPrice = row.getValue('unit_price')
      const formatted = FormatCurrency(unit_price.current)
      
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total_pesos",
    header: () => <div className="text-right">Total ARS</div>,
    cell: ({ row }) => {
      const unit_price: UnitPrice = row.getValue('unit_price')
      const total = CalculateTotal({row}, unit_price.current)
      const formatted = FormatCurrency(total)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "exchange_rate",
    header: () => <div className="text-right">Current value USD</div>,
    cell: ({ row }) => {
      const unit_price: UnitPrice = row.getValue('unit_price')
      const ARS = CalculateTotal({row}, unit_price.current)

      const exchange_rate: { usd: number } = row.getValue("exchange_rate")

      const total = ARS / exchange_rate.usd
      const formatted = FormatCurrency(total)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "delta_ars",
    header: () => <div className="text-right">Delta ARS</div>,
    cell: ({ row }) => {
      // Delta Pesos = Total ARS - Total purchase value

      const unit_price: UnitPrice = row.getValue('unit_price')
      const current = CalculateTotal({row}, unit_price.current)
      const initial = CalculateTotal({row}, unit_price.initial)
      const total = current - initial
      const formatted = FormatCurrency(total)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "growth",
    header: () => <div className="text-right">Growth</div>,
    cell: ({ row }) => {
      // % crecimiento = Tenencia total pesos / Valor total compra - 1

      const unit_price: UnitPrice = row.getValue('unit_price')
      const initial = CalculateTotal({row}, unit_price.initial)
      const current = CalculateTotal({row}, unit_price.current)
      const subtotal = (current - initial) / initial
      const total = subtotal * 100
      
      return <div className="text-right font-medium">{total.toFixed(2)} %</div>
    },
  }
]