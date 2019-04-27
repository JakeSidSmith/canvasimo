export interface ResolvedType {
  typeAliases: ReadonlyArray<TypeAlias>;
  type: string;
}

export interface Parameter {
  name: string;
  type: string;
  optional?: boolean;
}

export interface Signature {
  returns: string;
  parameters: ReadonlyArray<Parameter>;
}

export interface Tags {
  [i: string]: string | undefined;
}

export interface Method {
  name: string;
  description: string;
  tags: Tags;
  signatures: ReadonlyArray<Signature>;
  typeAliases: ReadonlyArray<TypeAlias>;
}

export interface TypeAlias {
  name: string;
  alias: string;
}

export interface GroupedMethod {
  name: string;
  description: string;
  alias: string | null;
  signatures: ReadonlyArray<Signature>;
  typeAliases: ReadonlyArray<TypeAlias>;
}

export type Methods = ReadonlyArray<Method>;

export interface Group {
  name: string;
  description: string;
  methods: ReadonlyArray<GroupedMethod>;
}

export type Docs = ReadonlyArray<Group>;
