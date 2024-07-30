import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Select,
  MenuItem
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const snakeToCamel = (snakeStr) => {
    return snakeStr.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
  };

  const fetchAreas = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/areas/`);
      setAreas(data);
      setCities([...new Set(data.map((area) => area.city))]);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  }, []);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    try {
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
        full_name: values.fullName,
        area: values.area
      };

      const result = await register(userData);

      if (!result.error) {
        setSuccessMessage('Account created successfully. We have sent an email to your account for email verification.');
        resetForm();
      } else {
        console.error('Registration failed:', result.error);
        const payload = Object.fromEntries(Object.entries(result.payload).map(([key, value]) => [snakeToCamel(key), value[0]]));
        setStatus({ success: false });
        setErrors({ submit: result.error.message, ...payload });
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    fetchAreas();
    changePassword('123456');
  }, [fetchAreas]);

  return (
    <>
      {successMessage && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          fullName: '',
          city: '',
          area: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(20).required('Username is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string().max(255).required('Confirm Password is required'),
          fullName: Yup.string().max(255).required('Full Name is required'),
          city: Yup.string().required('City is required'),
          area: Yup.number().required('Area is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-register">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-register"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.fullName && errors.fullName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-full-name-register">Full Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-full-name-register"
                type="text"
                value={values.fullName}
                name="fullName"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.fullName && errors.fullName && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.fullName}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{
                          backgroundColor: level?.color,
                          width: 85,
                          height: 8,
                          borderRadius: '7px'
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <FormControl
              fullWidth
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type="password"
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Confirm Password"
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text--confirmPassword">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.city}
                label="City"
                name="city"
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {touched.city && errors.city && (
                <FormHelperText error id="standard-weight-helper-text--city">
                  {errors.city}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
              <InputLabel id="demo-simple-select-label">Area</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.area}
                label="Area"
                name="area"
                onChange={handleChange}
              >
                {areas
                  .filter((area) => area.city === values.city)
                  .map((area) => (
                    <MenuItem key={area.id} value={area.id}>
                      {area.name}
                    </MenuItem>
                  ))}
              </Select>
              {touched.area && errors.area && (
                <FormHelperText error id="standard-weight-helper-text--area">
                  {errors.area}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  sx={{ color: 'white' }}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
