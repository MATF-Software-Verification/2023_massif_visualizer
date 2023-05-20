export interface HeapNodeDetails {
  address: string;
  file: string;
  function: string;
  line: number;
}

export interface HeapNode {
  children: HeapNode[];
  details: HeapNodeDetails | null;
  nbytes: number;
}

export interface MassifSnapshot {
  heap_tree: HeapNode | null;
  id: number;
  mem_heap: number;
  mem_heap_extra: number;
  mem_stack: number;
  time: number;
  detailed?: boolean;
  opened?: boolean;
}

export interface MassifOutput {
  name?: string;
  cmd: string;
  desc: string;
  detailed_snapshot_indices: number[];
  peak_snapshot_index: number;
  snapshots: MassifSnapshot[];
  time_unit: string;
}

export interface MassifOutputsWithError {
  massifOutputs: MassifOutput[];
  error?: string;
}
