export type Tanent = {
    accentColor: string;
    additionalFeature: string[];
    address: string;
    city: string;
    clientLogo: string;
    contactNumber: number;
    createdAt: string;
    databaseName: string;
    description: string;
    domainName: string;
    modifiedAt: string;
    name: string;
    programs: Array<string>;
    state: string;
    timeZone: string;
    type: string;
    zipCode: number;
    _id: number;
  };
  export type state = {
    _id: number;
    name: string;
  };
  
  export type Tanents = {
    activeTanents: Array<Tanent>;
    archivedTanents: Array<Tanent>;
    myStates: Array<state>;
    timeZones: any;
  };
  type typeSteps = {
    label: string;
      contentbody:JSX.Element;
    }
   export type stepsType = Array<typeSteps>;
 export type MyErrorType = { Object: [Array<string>, boolean] };