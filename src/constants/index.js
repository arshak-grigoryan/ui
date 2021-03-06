export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const MAIN_URL = process.env.REACT_APP_MAIN_URL;
export const publicVapidKey =
  process.env.REACT_APP_PUBLIC_VAPID_KEY ||
  'BOjfhJMEPQh3NggRpL_6ZTv4JWXsK8kHyo8xTJiUitepCzYDAg7d0cKuOiGclJgNrHKsFA7xQwuHJLj6icDp-5I';

// images
export const GRADIENT = `${process.env.PUBLIC_URL}/images/background.jpg`;
export const GOOGLE_LOGO = `${process.env.PUBLIC_URL}/images/google.png`;
export const PICSART_LOGO = `${process.env.PUBLIC_URL}/images/picsart.jpg`;
export const PICSART_LOGO_WHITE =
  'https://cdn130.picsart.com/27611923394556657480.svg';
export const PICSART_LOGO_PURPLE =
  'https://cdn140.picsart.com/72645958340716769385.svg';

// email regex
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
export const GMAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;
export const PICSART_MAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@picsart\.com$/i;

// other
export const CHAIRS_COUNT = 6;
