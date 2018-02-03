export interface Parameter {
  name: string;
  type: string | string[];
  optional?: boolean;
}

export interface Method {
  name: string;
  description: string;
  returns: string;
  parameters: Parameter[];
}

export interface Group {
  name: string;
  description: string;
  methods: Method[];
}

export type Docs = Group[];
