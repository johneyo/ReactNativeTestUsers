export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Success: undefined;
  Onboarding: undefined;
};
export type MainStackParamList = {
  Auth: AuthStackParamList;
  App: AppStackParamList;
  Onboarding: undefined;
};
export type AuthStackParamList = {
  SignUp: undefined;
  MainAuthScreen: undefined;
  ForgotPassword: undefined;
  ForgotPin: undefined;
  SignIn: undefined;
  NewPassword: undefined;
  Kyc: undefined;
};
export type AppStackParamList = { Home: undefined };
export type BottomTabParamList = {
  Calculator: undefined;
  Sell: undefined;
  Dashboard: undefined;
  Buy: undefined;
  Guide: undefined;
};

export type CalculatorParamList = {
  CalculatorScreen: undefined;
};

export type SellParamList = {
  SellScreen: undefined;
};

export type DashboardParamList = {
  DashboardScreen: undefined;
};

export type BuyParamList = {
  BuyScreen: undefined;
  Payment: PaymentParamList;
};
export type GuideParamList = {
  GuideScreen: undefined;
};
export type ProfileStackParamList = {
  Profile: undefined;
  Personal: undefined;
  Phone: undefined;
  PasswordPin: undefined;
  HelpSupport: undefined;
};

export type PaymentParamList = {
  PaymentScreen: undefined;
  BankTransfer: undefined;
  WalletAddress: undefined;
  TransactionDetail: undefined;
};
