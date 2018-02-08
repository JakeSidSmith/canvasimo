export interface Parameter {
  name: string;
  alias: string | null;
  type: string;
  optional?: boolean;
}

export interface Signature {
  returns: {
    type: string;
    alias: string | null;
  };
  parameters: Parameter[];
}

export interface Tags {
  [i: string]: string | undefined;
}

export interface Method {
  name: string;
  description: string;
  optional?: boolean;
  tags: Tags;
  signatures: Signature[];
}

export interface TypeAlias {
  name: string;
  alias: string;
}

export interface GroupedMethod {
  name: string;
  description: string;
  alias?: string;
  optional?: boolean;
  signatures: Signature[];
  typeAliases: TypeAlias[];
}

export type Methods = Method[];

export interface Group {
  name: string;
  description: string;
  methods: GroupedMethod[];
}

export type Docs = Group[];
