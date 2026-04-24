import type { DebtRecord, ParsedDebtInput } from '../types/debt'

const mockDebtRecords: DebtRecord[] = [
  {
    id: '1',
    customerName: 'Kiran',
    amount: 500,
    type: 'debt',
    createdAt: '2026-04-24T09:30:00.000Z',
    note: 'Groceries',
  },
  {
    id: '2',
    customerName: 'Ravi',
    amount: 300,
    type: 'debt',
    createdAt: '2026-04-23T12:15:00.000Z',
    note: 'Monthly items',
  },
  {
    id: '3',
    customerName: 'Kiran',
    amount: 200,
    type: 'credit',
    createdAt: '2026-04-22T16:40:00.000Z',
    note: 'Part payment',
  },
  {
    id: '4',
    customerName: 'Sita',
    amount: 650,
    type: 'debt',
    createdAt: '2026-04-21T08:05:00.000Z',
    note: 'Family pack',
  },
]

export async function fetchDebtRecords(): Promise<DebtRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return mockDebtRecords
}

export function getKnownCustomerNames(): string[] {
  return [...new Set(mockDebtRecords.map((record) => record.customerName))]
}

export async function parseVoiceTranscript(
  transcript: string,
): Promise<ParsedDebtInput> {
  await new Promise((resolve) => setTimeout(resolve, 350))

  const amountMatch = transcript.match(/(\d+(?:\.\d+)?)/)
  const lower = transcript.toLowerCase()
  const type = lower.includes('credit')
    ? 'credit'
    : lower.includes('debt') || lower.includes('taken')
      ? 'debt'
      : null

  const knownNames = getKnownCustomerNames()
  const matchedName =
    knownNames.find((name) => lower.includes(name.toLowerCase())) ?? ''

  const warnings: string[] = []
  if (!matchedName) warnings.push('Could not confidently detect customer name.')
  if (!amountMatch) warnings.push('Could not detect amount.')
  if (!type) warnings.push('Could not detect type (credit/debt).')

  return {
    name: matchedName,
    amount: amountMatch ? Number(amountMatch[1]) : null,
    type,
    warnings,
  }
}
