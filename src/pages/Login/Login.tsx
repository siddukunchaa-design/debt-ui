import LoginIcon from '@mui/icons-material/Login'
import { Alert, Button, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // TODO: connect auth provider in story implementation.
  }, [])

  return (
    <Paper sx={{ p: 2, maxWidth: 520, mx: 'auto', mt: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Login</Typography>
        <Typography color="text.secondary">
          Authentication UI scaffold is ready.
        </Typography>
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => navigate('/')}
          sx={{ alignSelf: 'flex-start' }}
        >
          Continue to dashboard
        </Button>
        {loading && <Typography>Loading authentication options...</Typography>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  )
}
