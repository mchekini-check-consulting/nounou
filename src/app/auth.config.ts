import { AuthConfig } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://54.83.239.110:10000/auth/realms/nounou',
  redirectUri: window.location.origin,
  clientId: 'nounou',
  responseType: 'code',
  showDebugInformation: true,
  requireHttps: false
};
