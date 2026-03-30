"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction } from "@/lib/actions/admin";
import type { AdminLoginState } from "@/lib/types";

const initialState: AdminLoginState = { status: "idle" };

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-ink px-5 py-3 text-sm text-white disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="panel grid gap-4 p-8">
      <label className="grid gap-2 text-sm text-ink">
        <span className="font-medium">Email</span>
        <input name="email" type="email" className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" />
      </label>
      <label className="grid gap-2 text-sm text-ink">
        <span className="font-medium">Password</span>
        <input name="password" type="password" className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" />
      </label>
      <LoginButton />
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
    </form>
  );
}
