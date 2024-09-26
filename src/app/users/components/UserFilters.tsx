import React from 'react';
import { Button, Slider, TextField, Typography, Box, Grid, Select, MenuItem } from '@mui/material';
import { UserFiltersProps } from '../types/userFiltersProps';



const UserFilters: React.FC<UserFiltersProps> = ({
  region,
  setRegion,
  errorCount,
  setErrorCount,
  seed,
  setSeed,
  handleSeedRandom,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="subtitle1">Region:</Typography>
      <Select value={region} onChange={(e) => setRegion(e.target.value)} sx={{ marginBottom: 2 }}>
        <MenuItem value='CA'>Canada</MenuItem>
        <MenuItem value='PL'>Poland</MenuItem>
        <MenuItem value='DE'>Germany</MenuItem>
      </Select>

      <Typography gutterBottom>Errors (0-10): {errorCount.toFixed(2)}</Typography>
      <Box sx={{ width: '20%', marginBottom: 2 }}>
        <Slider
          value={errorCount}
          onChange={(e, newValue) => setErrorCount(newValue as number)}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Errors"
            type="number"
            value={errorCount}
            onChange={(e) => {
              const value = e.target.value === '' ? 0 : Math.max(0, Math.min(1000, parseFloat(e.target.value)));
              setErrorCount(value);
            }}
            inputProps={{ min: 0, max: 1000 }}
            sx={{ width: '100px' }}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Seed"
            type="number"
            value={seed}
            onChange={(e) => {
              const value = e.target.value;
              setSeed(value === "" ? 0 : Math.max(0, Math.min(1000, parseInt(value))));
            }}
            inputProps={{ min: 0, max: 1000 }}
            sx={{ width: '100px' }}
          />
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={handleSeedRandom}>
            Random
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserFilters;
