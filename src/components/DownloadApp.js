import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from '@mui/material';
const DownloadApp = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to Open Dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{
          backgroundColor: '#1976d2',
          color: '#fff',
          margin: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          textTransform: 'none',
        }}
      >
        Download Our App
      </Button>

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Download Heart of Carthage Mobile Application
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '20px' }}>
            Join our family and feel free to submit your reviews on properties and testimonials.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* App Store Button */}
            <Grid item>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/831/831378.png"
                  alt="App Store"
                  style={{ width: '150px', height: '50px', objectFit: 'contain' }}
                />
              </a>
            </Grid>
            {/* Play Store Button */}
            <Grid item>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/256/1077/1077105.png"
                  alt="Play Store"
                  style={{ width: '150px', height: '50px', objectFit: 'contain' }}
                />
              </a>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DownloadApp;
