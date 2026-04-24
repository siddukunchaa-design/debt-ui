import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import {
  getKnownCustomerNames,
  parseVoiceTranscript,
} from '../../services/mockDebtService'
import type { ParsedDebtInput } from '../../types/debt'

export default function Chat() {
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error] = useState<string | null>(null)
  const [transcript, setTranscript] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [parsed, setParsed] = useState<ParsedDebtInput | null>(null)
  const [sendCompleted, setSendCompleted] = useState(false)
  const customerNames = getKnownCustomerNames()

  async function handleMicClick() {
    if (!isRecording) {
      setSendCompleted(false)
      setIsRecording(true)
      return
    }

    setIsRecording(false)
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setTranscript('Kiran has taken 500 rupees')
    setLoading(false)
  }

  async function handleConfirmSend() {
    setConfirmOpen(false)
    setLoading(true)
    const result = await parseVoiceTranscript(transcript)
    setParsed(result)
    setSendCompleted(true)
    setLoading(false)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Chat</Typography>
        <Typography color="text.secondary">
          Record a debt note by voice, review transcript, and confirm before send.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button
            variant={isRecording ? 'outlined' : 'contained'}
            color={isRecording ? 'error' : 'primary'}
            startIcon={isRecording ? <StopCircleIcon /> : <MicIcon />}
            onClick={handleMicClick}
            sx={{ alignSelf: 'flex-start' }}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          <Button
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!transcript.trim()}
            onClick={() => setConfirmOpen(true)}
          >
            Send for Parsing
          </Button>

          <Button
            variant="text"
            disabled={isRecording}
            onClick={() => {
              setTranscript('')
              setParsed(null)
              setSendCompleted(false)
            }}
          >
            Retry
          </Button>
        </Stack>

        <TextField
          label="Transcript preview"
          multiline
          minRows={3}
          value={transcript}
          onChange={(event) => setTranscript(event.target.value)}
          helperText="You can edit before confirming."
        />

        {sendCompleted && (
          <Alert icon={<CheckCircleIcon />} severity="success">
            Transcript sent to mock Python API parser successfully.
          </Alert>
        )}

        {parsed && (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              <Typography variant="h6">Parsed Result (Mock LLM Output)</Typography>
              <Divider />

              {parsed.warnings.map((warning) => (
                <Alert key={warning} severity="warning">
                  {warning}
                </Alert>
              ))}

              <TextField
                label="Name"
                value={parsed.name}
                onChange={(event) =>
                  setParsed((prev) =>
                    prev ? { ...prev, name: event.target.value } : prev,
                  )
                }
              />

              <TextField
                label="Amount"
                type="number"
                value={parsed.amount ?? ''}
                onChange={(event) =>
                  setParsed((prev) =>
                    prev
                      ? {
                          ...prev,
                          amount:
                            event.target.value === ''
                              ? null
                              : Number(event.target.value),
                        }
                      : prev,
                  )
                }
              />

              <TextField
                select
                label="Type"
                value={parsed.type ?? ''}
                onChange={(event) =>
                  setParsed((prev) =>
                    prev
                      ? {
                          ...prev,
                          type:
                            event.target.value === ''
                              ? null
                              : (event.target.value as 'credit' | 'debt'),
                        }
                      : prev,
                  )
                }
              >
                <MenuItem value="">Unknown</MenuItem>
                <MenuItem value="debt">Debt</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
              </TextField>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Known customers:
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ mt: 1, flexWrap: 'wrap' }}
                >
                  {customerNames.map((name) => (
                    <Chip
                      key={name}
                      label={name}
                      onClick={() =>
                        setParsed((prev) => (prev ? { ...prev, name } : prev))
                      }
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        )}

        {loading && <Typography>Processing...</Typography>}

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Before Send</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to send this transcript?</Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              {transcript || 'No transcript'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Edit</Button>
            <Button color="inherit" onClick={() => setTranscript('')}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirmSend}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {!transcript && (
          <Alert severity="info">
            Start recording to capture voice transcript. Empty transcript cannot be
            submitted.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Paper>
  )
}
