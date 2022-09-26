export type MemoryOperator = 
  // Memory Plus: calculate memory = memory + current value
    'M+' 
  // Memory Minus: calculate memory = memory - current value
  | 'M-' 
  // Memory Clear: reset memory to zero
  | 'MC' 
  // Memory Set: set memory as the current value
  | 'MS'
  ;