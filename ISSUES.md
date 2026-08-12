ERROR Bugs: Unauthenticated server action can be called directly
Server action "generarExtractoAction" performs unauthenticated privileged server work (.create()), so anyone can trigger it directly.

Suggested fix: Check auth before changing server state or invoking billable services because exported server actions can be called directly by unauthenticated clients.

Scope:

- Fix the root cause; do not suppress, disable, or silence the rule.
- Keep unrelated refactors out of this pass.

Affected sites:

- src/actions/generar-extracto.ts:37
