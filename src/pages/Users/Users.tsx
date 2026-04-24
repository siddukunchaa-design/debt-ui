import { Alert, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Users() {
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // TODO: connect user list and management UI in story implementation.
  }, [])

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Users</Typography>
        <Typography color="text.secondary">
          User management page scaffold is ready.
        </Typography>
        {loading && <Typography>Loading users...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  )
}
