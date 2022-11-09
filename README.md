# Finite State Machine for Calculator

[![DevOps](https://github.com/DerekJi/ngtetris/actions/workflows/deploy.yml/badge.svg)](https://github.com/DerekJi/ngtetris/actions/workflows/deploy.yml)
[![codecov](https://codecov.io/gh/DerekJi/ngcalculator/branch/master/graph/badge.svg?token=B7F794N97T)](https://codecov.io/gh/DerekJi/ngcalculator)

## States

* State
  * OnStart
  * OnOp1
  * OnOper
  * OnOp2
  * OnResult
  * OnMemory
* Operand1
* Operand2
* Operator
* Memory
* Result
* CurrentOperand
   * OnStart: Operand1
   * OnOp1: Operand1
   * OnOper: Operand1
   * OnOp2: Operand2
   * OnResult: Result
   * OnMemory: Memory

## High-Level Calculation FSM

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml

[*] --> Start: Power
Start --> Operand_1: [0-9], POINT
Start: Zero
Operand_1 --> Operator: [+-*/]
Operand_1: Zero, Integer, Float
Operand_1 -> Operand_1: OPS, OPM, BS
Operator --> Operand_2: [0-9], POINT
Operator: [+-*/]
Operand_2 -> Operand_2: OPS, OPM, BS
Operand_2: Zero, Integer, Float
Operand_2 --> End: EQ
End: Result, Error, Memory
End  --> [*]: Power

@enduml
```

## Keys

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml

state Keys #lightgrey {
}
Keys: **Numbers** for [0-9]
Keys: **BS** for Backspace
Keys: **MR** for Memory Recall
Keys: **OPS** for Simple Operators [%±]
Keys: **OPC** for Complex Operators [+-*/]
Keys: **OPM** for Memory Operators (M+, M-)
Keys: **RESET** for C, AC, CE
Keys: **Power** for Power (On/Off)
Keys: **EQ** for Equals (=)

@enduml
```

## Special Event: Power

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml

[*] --> Start: Power
Start -> Operand_1: [0-9.]
Operand_1 -> Operator: [+-*/]
Operator -> Operand_2: [0-9.]
Operand_2 -> End: EQ
End: Memory, Error, Result
End -[#red]-> [*]: Power

Operand_1 -[#red]-> [*]: Power
Operand_2 -[#red]-> [*]: Power
Operator -[#red]-> [*]: Power
Start -[#red]-> [*]: Power
@enduml
```

## Special Event: Reset

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml

[*] -> Start: Power
Start --> Operand_1: [0-9.]
Operand_1 -> Operator: [+-*/]
Operator -> Operand_2: [0-9.]
Operand_2 -> End: EQ
End: Memory, Error, Result
End -[#red]-> [*]: Power

Start -[#brown]-> Start: RESET
Operand_1 -[#brown]-> Start: RESET
Operand_2 -[#brown]-> Start: RESET
Operator -[#brown]-> Start: RESET
End -[#brown]-> Start: RESET
@enduml
```


## Special Event: Memory Recall

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml

[*] -> Start: Power
Start -> Operand_1: [0-9.]
Operand_1 -> Operator: [+-*/]
Operator -> Operand_2: [0-9.]
Operand_2 -> End: EQ
state End { 
  state Memory {
  }
  state Error {
  }
  state Result {
  }
}
End -[#red]> [*]: Power

Start -[#brown]-> Memory: MR
Operand_1 -[#brown]-> Memory: MR
Operand_2 -[#brown]-> Memory: MR
Operator -[#brown]-> Memory: MR
Memory -[#brown,dashed]-> Memory: MR
Error -[#brown,dashed]-> Memory: MR
Result -[#brown,dashed]-> Memory: MR
@enduml
```

## Detailed Calculation FSM

> You probably need [Markdown Diagrams](https://chrome.google.com/webstore/detail/markdown-diagrams/pmoglnmodacnbbofbgcagndelmgaclel) to view the diagrams

```plantuml
@startuml
hide empty description
[*] -> Start: PowerOn
state Start {


}
Start -[#brown,bold]-> Operand_1: [0-9], POINT
state Operand_1 {
  [*] -> Zero_1
  Zero_1 -> Int_1: 1-9
  Int_1 -[dashed]-> Int_1: 0-9, OPS, OPM, BS
  Int_1 --> Float_1: POINT
  Int_1 -> Zero_1: BS
  Float_1 --> Float_1: 0-9, POINT, OPS, OPM, BS
  Float_1 --> Zero_1: BS
  Int_1: zero
  Int_1: positive integers
  Int_1: negative integers
}
Operand_1 -[#green]-> Result: EQ

Start -[#blue]--> Operator: [+-*/]
Operand_1 -[#blue,bold]--> Operator: [+-*/]

Operator -[#brown,bold]-> Operand_2: [0-9.], POINT
Operator: + - * /

state c <<choice>>
Operand_2 -[#green,bold]--> c: EQ
state Operand_2 {
  [*] -> Zero_2
  Zero_2 -> Int_2: 1-9
  Int_2 -[dashed]-> Int_2: 0-9, OPS, OPM, BS
  Int_2 --> Float_2: POINT
  Int_2 -> Zero_2: BS
  Float_2 --> Float_2: 0-9, POINT, OPS, OPM, BS
  Float_2 --> Zero_2: BS
  Int_2: zero
  Int_2: positive integers
  Int_2: negative integers
}
c -[#green,bold]-> Result: [NOT DIVIDE 0]
c -[#red]-> Error: [x/0] 

state End {
  state Error {
  }
  state Result {
  }
  state Memory {
  }
}

Result -up[#DD33AA]-> Operator: [+-*/]
End -[#DD33AA]-> Start: 0-9, POINT
Result -right[dashed]-> Result: OPS, OPM
Memory -left[dashed]-> Memory: OPS, OPM

End -right-> [*]

@enduml
```