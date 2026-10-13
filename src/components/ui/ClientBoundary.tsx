"use client";

import { Component, type ReactNode } from "react";

/** Keeps a failed client island (missing chunk after a redeploy, WebGL crash) from taking the page down with it. */
export class ClientBoundary extends Component<{ children: ReactNode; fallback?: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") console.error(error);
    this.props.onError?.();
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
