export interface Parameter {
  name: string;
  type: string | string[];
  optional?: boolean;
}

export interface Signature {
  returns: string;
  parameters: Parameter[];
}

export interface Tags {
  [i: string]: string | undefined;
}

export interface Method {
  name: string;
  description: string;
  tags: Tags;
  signatures: Signature[];
}

export interface GroupedMethod {
  name: string;
  description: string;
  alias?: string;
  signatures: Signature[];
}

export type Methods = Method[];

export interface Group {
  name: string;
  description: string;
  methods: GroupedMethod[];
}

export type Docs = Group[];
