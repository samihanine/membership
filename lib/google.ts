import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

export const googleClient = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
