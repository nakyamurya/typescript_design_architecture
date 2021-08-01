enum State {
  審査中,
  承認済み,
  実施中,
  終了,
  差し戻し中,
  中断中,
}

class StateTransitions {
  static allowed: Map<State, Set<State>> = new Map([
    [State.審査中, new Set<State>([State.承認済み, State.差し戻し中])],
    [State.差し戻し中, new Set<State>([State.審査中, State.終了])],
    [State.承認済み, new Set<State>([State.実施中, State.終了])],
    [State.実施中, new Set<State>([State.中断中, State.終了])],
    [State.中断中, new Set<State>([State.実施中, State.終了])],
  ]);

  static canTransit(from: State, to: State): boolean {
    const allowedStates: Set<State> = StateTransitions.allowed.get(from)!;
    return allowedStates.has(to);
  }
}
if (require.main === module) {
  console.log(StateTransitions.canTransit(State.審査中, State.承認済み));
  console.log(StateTransitions.canTransit(State.審査中, State.終了));
}
