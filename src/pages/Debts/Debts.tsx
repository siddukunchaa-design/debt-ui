import { Alert, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Debts() {
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // TODO: connect debt listing behaviors in story implementation.
  }, [])

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Debts</Typography>
        <Typography color="text.secondary">
          Detailed debt records page scaffold is ready.
        </Typography>
        {loading && <Typography>Loading debt records...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  )
}
