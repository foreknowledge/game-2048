import Pos from './pos';

export type Action = Move | New | Merge;

export type Move = {
  type: 'move';
  from: Pos;
  to: Pos;
};

export type New = {
  type: 'new';
  at: Pos;
};

export type Merge = {
  type: 'merge';
  from1: Pos;
  from2: Pos;
  to: Pos;
};
