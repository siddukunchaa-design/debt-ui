export type DebtType = 'debt' | 'credit'

export interface DebtRecord {
  id: string
  customerName: string
  amount: number
  type: DebtType
  createdAt: string
  note?: string
}

export interface ParsedDebtInput {
  name: string
  amount: number | null
  type: DebtType | null
  warnings: string[]
}
