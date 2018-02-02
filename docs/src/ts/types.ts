export interface Argument {
  name: string;
  type: string | string[];
  optional?: boolean;
}

export interface Method {
  name: string;
  description: string;
  alias?: string;
  returns?: Argument;
  arguments?: Argument[];
}

export interface Group {
  name: string;
  description: string;
  methods: Method[];
}

export type Docs = Group[];
