"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <>
      <h4 style={{ cursor: "pointer" }} onClick={() => signOut()}>
        Log out
      </h4>
    </>
  );
}
