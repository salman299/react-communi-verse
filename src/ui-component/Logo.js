// material-ui
// import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo-dashboard.svg';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {


  return (
    <img src={logo} alt="Community Verse" width="182"/>

  );
};

export default Logo;
