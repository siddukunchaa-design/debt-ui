import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/chat', label: 'Chat' },
  { to: '/debts', label: 'Debts' },
  { to: '/users', label: 'Users' },
  { to: '/settings', label: 'Settings' },
]

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navList = (
    <List sx={{ p: 1 }}>
      {navItems.map((item) => (
        <ListItemButton
          key={item.to}
          component={NavLink}
          to={item.to}
          end={item.end}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderRadius: 1.5,
            mb: 0.5,
            '&.active': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            },
          }}
        >
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, display: { md: 'none' } }}
            aria-label="open navigation menu"
          >
            <MenuIcon />
          </IconButton>
          <Stack>
            <Typography variant="h6">Grocery Debt Tracker</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Voice-first debt tracking UI
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box
          component="nav"
          sx={{
            width: { md: 240 },
            p: 1.5,
            display: { xs: 'none', md: 'block' },
          }}
        >
          {navList}
        </Box>

        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box sx={{ width: 260, pt: 1 }}>{navList}</Box>
        </Drawer>

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        <Outlet />
        </Box>
      </Stack>
    </Box>
  )
}
