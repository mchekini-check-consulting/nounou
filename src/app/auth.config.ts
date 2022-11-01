import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://3.87.90.191:10000/auth/realms/nounou',
  redirectUri: window.location.origin,
  clientId: 'nounou',
  responseType: 'code',
  showDebugInformation: true,
  requireHttps: false
};
