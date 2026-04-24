import { Alert, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Settings() {
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // TODO: connect language/preferences UI in story implementation.
  }, [])

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Settings</Typography>
        <Typography color="text.secondary">
          Voice language and preferences scaffold is ready.
        </Typography>
        {loading && <Typography>Loading settings...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  )
}
