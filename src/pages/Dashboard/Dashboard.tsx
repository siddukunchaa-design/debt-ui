import AddIcon from '@mui/icons-material/Add'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchDebtRecords } from '../../services/mockDebtService'
import type { DebtRecord } from '../../types/debt'

export default function Dashboard() {
  const navigate = useNavigate()
  const [records, setRecords] = useState<DebtRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')

  useEffect(() => {
    async function loadRecords() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchDebtRecords()
        setRecords(response)
      } catch {
        setError('Failed to load debt records.')
      } finally {
        setLoading(false)
      }
    }

    loadRecords()
  }, [])

  const sortedRecords = useMemo(() => {
    const sorted = [...records].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

    return sortOrder === 'desc' ? sorted.reverse() : sorted
  }, [records, sortOrder])

  const summary = useMemo(() => {
    const totalOwed = records
      .filter((record) => record.type === 'debt')
      .reduce((sum, record) => sum + record.amount, 0)

    const totalReceived = records
      .filter((record) => record.type === 'credit')
      .reduce((sum, record) => sum + record.amount, 0)

    return {
      totalOwed,
      totalReceived,
      netBalance: totalOwed - totalReceived,
    }
  }, [records])

  function formatCurrency(amount: number) {
    return `Rs ${amount.toLocaleString()}`
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/chat')}
        >
          Add
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {[
          { label: 'Total Owed', value: summary.totalOwed },
          { label: 'Total Received', value: summary.totalReceived },
          { label: 'Net Balance', value: summary.netBalance },
        ].map((item) => (
          <Grid key={item.label} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">{item.label}</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {formatCurrency(item.value)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ justifyContent: 'space-between', mb: 2 }}
        >
          <Typography variant="h6">All Debts</Typography>
          <Button
            variant="outlined"
            startIcon={<SwapVertIcon />}
            onClick={() =>
              setSortOrder((value) => (value === 'desc' ? 'asc' : 'desc'))
            }
          >
            Sort by Date ({sortOrder === 'desc' ? 'Newest' : 'Oldest'})
          </Button>
        </Stack>

        {loading && (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <CircularProgress size={18} />
            <Typography>Loading dashboard...</Typography>
          </Stack>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && sortedRecords.length === 0 && (
          <Typography>No debt records yet. Use Add to create the first entry.</Typography>
        )}

        {!loading && !error && sortedRecords.length > 0 && (
          <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.customerName}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={record.type.toUpperCase()}
                            color={record.type === 'debt' ? 'error' : 'success'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(record.amount)}</TableCell>
                        <TableCell>
                          {new Date(record.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Stack spacing={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
              {sortedRecords.map((record) => (
                <Card key={record.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{record.customerName}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        size="small"
                        label={record.type.toUpperCase()}
                        color={record.type === 'debt' ? 'error' : 'success'}
                        variant="outlined"
                      />
                      <Typography>{formatCurrency(record.amount)}</Typography>
                    </Stack>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {new Date(record.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </Stack>
  )
}
